'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const likertScale = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
] as const;

const questionsCount = 15;
const formSchema = z.object(
  Object.fromEntries(
    Array.from({ length: questionsCount }, (_, i) => [
      `q${i + 1}`,
      z.string({ required_error: 'Please select an option.' }),
    ])
  )
);

type QuestionnaireFormValues = z.infer<typeof formSchema>;

type Section = {
  title: string;
  questions: string[];
};

export function QuestionnaireForm({ sections }: { sections: Section[] }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: QuestionnaireFormValues) => {
    setIsPending(true);
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
        params.append(key, value);
    }
    router.push(`/prompts?${params.toString()}`);
  };
  
  let questionCounter = 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.questions.map((question, questionIndex) => {
                questionCounter++;
                const fieldName = `q${questionCounter}` as keyof QuestionnaireFormValues;
                return (
                  <FormField
                    key={questionCounter}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base text-foreground font-normal">
                          {`${questionCounter}. ${question}`}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-2 sm:space-y-0 pt-2"
                          >
                            {likertScale.map((label, index) => (
                              <FormItem
                                key={index}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={String(index + 1)} />
                                </FormControl>
                                <FormLabel className="font-normal text-muted-foreground">
                                  {label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="font-bold text-lg px-8 py-6 shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderCircle className="mr-3 h-6 w-6 animate-spin" />
                Proceeding...
              </>
            ) : (
              <>
                Continue to Reflection
                <Wand2 className="ml-3 h-6 w-6" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
