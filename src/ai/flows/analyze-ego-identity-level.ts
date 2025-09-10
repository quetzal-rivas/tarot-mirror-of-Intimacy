'use server';

/**
 * @fileOverview Analyzes user responses to classify their ego identity level.
 *
 * - analyzeEgoIdentityLevel - A function that analyzes user responses and classifies them.
 * - AnalyzeEgoIdentityLevelInput - The input type for the analyzeEgoIdentityLevel function.
 * - AnalyzeEgoIdentityLevelOutput - The return type for the analyzeEgoIdentityLevel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEgoIdentityLevelInputSchema = z.object({
  response1: z.string().describe('The user\'s response to the first prompt.'),
  response2: z.string().describe('The user\'s response to the second prompt.'),
  response3: z.string().describe('The user\'s response to the third prompt.'),
});
export type AnalyzeEgoIdentityLevelInput = z.infer<typeof AnalyzeEgoIdentityLevelInputSchema>;

const AnalyzeEgoIdentityLevelOutputSchema = z.object({
  egoIdentityLevel: z
    .enum(['High', 'Moderate', 'Low', 'Very Low'])
    .describe('The ego identity level classified based on the user responses.'),
});
export type AnalyzeEgoIdentityLevelOutput = z.infer<typeof AnalyzeEgoIdentityLevelOutputSchema>;

export async function analyzeEgoIdentityLevel(
  input: AnalyzeEgoIdentityLevelInput
): Promise<AnalyzeEgoIdentityLevelOutput> {
  return analyzeEgoIdentityLevelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEgoIdentityLevelPrompt',
  input: {schema: AnalyzeEgoIdentityLevelInputSchema},
  output: {schema: AnalyzeEgoIdentityLevelOutputSchema},
  prompt: `You are an expert in analyzing text responses to classify the respondent's ego identity level.

  Based on the following responses, classify the user's ego identity level as High, Moderate, Low, or Very Low.

  Response 1: {{{response1}}}
  Response 2: {{{response2}}}
  Response 3: {{{response3}}}

  Consider these general guidelines:
  - High: Clear sense of self, well-defined values and beliefs, strong commitment.
  - Moderate: Some exploration, developing values, moderate commitment.
  - Low: Lack of exploration, poorly defined values, weak commitment.
  - Very Low: Confusion, absence of values, no commitment.

  Provide only the ego identity level, without any additional explanation.
  Ego Identity Level:`,
});

const analyzeEgoIdentityLevelFlow = ai.defineFlow(
  {
    name: 'analyzeEgoIdentityLevelFlow',
    inputSchema: AnalyzeEgoIdentityLevelInputSchema,
    outputSchema: AnalyzeEgoIdentityLevelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
