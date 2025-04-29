
import { Card } from '@/components/ui/card';

export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto p-6 flex justify-center">
      <Card className="p-8 shadow-md w-full max-w-2xl">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    </div>
  );
}
