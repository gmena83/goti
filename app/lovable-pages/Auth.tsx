import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/lovable/ui/button';
import { Input } from '@/app/components/lovable/ui/input';
import { Label } from '@/app/components/lovable/ui/label';
import { Sparkle, GoogleLogo } from '@phosphor-icons/react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;
        toast.success('Account created! You can now sign in.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success('Signed in successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
            <Sparkle size={32} weight="duotone" className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">GOTI</h1>
          <p className="text-sm text-muted-foreground">
            Generative Orchestrator of Technological Innovation
          </p>
        </div>

        {/* Auth Form */}
        <div className="glass-strong rounded-2xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
            </p>
          </div>

          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 gap-2"
          >
            <GoogleLogo size={20} weight="bold" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
              disabled={isLoading}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
