
import { Card } from '@/components/ui/card';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>
        <SignupForm />
      </Card>
    </div>
  );
}
