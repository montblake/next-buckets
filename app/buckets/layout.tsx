import BucketsHeader from '@/ui/components/buckets-header';
import BucketsFooter from '@/ui/components/buckets-footer'
import { ModeToggle } from '@/ui/components/mode-toggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-start space-y-4 text-foreground">
      <BucketsHeader />
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      {children}

      <BucketsFooter />
    </div>
  );
}