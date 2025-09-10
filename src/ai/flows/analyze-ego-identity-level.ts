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
  response1: z.string().describe("The user's response to the first prompt."),
  response2: z.string().describe("The user's response to the second prompt."),
  response3: z.string().describe("The user's response to the third prompt."),
  response4: z.string().describe("The user's response to the fourth prompt."),
  response5: z.string().describe("The user's response to the fifth prompt."),
  response6: z.string().describe("The user's response to the sixth prompt."),
  response7: z.string().describe("The user's response to the seventh prompt."),
  response8: z.string().describe("The user's response to the eighth prompt."),
  response9: z.string().describe("The user's response to the ninth prompt."),
  response10: z.string().describe("The user's response to the tenth prompt."),
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
  prompt: `You are an expert in analyzing text responses to classify the respondent's ego identity level based on Eriksonian principles.

  Based on the following 10 responses, classify the user's ego identity level as High, Moderate, Low, or Very Low.

  Response 1: {{{response1}}}
  Response 2: {{{response2}}}
  Response 3: {{{response3}}}
  Response 4: {{{response4}}}
  Response 5: {{{response5}}}
  Response 6: {{{response6}}}
  Response 7: {{{response7}}}
  Response 8: {{{response8}}}
  Response 9: {{{response9}}}
  Response 10: {{{response10}}}

  Consider these general guidelines:
  - High: Clear sense of self, well-defined values and beliefs, strong commitment, clear boundaries, autonomy, and vulnerability tolerance.
  - Moderate: Some exploration, developing values, moderate commitment, inconsistent boundaries.
  - Low: Lack of exploration, poorly defined values, weak commitment, difficulty with boundaries and autonomy.
  - Very Low: Confusion, absence of values, no commitment, highly dependent on others for self-worth.

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
