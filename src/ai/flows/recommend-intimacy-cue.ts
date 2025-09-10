// src/ai/flows/recommend-intimacy-cue.ts
'use server';

/**
 * @fileOverview Recommends an intimacy cue tailored to the user's ego identity level.
 *
 * - recommendIntimacyCue - A function that recommends an intimacy cue.
 * - RecommendIntimacyCueInput - The input type for the recommendIntimacyCue function.
 * - RecommendIntimacyCueOutput - The return type for the recommendIntimacyCue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendIntimacyCueInputSchema = z.object({
  egoIdentityLevel: z
    .enum(['High', 'Moderate', 'Low', 'Very Low'])
    .describe('The ego identity level of the user.'),
  userResponses: z.string().describe('The text responses provided by the user.'),
});
export type RecommendIntimacyCueInput = z.infer<typeof RecommendIntimacyCueInputSchema>;

const RecommendIntimacyCueOutputSchema = z.object({
  intimacyCue: z.string().describe('The recommended intimacy cue for the user.'),
});
export type RecommendIntimacyCueOutput = z.infer<typeof RecommendIntimacyCueOutputSchema>;

export async function recommendIntimacyCue(input: RecommendIntimacyCueInput): Promise<RecommendIntimacyCueOutput> {
  return recommendIntimacyCueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendIntimacyCuePrompt',
  input: {schema: RecommendIntimacyCueInputSchema},
  output: {schema: RecommendIntimacyCueOutputSchema},
  prompt: `You are an expert in intimacy and relationships.

  Based on the user's ego identity level and their responses to questions, recommend an intimacy cue that will enhance their openness to closeness.

  Ego Identity Level: {{{egoIdentityLevel}}}
  User Responses: {{{userResponses}}}

  Recommendation:`,
});

const recommendIntimacyCueFlow = ai.defineFlow(
  {
    name: 'recommendIntimacyCueFlow',
    inputSchema: RecommendIntimacyCueInputSchema,
    outputSchema: RecommendIntimacyCueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
