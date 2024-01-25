import { ModeToggle } from '@/ui/components/mode-toggle';
import { Button } from '@/ui/components/ui/button';
import Link from 'next/link';


export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-background ">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl text-muted-foreground m-8">Welcome to Buckets</h1>
        <Button asChild>
          <Link href={"/buckets"}>
            Your Buckets
          </Link>
        </Button>
      </div>
    </main>
  );
}
