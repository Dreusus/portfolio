'use client';
import React from 'react';
import { Button, Input, Label, Textarea } from '../../../shared/ui';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../shared/i18n';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.apolyakov.tech';

export const ContactForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

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
      } else {
        setError('Failed to send message');
      }
    } catch {
      setError('Network error');
    } finally {
      setIsSubmitting(false);
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
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
      animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>{t.contact.form.name}</Label>
          <Input id='name' type='text' name='name' required disabled={isSuccess} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>{t.contact.form.email}</Label>
          <Input id='email' type='email' name='email' required disabled={isSuccess} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='message'>{t.contact.form.message}</Label>
          <Textarea
            id='message'
            name='message'
            className='resize-none'
            required
            disabled={isSuccess}
          />
        </div>
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      {renderButton()}
    </motion.form>
  );
};
