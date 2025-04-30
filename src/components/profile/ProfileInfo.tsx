
import { User } from '@supabase/supabase-js';
import { Card } from '@/components/ui/card';

interface ProfileInfoProps {
  user: User | null;
  profile: {
    username: string;
    created_at: string;
    phone?: string;
  };
}

export default function ProfileInfo({ user, profile }: ProfileInfoProps) {
  return (
    <Card className="p-8 shadow-md mb-6 bg-white">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Display Name</label>
              <p className="mt-1 text-gray-900">{profile.username}</p>
            </div>
            {profile.phone && (
              <div>
                <label className="font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{profile.phone}</p>
              </div>
            )}
            <div>
              <label className="font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-gray-900">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
