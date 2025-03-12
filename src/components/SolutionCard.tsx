import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { Lightbulb, Clock } from "lucide-react";

interface SolutionCardProps {
  originalQuestion?: string;
  solution?: string;
  subject?: string;
  timestamp?: string;
  isLoading?: boolean;
}

const SolutionCard = ({
  originalQuestion = "What is the derivative of f(x) = x² + 3x - 5?",
  solution = "To find the derivative of f(x) = x² + 3x - 5, we apply the power rule and the constant rule:\n\n1. For x²: The derivative is 2x\n2. For 3x: The derivative is 3\n3. For -5: The derivative is 0 (constants disappear)\n\nTherefore, f'(x) = 2x + 3",
  subject = "Calculus",
  timestamp = "Just now",
  isLoading = false,
}: SolutionCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full h-[450px] max-w-[800px] mx-auto bg-white shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-700">
            Processing your question...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[350px] space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500">Our AI is working on your solution</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[450px] max-w-[800px] mx-auto bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-700">
            Solution
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>{timestamp}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {subject}
          </span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                QUESTION
              </h3>
              <p className="text-gray-800">{originalQuestion}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2 mb-2">
                <Lightbulb className="text-blue-600 mt-0.5" size={18} />
                <h3 className="text-sm font-medium text-blue-600">SOLUTION</h3>
              </div>
              <div className="text-gray-800 whitespace-pre-line">
                {solution}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
