
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg backdrop-blur-sm bg-white/10 border border-white/20">
        <h1 className="text-2xl font-bold text-center mb-6 text-accent">Welcome Back</h1>
        
        <EmailLoginForm onResetPassword={handleResetPasswordClick} />
        
        <div className="flex justify-end mt-6 text-sm">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="backdrop-blur-sm bg-white/20 border border-white/20">
              <DialogHeader>
                <DialogTitle className="text-white">Reset Password</DialogTitle>
                <DialogDescription className="text-white/80">
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              
              <ResetPasswordForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Link to="/signup" className="text-white hover:text-accent hover:underline transition-colors">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
