'use server';

import { analyzeEgoIdentityLevel } from '@/ai/flows/analyze-ego-identity-level';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
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

export async function analyzeAndRedirect(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedData = formSchema.parse(data);

  const { egoIdentityLevel } = await analyzeEgoIdentityLevel(validatedData);

  const params = new URLSearchParams({
    level: egoIdentityLevel,
  });
  
  for (const [key, value] of Object.entries(validatedData)) {
    params.append(key.replace('response', 'r'), value);
  }

  redirect(`/results?${params.toString()}`);
}
