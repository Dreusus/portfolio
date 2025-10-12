'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button, Input, Label, Textarea } from '@/shared/ui';
import { Loader2 } from 'lucide-react';

export const ContactForm = () => {
  const [state, handleSubmit] = useForm('mldbqyey');

  const renderButton = (state: ReturnType<typeof useForm>[0]) => {
    if (state.succeeded) {
      return (
        <Button variant='secondary' type='submit' disabled>
          Message sent successfully!
        </Button>
      );
    }
    return (
      <Button variant='secondary' type='submit' disabled={state.submitting}>
        {state.submitting ? (
          <>
            <Loader2 className='animate-spin' />
            Please wait
          </>
        ) : (
          'Submit'
        )}
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='name'>Name</Label>
            <ValidationError prefix='Name' field='name' errors={state.errors} />
          </div>
          <Input id='name' type='text' name='name' disabled={state.succeeded} />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='email'>Email Address</Label>
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
            <Label htmlFor='message'>Message</Label>
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
