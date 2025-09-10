'use server';

import { analyzeEgoIdentityLevel } from '@/ai/flows/analyze-ego-identity-level';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const narrativeFormSchema = z.object({
  response1: z.string().min(10, 'Please provide a more detailed response.'),
  response2: z.string().min(10, 'Please provide a more detailed response.'),
  response3: z.string().min(10, 'Please provide a more detailed response.'),
  response4: z.string().min(10, 'Please provide a more detailed response.'),
  response5: z.string().min(10, 'Please provide a more detailed response.'),
  response6: z.string().min(10, 'Please provide a more detailed response.'),
  response7: z.string().min(10, 'Please provide a more detailed response.'),
  response8: z.string().min(10, 'Please provide a more detailed response.'),
  response9: z.string().min(10, 'Please provide a more detailed response.'),
  response10: z.string().min(10, 'Please provide a more detailed response.'),
});

const questionnaireSchema = z.object(
    Object.fromEntries(
      Array.from({ length: 15 }, (_, i) => [
        `q${i + 1}`,
        z.string().transform(Number),
      ])
    )
);

const combinedSchema = narrativeFormSchema.merge(questionnaireSchema);

export async function analyzeAndRedirect(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedData = combinedSchema.parse(data);

  const narrativeData = narrativeFormSchema.parse(validatedData);
  const { egoIdentityLevel } = await analyzeEgoIdentityLevel(narrativeData);

  const params = new URLSearchParams({
    level: egoIdentityLevel,
  });
  
  for (const [key, value] of Object.entries(validatedData)) {
    if (key.startsWith('response')) {
        params.append(key.replace('response', 'r'), String(value));
    } else if (key.startsWith('q')) {
        params.append(key, String(value));
    }
  }

  redirect(`/results?${params.toString()}`);
}
