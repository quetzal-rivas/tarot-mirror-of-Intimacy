import { MoonStar } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full flex-grow items-center justify-center">
      <MoonStar className="h-16 w-16 animate-pulse text-primary" />
    </div>
  );
}
