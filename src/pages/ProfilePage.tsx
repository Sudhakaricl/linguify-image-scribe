
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

        setProfile(data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleProfileUpdate = (updatedData: {username: string; phone?: string}) => {
    if (profile) {
      setProfile({
        ...profile,
        ...updatedData
      });
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
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">Your Profile</h1>
      
      <ProfileInfo user={user} profile={profile} />
      
      <Card className="p-8 shadow-md">
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
