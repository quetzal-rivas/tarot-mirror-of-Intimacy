import { QuestionnaireForm } from './QuestionnaireForm';

const sections = [
  {
    title: 'SECTION 1: Career & Education',
    questions: [
      'I’ve considered different career paths and thought seriously about what fits me best.',
      'I feel confident about the direction I’ve chosen for my future career.',
      'I’m studying or working in an area that reflects who I really am.',
    ],
  },
  {
    title: 'SECTION 2: Relationships & Intimacy',
    questions: [
      'I’ve thought about what I want from romantic relationships, not just what others expect.',
      'I have a clear sense of the kind of partner and relationship that aligns with my values.',
      'I’m able to maintain close relationships without losing my sense of self.',
    ],
  },
  {
    title: 'SECTION 3: Gender, Identity, and Roles',
    questions: [
      'I’ve questioned or reflected on traditional gender expectations and how they apply to me.',
      'I feel comfortable with how I express my gender and femininity.',
      'I don’t feel pressured to conform to how others think a woman should behave.',
    ],
  },
  {
    title: 'SECTION 4: Beliefs & Values',
    questions: [
      'I’ve explored different belief systems (e.g., political, spiritual, philosophical) to see what fits me.',
      'I live by a set of personal values that guide my decisions.',
      'I can explain why I believe what I believe—not just because that’s what I was taught.',
    ],
  },
  {
    title: 'SECTION 5: Self-Perception and Consistency',
    questions: [
      'I have a good sense of who I am across different social situations.',
      'I don’t feel like a different person depending on who I’m with.',
      'I trust my own judgment when making important decisions.',
    ],
  },
];

export default function QuestionnairePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Ego Identity Questionnaire
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Rate your agreement with the following statements.
        </p>
      </div>
      <QuestionnaireForm sections={sections} />
    </div>
  );
}
