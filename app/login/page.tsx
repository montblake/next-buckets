import BucketsLogo from '@/ui/components/buckets-logo';
import LoginForm from '@/ui/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full rounded-lg bg-blue-500 p-3 md:h-36 overflow-hidden justify-center items-center text-white">
          <h1 className="text-5xl font-semibold tracking-tighter">Buckets</h1>
        </div>
        <LoginForm />
      </div>
    </main >
  );
}