
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useState } from 'react';

const editProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().optional(),
});

type EditProfileFormValues = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
  userId: string;
  initialData: {
    username: string;
    phone?: string;
  };
  onProfileUpdate: (data: {username: string; phone?: string}) => void;
}

export default function EditProfileForm({ userId, initialData, onProfileUpdate }: EditProfileFormProps) {
  const [updating, setUpdating] = useState(false);
  
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: initialData.username || '',
      phone: initialData.phone || '',
    },
  });

  const handleUpdateProfile = async (values: EditProfileFormValues) => {
    setUpdating(true);
    
    try {
      // Ensure phone is properly handled before storing
      const phoneValue = values.phone && values.phone.trim() !== '' ? values.phone : null;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: values.fullName,
          phone: phoneValue
        })
        .eq('id', userId);
        
      if (error) throw error;
      
      onProfileUpdate({
        username: values.fullName,
        phone: phoneValue || undefined
      });
      
      toast.success('Profile updated successfully');
      
      // Log the update to verify
      console.log('Profile updated:', {
        username: values.fullName,
        phone: phoneValue
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Profile Information</h2>
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Display Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="bg-white text-gray-800"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  className="bg-white text-gray-800"
                  placeholder="+1 (555) 123-4567"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white" 
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
