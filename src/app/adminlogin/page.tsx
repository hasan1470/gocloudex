'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminLogin() {

const router = useRouter();
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call - replace with your actual authentication
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        // Store token and redirect
        localStorage.setItem('adminToken', result.token);
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-bgLight flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-bgLight to-accent/5"></div>
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        
        {/* Floating Security Icons */}
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute top-40 right-16 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <Lock className="h-8 w-8 text-accent" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-10 animate-float" style={{ animationDelay: '4s' }}>
          <Shield className="h-10 w-10 text-greenType" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="h-8 w-8 text-bgLight" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-headingLight heading-style">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-textLight text-style">
            Secure access to your administration dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-textLight" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-bgLight placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-style transition-colors"
                  placeholder="Admin email address"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-textLight" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-bgLight placeholder-textLight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-style transition-colors"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-textLight hover:text-headingLight transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-textLight hover:text-headingLight transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700 text-style">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700 text-style">{success}</p>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 text-style">
                This area is restricted to authorized personnel only. All activities are monitored and logged.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-bgLight bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-style"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </div>

          {/* Additional Links */}
          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-sm text-primary hover:text-hoverLinkLight transition-colors text-style"
            >
              Forgot your password?
            </a>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-textLight text-style">
            &copy; {new Date().getFullYear()} GoCloudEx. Admin access only.
          </p>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}