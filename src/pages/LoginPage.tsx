
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function LoginPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleResetPasswordClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>
        
        <EmailLoginForm onResetPassword={handleResetPasswordClick} />
        
        <div className="flex justify-end mt-6 text-sm">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white rounded-lg shadow-md">
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              
              <ResetPasswordForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition-all duration-300 ease-in-out">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
