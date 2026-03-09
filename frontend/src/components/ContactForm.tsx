'use client';
import React from 'react';
import { Button, Input, Label, Textarea } from '@/components';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.apolyakov.tech';
const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type ContactField = keyof FormErrors;
const CONTACT_FIELDS: ContactField[] = ['name', 'email', 'message'];

export const ContactForm = () => {
  const { t, language } = useTranslation();
  const formRef = React.useRef<HTMLFormElement>(null);
  const successTimeoutRef = React.useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  React.useEffect(() => {
    setFieldErrors({});
    setHasSubmitted(false);
    setError(null);
  }, [language]);

  React.useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const validateField = (name: ContactField, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t.contact.form.errors?.nameRequired || 'Name is required';
        if (value.trim().length < 2) return t.contact.form.errors?.nameShort || 'Name is too short';
        break;
      case 'email':
        if (!value.trim()) return t.contact.form.errors?.emailRequired || 'Email is required';
        if (!EMAIL_REGEXP.test(value)) return t.contact.form.errors?.emailInvalid || 'Invalid email';
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
    const fieldName = name as ContactField;
    const fieldError = validateField(fieldName, value);
    setFieldErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
  };

  const validateForm = (data: Record<ContactField, string>): FormErrors => {
    const errors: FormErrors = {};

    for (const field of CONTACT_FIELDS) {
      const fieldError = validateField(field, data[field]);
      if (fieldError) {
        errors[field] = fieldError;
      }
    }

    return errors;
  };

  const submitForm = async () => {
    if (!formRef.current || isSubmitting) return;

    setHasSubmitted(true);

    const formData = new FormData(formRef.current);
    const data: Record<ContactField, string> = {
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
        formRef.current?.reset();
        setFieldErrors({});
        setError(null);
        if (successTimeoutRef.current) {
          window.clearTimeout(successTimeoutRef.current);
        }
        successTimeoutRef.current = window.setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setError(t.contact.form.errors?.submitFailed || 'Failed to send message');
      }
    } catch {
      setError(t.contact.form.errors?.network || 'Network error');
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='w-full sm:w-auto'
        >
          <Button
            variant='outline'
            type='button'
            disabled
            className='w-full border-primary/35 bg-primary/10 text-primary hover:bg-primary/10'
          >
            <CheckCircle2 className='w-5 h-5' />
            {t.contact.form.success}
          </Button>
        </motion.div>
      );
    }
    return (
      <Button variant='default' type='submit' disabled={isSubmitting} className='w-full'>
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
      className='flex flex-col gap-5'
    >
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>{t.contact.form.name}</Label>
          <Input
            id='name'
            type='text'
            name='name'
            onChange={handleChange}
            autoComplete='name'
            aria-invalid={Boolean(fieldErrors.name)}
            className={fieldErrors.name ? 'border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20' : ''}
          />
          {fieldErrors.name && <p role='alert' className='px-1 text-xs text-destructive'>{fieldErrors.name}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>{t.contact.form.email}</Label>
          <Input
            id='email'
            type='email'
            name='email'
            onChange={handleChange}
            autoComplete='email'
            aria-invalid={Boolean(fieldErrors.email)}
            className={fieldErrors.email ? 'border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20' : ''}
          />
          {fieldErrors.email && <p role='alert' className='px-1 text-xs text-destructive'>{fieldErrors.email}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='message'>{t.contact.form.message}</Label>
          <Textarea
            id='message'
            name='message'
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.message)}
            className={`resize-none ${fieldErrors.message ? 'border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
          />
          {fieldErrors.message && <p role='alert' className='px-1 text-xs text-destructive'>{fieldErrors.message}</p>}
        </div>
      </div>
      {error && <p role='alert' aria-live='polite' className='text-sm text-destructive'>{error}</p>}
      <div className='pt-1'>
        {renderButton()}
      </div>
    </motion.form>
  );
};
