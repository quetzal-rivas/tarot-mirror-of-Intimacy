'use server';

import { analyzeEgoIdentityLevel } from '@/ai/flows/analyze-ego-identity-level';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
  response1: z.string().min(10, 'Please provide a more detailed response.'),
  response2: z.string().min(10, 'Please provide a more detailed response.'),
  response3: z.string().min(10, 'Please provide a more detailed response.'),
});

export async function analyzeAndRedirect(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedData = formSchema.parse(data);

  const { egoIdentityLevel } = await analyzeEgoIdentityLevel(validatedData);

  const params = new URLSearchParams({
    level: egoIdentityLevel,
    r1: validatedData.response1,
    r2: validatedData.response2,
    r3: validatedData.response3,
  });

  redirect(`/results?${params.toString()}`);
}
