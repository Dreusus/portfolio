'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button, Input, Label, Textarea } from '@/shared/ui';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';

export const ContactForm = () => {
  const [state, handleSubmit] = useForm('mldbqyey');
  const { t } = useTranslation();

  const renderButton = (state: ReturnType<typeof useForm>[0]) => {
    if (state.succeeded) {
      return (
        <Button variant='secondary' type='submit' disabled>
          {t.contact.form.success}
        </Button>
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

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
    </form>
  );
};
