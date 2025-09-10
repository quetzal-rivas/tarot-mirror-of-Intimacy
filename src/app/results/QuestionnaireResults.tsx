'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3 } from "lucide-react";

type QuestionnaireResultsProps = {
  scores: number[];
};

const domains = [
  { name: 'Career & Education', questions: [1, 2, 3] },
  { name: 'Relationships & Intimacy', questions: [4, 5, 6] },
  { name: 'Gender, Identity, and Roles', questions: [7, 8, 9] },
  { name: 'Beliefs & Values', questions: [10, 11, 12] },
  { name: 'Self-Perception and Consistency', questions: [13, 14, 15] },
];

const getDomainInterpretation = (score: number): string => {
    if (score >= 13) return 'High clarity';
    if (score >= 9) return 'Moderate, some uncertainty';
    if (score >= 7) return 'Developing well';
    return 'Low integration across contexts';
};

const getTotalLevel = (totalScore: number): string => {
    if (totalScore >= 65) return 'High';
    if (totalScore >= 50) return 'Moderate';
    if (totalScore >= 35) return 'Low';
    return 'Very Low';
};

export function QuestionnaireResults({ scores }: QuestionnaireResultsProps) {
  const domainScores = domains.map(domain => {
    const score = domain.questions.reduce((acc, qIndex) => acc + scores[qIndex - 1], 0);
    return {
      name: domain.name,
      score,
      interpretation: getDomainInterpretation(score),
    };
  });

  const totalScore = scores.reduce((acc, score) => acc + score, 0);
  const overallLevel = getTotalLevel(totalScore);

  return (
    <>
      <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary shadow-xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 font-headline text-2xl text-center">
              <BarChart3 className="h-7 w-7" />
              Your Questionnaire Ego Identity Level
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-primary">{overallLevel}</p>
            <p className="text-muted-foreground mt-2">(Total Score: {totalScore} out of 75)</p>
          </CardContent>
        </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl font-headline text-primary">
            <BarChart3 className="h-6 w-6" />
            Domain-Level Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead className="text-right">Score (out of 15)</TableHead>
                <TableHead>Interpretation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domainScores.map((domain) => (
                <TableRow key={domain.name}>
                  <TableCell className="font-medium">{domain.name}</TableCell>
                  <TableCell className="text-right">{domain.score}</TableCell>
                  <TableCell>{domain.interpretation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
