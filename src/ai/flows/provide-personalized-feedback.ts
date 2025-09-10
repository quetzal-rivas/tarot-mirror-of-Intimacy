'use server';

/**
 * @fileOverview A flow to provide personalized feedback based on user responses,
 * including narrative insights, intimacy readiness, and an intimacy cue recommendation.
 *
 * - providePersonalizedFeedback - A function that handles the personalized feedback process.
 * - ProvidePersonalizedFeedbackInput - The input type for the providePersonalizedFeedback function.
 * - ProvidePersonalizedFeedbackOutput - The return type for the providePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvidePersonalizedFeedbackInputSchema = z.object({
  egoIdentityLevel: z
    .string()
    .describe("The user's ego identity level (High, Moderate, Low, Very Low)."),
  responses: z
    .string()
    .describe('The user responses to the narrative prompts.'),
});
export type ProvidePersonalizedFeedbackInput = z.infer<
  typeof ProvidePersonalizedFeedbackInputSchema
>;

const ProvidePersonalizedFeedbackOutputSchema = z.object({
  narrativeInsights: z
    .string()
    .describe('Narrative insights based on the user responses.'),
  intimacyReadiness:
    z.string().describe('The user intimacy readiness level.'),
  optimalCue:
    z.string().describe('The optimal cue/framing for enhanced intimacy.'),
});
export type ProvidePersonalizedFeedbackOutput = z.infer<
  typeof ProvidePersonalizedFeedbackOutputSchema
>;

export async function providePersonalizedFeedback(
  input: ProvidePersonalizedFeedbackInput
): Promise<ProvidePersonalizedFeedbackOutput> {
  return providePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'providePersonalizedFeedbackPrompt',
  input: {schema: ProvidePersonalizedFeedbackInputSchema},
  output: {schema: ProvidePersonalizedFeedbackOutputSchema},
  prompt: `You are an expert relationship advisor. You provide personalized feedback to users based on their ego identity level and responses to narrative prompts.

Ego Identity Level: {{{egoIdentityLevel}}}
User Responses: {{{responses}}}

Provide narrative insights, assess their intimacy readiness, and recommend an optimal cue/framing for enhanced intimacy, so that they can understand themselves better and improve their relationships.
`,
});

const providePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'providePersonalizedFeedbackFlow',
    inputSchema: ProvidePersonalizedFeedbackInputSchema,
    outputSchema: ProvidePersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
