import { MoonStar } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-center md:justify-start">
        <Link href="/" className="flex items-center gap-2 group">
          <MoonStar className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-headline text-2xl font-bold">
            Mirror of Intimacy
          </span>
        </Link>
      </div>
    </header>
  );
}
