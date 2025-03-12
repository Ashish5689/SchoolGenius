import React, { useState } from "react";
import InputSection from "./InputSection";
import SolutionCard from "./SolutionCard";
import HistorySidebar from "./HistorySidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { BookOpen } from "lucide-react";

interface HistoryItem {
  id: string;
  question: string;
  timestamp: string;
  subject: string;
  solution?: string;
  imageUrl?: string;
}

interface HomeworkHelperProps {
  apiKey?: string;
}

const HomeworkHelper = ({
  apiKey = "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",
}: HomeworkHelperProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [currentSolution, setCurrentSolution] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: "1",
      question: "What is the quadratic formula?",
      timestamp: new Date().toISOString(),
      subject: "Mathematics",
      solution:
        "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a, which gives the solutions to the quadratic equation ax² + bx + c = 0.\n\nFor example, to solve x² + 5x + 6 = 0:\n1. Identify a=1, b=5, c=6\n2. Substitute into the formula: x = (-5 ± √(5² - 4×1×6)) / 2×1\n3. Simplify: x = (-5 ± √(25 - 24)) / 2\n4. Further simplify: x = (-5 ± √1) / 2\n5. This gives us: x = (-5 + 1) / 2 = -2 or x = (-5 - 1) / 2 = -3\n\nTherefore, the solutions are x = -2 and x = -3.",
    },
  ]);

  const handleSubmit = async (data: {
    type: "text" | "image";
    question: string;
    subject: string;
    imageUrl?: string;
  }) => {
    setIsLoading(true);
    setCurrentQuestion(data.question);
    setCurrentSubject(data.subject);
    setCurrentSolution(null);

    // Simulate API call to OpenRouter
    setTimeout(() => {
      // Mock response
      const solution = generateMockSolution(data.question, data.subject);
      setCurrentSolution(solution);
      setIsLoading(false);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        question: data.question,
        timestamp: new Date().toISOString(),
        subject: data.subject,
        solution: solution,
        imageUrl: data.imageUrl,
      };

      setHistoryItems((prev) => [newHistoryItem, ...prev]);
    }, 3000);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentQuestion(item.question);
    setCurrentSubject(item.subject);
    setCurrentSolution(item.solution || null);
    setIsLoading(false);
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Helper function to generate mock solutions
  const generateMockSolution = (question: string, subject: string): string => {
    const subjectSolutions: Record<string, string[]> = {
      math: [
        "To solve this problem, we need to apply the following steps:\n\n1. First, identify the variables and constants\n2. Apply the appropriate formula\n3. Solve step by step\n\nThe answer is x = 42.",
        "This is a calculus problem that requires differentiation:\n\n1. Apply the power rule: d/dx(x^n) = n*x^(n-1)\n2. For each term, find the derivative\n3. Combine the results\n\nThe final answer is f'(x) = 2x + 3.",
      ],
      physics: [
        "To solve this physics problem:\n\n1. Identify the known quantities: velocity = 20 m/s, time = 5s\n2. Apply the kinematic equation: distance = velocity × time\n3. Calculate: distance = 20 m/s × 5s = 100 meters\n\nTherefore, the object traveled 100 meters.",
        "For this problem about forces:\n\n1. Draw a free body diagram\n2. Apply Newton's Second Law: F = ma\n3. Solve for the unknown variable\n\nThe net force is 150 Newtons.",
      ],
      chemistry: [
        "To balance this chemical equation:\n\n1. Count atoms of each element on both sides\n2. Add coefficients to balance the atoms\n3. Verify that all atoms are balanced\n\nThe balanced equation is: 2H₂ + O₂ → 2H₂O",
        "For this acid-base reaction:\n\n1. Identify the acid and base\n2. Write the reaction equation\n3. Calculate the pH using the formula pH = -log[H⁺]\n\nThe pH of the solution is 4.5.",
      ],
    };

    // Default to math if subject not found
    const subjectKey = subject.toLowerCase().includes("math")
      ? "math"
      : subject.toLowerCase().includes("physics")
        ? "physics"
        : subject.toLowerCase().includes("chem")
          ? "chemistry"
          : "math";

    const solutions = subjectSolutions[subjectKey] || subjectSolutions.math;
    return solutions[Math.floor(Math.random() * solutions.length)];
  };

  return (
    <div className="flex h-full w-full bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={75} minSize={50} className="p-6">
          <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                AI Homework Helper
              </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              <InputSection onSubmit={handleSubmit} />

              {(currentQuestion || isLoading) && (
                <SolutionCard
                  originalQuestion={currentQuestion || ""}
                  solution={currentSolution || ""}
                  subject={currentSubject || ""}
                  timestamp="Just now"
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {isSidebarOpen && (
          <ResizablePanel defaultSize={25} minSize={15} maxSize={30}>
            <HistorySidebar
              historyItems={historyItems}
              onSelectItem={handleSelectHistoryItem}
              onClearHistory={handleClearHistory}
              isOpen={isSidebarOpen}
              onToggle={toggleSidebar}
            />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default HomeworkHelper;
