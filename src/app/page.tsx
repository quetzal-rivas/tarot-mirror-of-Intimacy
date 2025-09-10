import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, MoonStar, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto flex h-full items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-4">
            <MoonStar className="h-12 w-12 text-primary" />
            <h1 className="font-headline text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary md:text-6xl">
              Tarot Mistical Insight
            </h1>
            <Sparkles className="h-12 w-12 text-primary" />
        </div>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Gaze into the reflection of your heart. Answer the questions to unveil your capacity for connection and discover the path to deeper intimacy.
        </p>

        <div className="mt-12">
            <Button asChild size="lg" className="font-bold text-lg px-8 py-6 shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105">
                <Link href="/questionnaire">
                    <Wand2 className="mr-3 h-6 w-6" />
                    Begin Your Journey
                </Link>
            </Button>
        </div>

        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
                icon={<Sparkles className="h-8 w-8 text-primary" />}
                title="Unveil Your Inner Self"
                description="Our narrative prompts guide you through a journey of self-discovery, revealing insights into your unique identity."
            />
            <FeatureCard
                icon={<MoonStar className="h-8 w-8 text-primary" />}
                title="AI-Powered Insights"
                description="Receive personalized feedback on your intimacy readiness, powered by advanced AI analysis of your reflections."
            />
            <FeatureCard
                icon={<Wand2 className="h-8 w-8 text-primary" />}
                title="Unlock Deeper Connections"
                description="Get a custom-tailored intimacy cue designed to help you foster more meaningful relationships."
            />
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <CardHeader>
                <div className="mb-4 flex justify-center">{icon}</div>
                <CardTitle className="text-center font-headline text-xl text-primary">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-center">{description}</CardDescription>
            </CardContent>
        </Card>
    );
}
