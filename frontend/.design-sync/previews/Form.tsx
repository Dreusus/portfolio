import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Label, Textarea } from '@/components';

// `Form` is react-hook-form's FormProvider re-exported by the design system.
// Only the provider is published from the component barrel (FormItem /
// FormField / FormMessage are not), so the field rows here are composed from
// Label + Input/Textarea and driven by `register`, the way ContactForm does.
type ContactValues = { name: string; email: string; message: string };

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-2'>
    <div className='flex items-center justify-between'>
      <Label className={error ? 'text-destructive' : ''}>{label}</Label>
      {error && (
        <span role='alert' className='text-destructive text-xs'>
          {error}
        </span>
      )}
    </div>
    {children}
  </div>
);

export const Canonical = () => {
  const form = useForm<ContactValues>({
    defaultValues: { name: '', email: '', message: '' },
  });
  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' style={{ width: 360 }}>
        <Field label='Name'>
          <Input placeholder='Andrey Polyakov' {...form.register('name')} />
        </Field>
        <Field label='Email'>
          <Input type='email' placeholder='hello@apolyakov.tech' {...form.register('email')} />
        </Field>
        <Field label='Message'>
          <Textarea
            className='resize-none'
            placeholder='Which flows need automated coverage?'
            {...form.register('message')}
          />
        </Field>
        <Button variant='secondary' type='button' className='w-full'>
          Send message
        </Button>
      </form>
    </Form>
  );
};

export const Filled = () => {
  const form = useForm<ContactValues>({
    defaultValues: {
      name: 'Marina Kravets',
      email: 'marina@shipfast.io',
      message: 'We need a Playwright suite for checkout, ~40 scenarios, Allure in GitLab CI.',
    },
  });
  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' style={{ width: 360 }}>
        <Field label='Name'>
          <Input {...form.register('name')} />
        </Field>
        <Field label='Email'>
          <Input type='email' {...form.register('email')} />
        </Field>
        <Field label='Message'>
          <Textarea className='resize-none' {...form.register('message')} />
        </Field>
        <Button variant='secondary' type='button' className='w-full'>
          Send message
        </Button>
      </form>
    </Form>
  );
};

export const WithErrors = () => {
  const form = useForm<ContactValues>({
    defaultValues: { name: 'A', email: 'andrey@', message: 'hi' },
  });
  const { errors } = form.formState;
  React.useEffect(() => {
    form.setError('name', { message: 'Name is too short' });
    form.setError('email', { message: 'Invalid email' });
    form.setError('message', { message: 'Message is too short' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' style={{ width: 360 }}>
        <Field label='Name' error={errors.name?.message}>
          <Input className='border-destructive' {...form.register('name')} />
        </Field>
        <Field label='Email' error={errors.email?.message}>
          <Input type='email' className='border-destructive' {...form.register('email')} />
        </Field>
        <Field label='Message' error={errors.message?.message}>
          <Textarea className='resize-none border-destructive' {...form.register('message')} />
        </Field>
        <Button variant='secondary' type='button' className='w-full'>
          Send message
        </Button>
      </form>
    </Form>
  );
};

export const Submitting = () => {
  const form = useForm<ContactValues>({
    defaultValues: {
      name: 'Marina Kravets',
      email: 'marina@shipfast.io',
      message: 'We need a Playwright suite for checkout, ~40 scenarios.',
    },
  });
  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' style={{ width: 360 }}>
        <Field label='Name'>
          <Input disabled {...form.register('name')} />
        </Field>
        <Field label='Email'>
          <Input type='email' disabled {...form.register('email')} />
        </Field>
        <Field label='Message'>
          <Textarea className='resize-none' disabled {...form.register('message')} />
        </Field>
        <Button variant='secondary' type='button' disabled className='w-full'>
          Sending…
        </Button>
      </form>
    </Form>
  );
};
