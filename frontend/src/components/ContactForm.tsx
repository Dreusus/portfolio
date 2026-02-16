'use client';
import React from 'react';
import { Button, Input, Label, Textarea } from '@/components';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/data/i18n';
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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      noValidate
      className='flex flex-col gap-4'
    >
      <div className='flex flex-col gap-3'>
        {/* Name */}
        <div className='flex flex-col gap-1.5'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='name'>{t.contact.form.name}</Label>
            {fieldErrors.name && (
              <span className='text-red-500 text-xs'>{fieldErrors.name}</span>
            )}
          </div>
          <Input
            id='name'
            type='text'
            name='name'
            onChange={handleChange}
            className={fieldErrors.name ? 'border-red-300' : ''}
          />
        </div>

        {/* Email */}
        <div className='flex flex-col gap-1.5'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='email'>{t.contact.form.email}</Label>
            {fieldErrors.email && (
              <span className='text-red-500 text-xs'>{fieldErrors.email}</span>
            )}
          </div>
          <Input
            id='email'
            type='email'
            name='email'
            onChange={handleChange}
            className={fieldErrors.email ? 'border-red-300' : ''}
          />
        </div>

        {/* Message */}
        <div className='flex flex-col gap-1.5'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='message'>{t.contact.form.message}</Label>
            {fieldErrors.message && (
              <span className='text-red-500 text-xs'>{fieldErrors.message}</span>
            )}
          </div>
          <Textarea
            id='message'
            name='message'
            onChange={handleChange}
            rows={4}
            className={fieldErrors.message ? 'border-red-300' : ''}
          />
        </div>
      </div>

      {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

      {isSuccess ? (
        <Button variant='secondary' type='button' disabled className='w-full bg-green-50 hover:bg-green-50 text-green-600'>
          <CheckCircle2 className='w-4 h-4' />
          {t.contact.form.success}
        </Button>
      ) : (
        <Button variant='secondary' type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? (
            <>
              <Loader2 className='animate-spin' />
              {t.contact.form.sending}
            </>
          ) : (
            t.contact.form.submit
          )}
        </Button>
      )}
    </form>
  );
};
