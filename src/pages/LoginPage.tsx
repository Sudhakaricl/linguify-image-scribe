
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
      <Card className="w-full max-w-md p-8 shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">Welcome Back</h1>
        
        <EmailLoginForm onResetPassword={handleResetPasswordClick} />
        
        <div className="flex justify-end mt-6 text-sm">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              
              <ResetPasswordForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
