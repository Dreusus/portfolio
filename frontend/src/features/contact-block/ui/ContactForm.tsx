'use client';
import React from 'react';
import { Button, Input, Label, Textarea } from '../../../shared/ui';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../shared/i18n';
import { motion } from 'framer-motion';
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

  React.useEffect(() => {
    setFieldErrors({});
  }, [language]);

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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Button variant='secondary' type='submit' disabled className='bg-green-100 hover:bg-green-100 text-green-800'>
            <CheckCircle2 className='animate-bounce' />
            {t.contact.form.success}
          </Button>
        </motion.div>
      );
    }
    return (
      <Button variant='secondary' type='submit' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className='animate-spin' />
            {t.contact.form.sending}
          </>
        ) : (
          t.contact.form.submit
        )}
      </Button>
    );
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
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='name'>{t.contact.form.name}</Label>
            {fieldErrors.name && <span className='text-red-500 text-xs'>{fieldErrors.name}</span>}
          </div>
          <Input
            id='name'
            type='text'
            name='name'
            className={fieldErrors.name ? 'border-red-500' : ''}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='email'>{t.contact.form.email}</Label>
            {fieldErrors.email && <span className='text-red-500 text-xs'>{fieldErrors.email}</span>}
          </div>
          <Input
            id='email'
            type='email'
            name='email'
            className={fieldErrors.email ? 'border-red-500' : ''}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='message'>{t.contact.form.message}</Label>
            {fieldErrors.message && <span className='text-red-500 text-xs'>{fieldErrors.message}</span>}
          </div>
          <Textarea
            id='message'
            name='message'
            className={`resize-none ${fieldErrors.message ? 'border-red-500' : ''}`}
          />
        </div>
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      {renderButton()}
    </motion.form>
  );
};
