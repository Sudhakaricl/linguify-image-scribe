
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Profile {
  username: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username, created_at')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error('Error loading profile');
        return;
      }

      setProfile(data);
    }

    loadProfile();
  }, [user]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <p>{user?.email}</p>
          </div>
          <div>
            <label className="font-medium">Username</label>
            <p>{profile.username}</p>
          </div>
          <div>
            <label className="font-medium">Member Since</label>
            <p>{new Date(profile.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
