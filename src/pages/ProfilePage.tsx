
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
    if (profile && user) {
      console.log('Profile update handler called with:', updatedData);
      
      try {
        // Update the local state
        setProfile({
          ...profile,
          ...updatedData
        });
        
        // Verify the update happened in the database
        const { data, error } = await supabase
          .from('profiles')
          .select('username, phone')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        console.log('Profile updated:', data);
      } catch (error) {
        console.error('Error verifying profile update:', error);
      }
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Profile</h1>
      
      <ProfileInfo user={user} profile={profile} />
      
      <Card className="p-8 shadow-md bg-white">
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
