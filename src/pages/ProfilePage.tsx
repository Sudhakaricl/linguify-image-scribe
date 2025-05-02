
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileInfo from '@/components/profile/ProfileInfo';
import EditProfileForm from '@/components/profile/EditProfileForm';
import ChangePasswordForm from '@/components/profile/ChangePasswordForm';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import ProfileError from '@/components/profile/ProfileError';
import { toast } from 'sonner';

interface Profile {
  username: string;
  created_at: string;
  phone?: string;
}

export default function ProfilePage() {
  const { user, updatePassword } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, created_at, phone')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        console.log('Profile loaded:', data);
        setProfile(data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleProfileUpdate = async (updatedData: {username: string; phone?: string}) => {
    if (!profile || !user) return;
    
    try {
      console.log('Updating profile with:', updatedData);
      
      // Update in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          username: updatedData.username,
          phone: updatedData.phone || null
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile({
        ...profile,
        username: updatedData.username,
        phone: updatedData.phone || null
      });
      
      // Verify the update in the database
      const { data: verificationData, error: verificationError } = await supabase
        .from('profiles')
        .select('username, phone')
        .eq('id', user.id)
        .single();
        
      if (verificationError) throw verificationError;
      
      console.log('Profile verified after update:', verificationData);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return <ProfileError />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="page-title">Your Profile</h1>
      
      <ProfileInfo user={user} profile={profile} />
      
      <Card className="p-8 shadow-md bg-white mt-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Edit Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <EditProfileForm 
              userId={user!.id} 
              initialData={profile} 
              onProfileUpdate={handleProfileUpdate}
            />
          </TabsContent>
          
          <TabsContent value="password">
            <ChangePasswordForm 
              userEmail={user!.email!} 
              updatePassword={updatePassword}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
