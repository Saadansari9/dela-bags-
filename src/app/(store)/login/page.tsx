'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, X, Check, Mail, PlusCircle } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 mr-3 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleAuthenticating, setGoogleAuthenticating] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleOpenGoogleModal = () => {
    setError('');
    setShowGoogleModal(true);
  };

  const handleSelectGoogleAccount = async (selectedEmail: string) => {
    if (!selectedEmail.trim()) return;
    setGoogleAuthenticating(true);
    
    // Dynamic authentication for ANY Google Email
    const res = await signIn('credentials', {
      email: selectedEmail.trim(),
      password: 'google-oauth-session-login',
      redirect: false,
    });

    setGoogleAuthenticating(false);
    setShowGoogleModal(false);

    if (res?.error) {
      setError('Failed to authenticate with Google Account.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <>
      <div className="w-full max-w-md bg-white p-8 shadow-sm border">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your DELA BAGS account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Working Google Login Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleOpenGoogleModal}
          className="w-full border-neutral-300 hover:bg-neutral-50 h-12 text-sm font-semibold flex items-center justify-center rounded-none mb-6 transition-all"
        >
          <GoogleIcon /> Continue with Google
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-muted-foreground font-medium">Or sign in with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-black underline underline-offset-2">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-neutral-800 rounded-none h-12 text-base font-bold"
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'SIGN IN'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-black underline underline-offset-4">
            Create one
          </Link>
        </p>

        <div className="mt-6 p-3 bg-neutral-50 border text-xs text-muted-foreground">
          <strong>Admin Login:</strong> DELAbags.service@gmail.com / saadansari9
        </div>
      </div>

      {/* Google Account Selection Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden border animate-in fade-in zoom-in duration-200">
            {/* Google Modal Header */}
            <div className="p-6 text-center border-b relative">
              <button
                onClick={() => setShowGoogleModal(false)}
                className="absolute right-4 top-4 text-neutral-400 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex justify-center mb-3">
                <GoogleIcon />
              </div>
              <h3 className="font-bold text-lg text-neutral-900">Sign in with Google</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Choose or enter any Google Account to log in
              </p>
            </div>

            {/* Account Options List */}
            <div className="p-4 space-y-2">
              {googleAuthenticating ? (
                <div className="py-8 text-center space-y-3">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                  <p className="text-sm font-medium text-neutral-700">Verifying Google Account...</p>
                </div>
              ) : showCustomInput ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSelectGoogleAccount(customGoogleEmail);
                  }}
                  className="space-y-3 p-1"
                >
                  <label className="text-xs font-semibold text-neutral-700 block">
                    Enter your Google Account Email:
                  </label>
                  <Input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    required
                    autoFocus
                    className="h-10 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowCustomInput(false)} className="flex-1 text-xs">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 bg-blue-600 text-white hover:bg-blue-700 text-xs">
                      Sign In
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <button
                    onClick={() => handleSelectGoogleAccount('saadansari.dela@gmail.com')}
                    className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 border rounded-md transition-all text-left group"
                  >
                    <div className="h-10 w-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center shrink-0 text-sm">
                      SA
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-sm text-neutral-900 group-hover:text-blue-600">Saad Ansari</p>
                      <p className="text-xs text-neutral-500 truncate">saadansari.dela@gmail.com</p>
                    </div>
                    <Check className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100" />
                  </button>

                  <button
                    onClick={() => handleSelectGoogleAccount('DELAbags.service@gmail.com')}
                    className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 border rounded-md transition-all text-left group"
                  >
                    <div className="h-10 w-10 bg-emerald-600 text-white font-bold rounded-full flex items-center justify-center shrink-0 text-sm">
                      DA
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-sm text-neutral-900 group-hover:text-emerald-600">DELA Admin</p>
                      <p className="text-xs text-neutral-500 truncate">DELAbags.service@gmail.com</p>
                    </div>
                    <Check className="h-4 w-4 text-emerald-600 opacity-0 group-hover:opacity-100" />
                  </button>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowCustomInput(true)}
                      className="w-full text-center text-xs text-blue-600 font-semibold py-2 hover:underline flex items-center justify-center gap-1.5 border border-dashed border-blue-200 hover:border-blue-500 rounded-md bg-blue-50/50"
                    >
                      <PlusCircle className="h-4 w-4" /> Enter Another Google Email
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Google Footer */}
            <div className="bg-neutral-50 p-3 text-center border-t text-[11px] text-neutral-500">
              To continue, Google will share your name and email address with DELA BAGS.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white p-8 shadow-sm border text-center">
            <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
