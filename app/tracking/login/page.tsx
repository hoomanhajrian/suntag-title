import LoginForm from './LoginForm';

export const metadata = { title: 'Analytics Login | Sun Tag & Title' };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-8 pb-12">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10 space-y-2">
          <span className="text-gold-base text-xs font-semibold uppercase tracking-widest">
            Admin
          </span>
          <h1 className="text-2xl font-bold text-text-base">Analytics Login</h1>
          <div className="flex justify-center gap-2 pt-1">
            <div className="h-1 w-6 bg-blue-base rounded-full" />
            <div className="h-1 w-6 bg-red-base rounded-full" />
            <div className="h-1 w-6 bg-gold-base rounded-full" />
          </div>
        </div>

        <div className="border border-blue-base/20 rounded-sm p-8 bg-background">
          <LoginForm />
        </div>

      </div>
    </div>
  );
}
