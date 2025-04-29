
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import UsernameLoginForm from '@/components/auth/UsernameLoginForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleResetPasswordClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">Welcome Back</h1>
        
        <Tabs
          value={loginMethod}
          onValueChange={(value) => setLoginMethod(value as 'email' | 'username')}
          className="mb-6"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="email">Login with Email</TabsTrigger>
            <TabsTrigger value="username">Login with Username</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <EmailLoginForm onResetPassword={handleResetPasswordClick} />
          </TabsContent>
          
          <TabsContent value="username">
            <UsernameLoginForm />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4 text-sm">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              
              <ResetPasswordForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 hover:underline">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
