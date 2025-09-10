import { providePersonalizedFeedback } from '@/ai/flows/provide-personalized-feedback';
import { recommendIntimacyCue } from '@/ai/flows/recommend-intimacy-cue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Sparkles, Heart, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

type ResultsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const level = searchParams.level as string;
  const responses: string[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const r = searchParams[`r${i}`] as string;
    if (r) {
      responses.push(r);
    }
  }

  if (!level || responses.length !== 10) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center text-center py-20">
        <h1 className="font-headline text-4xl text-destructive">Invalid Results</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Something went wrong. Please return to the beginning and try again.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Start Over</Link>
        </Button>
      </div>
    );
  }

  const userResponses = responses.join('\n\n');

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-headline text-4xl font-bold text-primary">Your Reflection Revealed</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Here are the insights gathered from your journey within.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary shadow-xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 font-headline text-2xl text-center">
              <Sparkles className="h-7 w-7" />
              Your Ego Identity Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-5xl font-bold text-primary">{level}</p>
          </CardContent>
        </Card>

        <Suspense fallback={<FeedbackSkeleton />}>
          <Feedback level={level} userResponses={userResponses} />
        </Suspense>

        <div className="text-center mt-8">
            <Button asChild size="lg" className="font-bold text-lg px-8 py-6">
                <Link href="/">
                    <RefreshCw className="mr-3 h-6 w-6" />
                    Reflect Again
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}

async function Feedback({ level, userResponses }: { level: string; userResponses: string }) {
  const [feedback, cue] = await Promise.all([
    providePersonalizedFeedback({ egoIdentityLevel: level, responses: userResponses }),
    recommendIntimacyCue({ egoIdentityLevel: level as 'High' | 'Moderate' | 'Low' | 'Very Low', userResponses: userResponses }),
  ]);

  return (
    <>
      <ResultCard icon={<Lightbulb />} title="Narrative Insights">
        <p>{feedback.narrativeInsights}</p>
      </ResultCard>
      <ResultCard icon={<Heart />} title="Intimacy Readiness">
        <p>{feedback.intimacyReadiness}</p>
      </ResultCard>
      <ResultCard icon={<Sparkles />} title="Your Recommended Intimacy Cue">
        <p className="font-semibold text-primary-foreground/90">{feedback.optimalCue}</p>
        <p className="mt-4 italic text-foreground/80">{cue.intimacyCue}</p>
      </ResultCard>
    </>
  );
}

function ResultCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-headline text-primary">
                    <span className="text-primary">{icon}</span>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4 text-base">
                {children}
            </CardContent>
        </Card>
    )
}


function FeedbackSkeleton() {
    return (
        <>
            <Card className="bg-card/50 backdrop-blur-sm animate-pulse">
                <CardHeader>
                    <div className="h-7 w-48 bg-muted rounded"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
            </Card>
             <Card className="bg-card/50 backdrop-blur-sm animate-pulse">
                <CardHeader>
                    <div className="h-7 w-48 bg-muted rounded"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                </CardContent>
            </Card>
        </>
    )
}
