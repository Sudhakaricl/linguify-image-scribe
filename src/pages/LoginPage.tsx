
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';

// Email login schema
const emailLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Username login schema
const usernameLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Reset password schema
const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailLoginFormValues = z.infer<typeof emailLoginSchema>;
type UsernameLoginFormValues = z.infer<typeof usernameLoginSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email');
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, resetPassword } = useAuth();

  // Email login form
  const emailForm = useForm<EmailLoginFormValues>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Username login form
  const usernameForm = useForm<UsernameLoginFormValues>({
    resolver: zodResolver(usernameLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Reset password form
  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleEmailLogin = async (values: EmailLoginFormValues) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameLogin = async (values: UsernameLoginFormValues) => {
    setLoading(true);
    try {
      // First find the user's email by username
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', values.username)
        .single();
          
      if (error || !data) {
        throw new Error('Username not found');
      }
        
      // Get the user's email from auth.users (via a function or view since we can't directly query auth.users)
      const { data: userData, error: userError } = await supabase.auth.getUser(data.id);
        
      if (userError || !userData.user) {
        throw new Error('User not found');
      }
        
      // Now login with the email
      await signIn(userData.user.email!, values.password);
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    setIsResetting(true);
    try {
      const { error } = await resetPassword(values.email);
      
      if (error) throw error;
      
      toast.success('Password reset link sent to your email');
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setIsResetting(false);
    }
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
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailLogin)} className="space-y-4 mt-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="w-full"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={emailForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="w-full pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700" 
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="username">
            <Form {...usernameForm}>
              <form onSubmit={usernameForm.handleSubmit(handleUsernameLogin)} className="space-y-4 mt-4">
                <FormField
                  control={usernameForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={usernameForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="w-full pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700" 
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-4 text-sm">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-indigo-600 hover:text-indigo-800 p-0">
                Forgot Password?
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4 py-4">
                  <FormField
                    control={resetForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit" disabled={isResetting}>
                      {isResetting ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
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
