import { PromptForm } from './PromptForm';

const prompts = [
    "Reflect on a moment you felt truly understood by someone. What made that connection feel so strong?",
    "Describe a time you chose to be vulnerable. What did you learn about yourself or the other person?",
    "What does a 'safe' relationship feel like to you, and what role do you play in creating that safety?"
];

export default function PromptsPage() {
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
