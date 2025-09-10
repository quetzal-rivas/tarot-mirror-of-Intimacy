'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeAndRedirect } from '../actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  response1: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response2: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response3: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response4: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response5: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response6: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response7: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response8: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response9: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response10: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
});

type PromptFormValues = z.infer<typeof formSchema>;

type ResponseKeys = `response${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;

export function PromptForm({ prompts }: { prompts: string[] }) {
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      response1: '',
      response2: '',
      response3: '',
      response4: '',
      response5: '',
      response6: '',
      response7: '',
      response8: '',
      response9: '',
      response10: '',
    },
  });

  const onSubmit = async (data: PromptFormValues) => {
    setIsPending(true);
    const formData = new FormData();
    // Pass along questionnaire answers
    searchParams.forEach((value, key) => {
      formData.append(key, value);
    });
    // Add prompt responses
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    await analyzeAndRedirect(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {prompts.map((prompt, index) => {
        const responseKey = `response${index + 1}` as ResponseKeys;
        return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-normal text-foreground">
                {`Question ${index + 1}: ${prompt}`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                {...form.register(responseKey)}
                placeholder="Type your reflection here..."
                className="min-h-[120px] text-base"
                aria-label={`Response to question ${index + 1}`}
                />
                {form.formState.errors[responseKey] && (
                <p className="mt-2 text-sm text-destructive">
                    {form.formState.errors[responseKey]?.message}
                </p>
                )}
            </CardContent>
            </Card>
        );
      })}
      
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
              Revealing your reflection...
            </>
          ) : (
            <>
              <Wand2 className="mr-3 h-6 w-6" />
              Unveil My Path
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
