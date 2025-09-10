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

const formSchema = z.object({
  response1: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response2: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
  response3: z.string().min(10, { message: "Please elaborate a little more on your reflection." }),
});

type PromptFormValues = z.infer<typeof formSchema>;

export function PromptForm({ prompts }: { prompts: string[] }) {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      response1: '',
      response2: '',
      response3: '',
    },
  });

  const onSubmit = async (data: PromptFormValues) => {
    setIsPending(true);
    const formData = new FormData();
    formData.append('response1', data.response1);
    formData.append('response2', data.response2);
    formData.append('response3', data.response3);
    await analyzeAndRedirect(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {prompts.map((prompt, index) => (
        <Card key={index} className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-normal text-primary-foreground">
              {`Question ${index + 1}: ${prompt}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              {...form.register(`response${index + 1 as 1 | 2 | 3}`)}
              placeholder="Type your reflection here..."
              className="min-h-[120px] text-base"
              aria-label={`Response to question ${index + 1}`}
            />
            {form.formState.errors[`response${index + 1 as 1 | 2 | 3}`] && (
              <p className="mt-2 text-sm text-destructive">
                {form.formState.errors[`response${index + 1 as 1 | 2 | 3}`]?.message}
              </p>
            )}
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
