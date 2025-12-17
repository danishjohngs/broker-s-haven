import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 md:px-16 lg:px-24">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="relative"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-glow">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RoomBroker</h1>
              <p className="text-sm text-muted-foreground">Property Management</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
              <p className="text-muted-foreground mt-1">Sign in to manage your properties</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="raj@roombroker.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 h-auto text-xs text-primary">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 text-base">
                Sign in
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="px-0 h-auto text-primary">
                Contact admin
              </Button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-primary/5 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative z-10 max-w-lg text-center">
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-card p-6 shadow-card-hover animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="text-3xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Properties</div>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-card-hover animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl font-bold text-success">87</div>
              <div className="text-sm text-muted-foreground">Tenants</div>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-card-hover animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="text-3xl font-bold text-warning">24</div>
              <div className="text-sm text-muted-foreground">Owners</div>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-card-hover animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="text-3xl font-bold text-foreground">134</div>
              <div className="text-sm text-muted-foreground">Agreements</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Manage Properties Effortlessly
          </h3>
          <p className="text-muted-foreground">
            Track owners, tenants, rooms, and agreements all in one place. 
            Never miss an expiry date again.
          </p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  );
};
