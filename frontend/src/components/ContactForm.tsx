'use client';
import React from 'react';
import { Button, Input, Label, Textarea } from '@/components';
import { Loader2, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.apolyakov.tech';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm = () => {
  const { t, language } = useTranslation();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  React.useEffect(() => {
    setFieldErrors({});
    setHasSubmitted(false);
  }, [language]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t.contact.form.errors?.nameRequired || 'Name is required';
        if (value.trim().length < 2) return t.contact.form.errors?.nameShort || 'Name is too short';
        break;
      case 'email':
        if (!value.trim()) return t.contact.form.errors?.emailRequired || 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.contact.form.errors?.emailInvalid || 'Invalid email';
        break;
      case 'message':
        if (!value.trim()) return t.contact.form.errors?.messageRequired || 'Message is required';
        if (value.trim().length < 10) return t.contact.form.errors?.messageShort || 'Message is too short';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!hasSubmitted) return;
    const { name, value } = e.target;
    const err = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: err }));
  };

  const validateForm = (data: { name: string; email: string; message: string }): FormErrors => {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
      errors.name = t.contact.form.errors?.nameRequired || 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = t.contact.form.errors?.nameShort || 'Name is too short';
    }

    if (!data.email.trim()) {
      errors.email = t.contact.form.errors?.emailRequired || 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = t.contact.form.errors?.emailInvalid || 'Invalid email';
    }

    if (!data.message.trim()) {
      errors.message = t.contact.form.errors?.messageRequired || 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = t.contact.form.errors?.messageShort || 'Message is too short';
    }

    return errors;
  };

  const submitForm = async () => {
    if (!formRef.current || isSubmitting) return;

    setHasSubmitted(true);

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const errors = validateForm(data);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/v1/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e5efe6', '#f6e8d2', '#93b18b'],
        });
        formRef.current?.reset();
        setFieldErrors({});
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setError('Failed to send message');
      }
    } catch {
      setError('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submitForm();
    }
  };

  const renderButton = () => {
    if (isSuccess) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className='w-full'
        >
          <Button
            variant='secondary'
            type='button'
            disabled
            className='w-full bg-gradient-to-r from-green-100 to-green-50 hover:from-green-100 hover:to-green-50 text-green-700 border border-green-200 shadow-lg shadow-green-100/50'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', bounce: 0.5 }}
            >
              <CheckCircle2 className='w-5 h-5' />
            </motion.div>
            {t.contact.form.success}
          </Button>
        </motion.div>
      );
    }
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full"
      >
        <Button
          variant='secondary'
          type='submit'
          disabled={isSubmitting}
          className='w-full relative overflow-hidden group'
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className='animate-spin' />
                {t.contact.form.sending}
              </>
            ) : (
              <>
                <Send className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                {t.contact.form.submit}
                <Sparkles className='w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity' />
              </>
            )}
          </span>

          {/* Button shine effect */}
          {!isSubmitting && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
          )}
        </Button>
      </motion.div>
    );
  };

  const inputVariants = {
    focused: { scale: 1.01, boxShadow: '0 0 0 3px rgba(147, 177, 139, 0.2)' },
    unfocused: { scale: 1, boxShadow: '0 0 0 0 transparent' }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      noValidate
      className='flex flex-col gap-4'
      animate={error || Object.keys(fieldErrors).length > 0 ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className='flex flex-col gap-4'>
        {/* Name field */}
        <motion.div
          className='flex flex-col gap-2'
          variants={inputVariants}
          animate={focusedField === 'name' ? 'focused' : 'unfocused'}
        >
          <div className='flex justify-between items-center'>
            <Label htmlFor='name' className="text-foreground/70">
              {t.contact.form.name}
            </Label>
            <AnimatePresence>
              {fieldErrors.name && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='text-red-500 text-xs font-medium'
                >
                  {fieldErrors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <Input
            id='name'
            type='text'
            name='name'
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={cn(
              'transition-all duration-300',
              fieldErrors.name ? 'border-red-300 focus:border-red-400' : '',
              focusedField === 'name' && !fieldErrors.name ? 'border-icon-accent/50 bg-white/80' : ''
            )}
            placeholder={language === 'en' ? 'John Doe' : 'Иван Иванов'}
          />
        </motion.div>

        {/* Email field */}
        <motion.div
          className='flex flex-col gap-2'
          variants={inputVariants}
          animate={focusedField === 'email' ? 'focused' : 'unfocused'}
        >
          <div className='flex justify-between items-center'>
            <Label htmlFor='email' className="text-foreground/70">
              {t.contact.form.email}
            </Label>
            <AnimatePresence>
              {fieldErrors.email && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='text-red-500 text-xs font-medium'
                >
                  {fieldErrors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <Input
            id='email'
            type='email'
            name='email'
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={cn(
              'transition-all duration-300',
              fieldErrors.email ? 'border-red-300 focus:border-red-400' : '',
              focusedField === 'email' && !fieldErrors.email ? 'border-icon-accent/50 bg-white/80' : ''
            )}
            placeholder="example@email.com"
          />
        </motion.div>

        {/* Message field */}
        <motion.div
          className='flex flex-col gap-2'
          variants={inputVariants}
          animate={focusedField === 'message' ? 'focused' : 'unfocused'}
        >
          <div className='flex justify-between items-center'>
            <Label htmlFor='message' className="text-foreground/70">
              {t.contact.form.message}
            </Label>
            <AnimatePresence>
              {fieldErrors.message && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='text-red-500 text-xs font-medium'
                >
                  {fieldErrors.message}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <Textarea
            id='message'
            name='message'
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows={4}
            className={cn(
              'resize-none transition-all duration-300',
              fieldErrors.message ? 'border-red-300 focus:border-red-400' : '',
              focusedField === 'message' && !fieldErrors.message ? 'border-icon-accent/50 bg-white/80' : ''
            )}
            placeholder={language === 'en' ? 'Write your message here...' : 'Напишите ваше сообщение здесь...'}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg border border-red-100'
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {renderButton()}

      {/* Keyboard shortcut hint */}
      <p className="text-xs text-foreground/30 text-center">
        {language === 'en' ? 'Press Ctrl+Enter to send' : 'Нажмите Ctrl+Enter для отправки'}
      </p>
    </motion.form>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
