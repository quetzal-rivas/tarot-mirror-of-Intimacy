import { Suspense } from 'react';
import { PromptForm } from './PromptForm';

const prompts = [
    "🕯️ Describe a time when you realized what kind of partner truly suits you—not just what others expected.",
    "🛡️ Tell a story about a time you stood up for something you wouldn’t tolerate in a relationship.",
    "🌒 Have you ever connected with different types of people to learn what feels right in love? What did you discover?",
    "🔍 Can you describe what you truly want from a romantic relationship—and how you came to know that?",
    "🌀 Share a moment when you felt emotionally close to someone without losing your sense of self.",
    "📜 How have your past relationships shaped your sense of self or your views on love?",
    "💬 Describe a time you expressed your emotional needs in a relationship. How did it go?",
    "🕊️ Tell me about a relationship you entered—or didn’t enter—not out of fear of being alone, but for your own reasons.",
    "🌿 What is your relationship with being single? Can you describe a time when you felt whole on your own?",
    "✨ Have you ever walked away from a relationship that didn’t align with your values? What gave you the strength to do so?"
];

function PromptsPageContent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-headline text-4xl font-bold text-primary">Your Reflection</h1>
        <p className="mt-2 text-lg text-muted-foreground">Answer these questions from the heart. There are no right or wrong answers.</p>
      </div>
      <PromptForm prompts={prompts} />
    </div>
  );
}

export default function PromptsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PromptsPageContent />
        </Suspense>
    )
}
