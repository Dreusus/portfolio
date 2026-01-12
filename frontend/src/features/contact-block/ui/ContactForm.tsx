'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button, Input, Label, Textarea } from '../../../shared/ui';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../shared/i18n';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const ContactForm = () => {
  const [state, handleSubmit] = useForm('xnnerzwg');
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (state.succeeded && !showSuccess) {
      setShowSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e5efe6', '#f6e8d2', '#93b18b'],
      });
    }
  }, [state.succeeded, showSuccess]);

  const renderButton = (state: ReturnType<typeof useForm>[0]) => {
    if (state.succeeded) {
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
      <Button variant='secondary' type='submit' disabled={state.submitting}>
        {state.submitting ? (
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

  const hasErrors = state.errors && Object.keys(state.errors).length > 0;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
      animate={hasErrors ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='name'>{t.contact.form.name}</Label>
            <ValidationError prefix='Name' field='name' errors={state.errors} />
          </div>
          <Input id='name' type='text' name='name' disabled={state.succeeded} />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='email'>{t.contact.form.email}</Label>
            <ValidationError
              prefix='Email'
              field='email'
              className='text-red-400 text-sm'
              errors={state.errors}
            />
          </div>
          <Input
            id='email'
            type='email'
            name='email'
            disabled={state.succeeded}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='message'>{t.contact.form.message}</Label>
            <ValidationError
              prefix='Message'
              field='message'
              errors={state.errors}
            />
          </div>
          <Textarea
            id='message'
            name='message'
            className='resize-none'
            disabled={state.succeeded}
          />
        </div>
      </div>
      {renderButton(state)}
    </motion.form>
  );
};
