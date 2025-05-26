import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ToastAction } from './ui/toast';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Minimum content 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return axios.post('/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Send success',
        description: 'I will respond as soon as possible !',
      });
      reset();
    },
    onError: () => {
      toast({
        title: 'Send Failed',
        description: 'There was a problem sending the email.',
        action: <ToastAction altText='Try Again'>Try Again</ToastAction>,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <Input
          placeholder='Name'
          type='text'
          {...register('name')}
          disabled={isSubmitting}
          autoComplete='name'
        />
        {errors.name && (
          <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          placeholder='Email'
          type='email'
          {...register('email')}
          disabled={isSubmitting}
          autoComplete='email'
        />
        {errors.email && (
          <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder='Message content...'
          rows={6}
          {...register('message')}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className='text-red-500 text-xs mt-1'>{errors.message.message}</p>
        )}
      </div>
      <Button
        type='submit'
        className='w-full'
        disabled={isSubmitting || mutation.isPending}
      >
        {mutation.isPending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default ContactForm;
