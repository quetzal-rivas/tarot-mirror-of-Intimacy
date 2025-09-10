import { Wand2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center gap-4 text-center">
      <Wand2 className="h-16 w-16 animate-pulse text-primary" />
      <h1 className="font-headline text-3xl text-primary">Revealing your reflection...</h1>
      <p className="text-muted-foreground">The cosmos is aligning to bring you insights.</p>
    </div>
  );
}
