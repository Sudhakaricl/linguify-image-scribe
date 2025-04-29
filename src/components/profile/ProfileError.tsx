
import { Card } from '@/components/ui/card';

export default function ProfileError() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-8 shadow-md">
        <h2 className="text-xl font-semibold text-red-600">
          Error loading profile data
        </h2>
        <p className="mt-2">Please try refreshing the page or contact support if the issue persists.</p>
      </Card>
    </div>
  );
}
