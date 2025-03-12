import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronLeft, ChevronRight, Clock, BookOpen, X } from "lucide-react";

interface HistoryItem {
  id: string;
  question: string;
  timestamp: string;
  subject: string;
}

interface HistorySidebarProps {
  historyItems?: HistoryItem[];
  onSelectItem?: (item: HistoryItem) => void;
  onClearHistory?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const HistorySidebar = ({
  historyItems = [
    {
      id: "1",
      question: "What is the quadratic formula?",
      timestamp: "2023-06-15T14:30:00Z",
      subject: "Mathematics",
    },
    {
      id: "2",
      question: "Explain photosynthesis process",
      timestamp: "2023-06-15T13:45:00Z",
      subject: "Biology",
    },
    {
      id: "3",
      question: "Solve for x: 2x + 5 = 13",
      timestamp: "2023-06-14T16:20:00Z",
      subject: "Mathematics",
    },
    {
      id: "4",
      question: "What are Newton's laws of motion?",
      timestamp: "2023-06-14T10:15:00Z",
      subject: "Physics",
    },
    {
      id: "5",
      question: "Explain the water cycle",
      timestamp: "2023-06-13T09:30:00Z",
      subject: "Earth Science",
    },
  ],
  onSelectItem = () => {},
  onClearHistory = () => {},
  isOpen = true,
  onToggle = () => {},
}: HistorySidebarProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Group history items by date
  const groupedItems = historyItems.reduce<Record<string, HistoryItem[]>>(
    (acc, item) => {
      const date = new Date(item.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="h-full flex flex-col border-l border-gray-200 bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">History</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            {isOpen ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {Object.entries(groupedItems).length > 0 ? (
          Object.entries(groupedItems).map(([date, items]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{date}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <Collapsible
                    key={item.id}
                    open={expanded[item.id]}
                    className="border border-gray-200 rounded-md overflow-hidden"
                  >
                    <CollapsibleTrigger asChild>
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleExpand(item.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium truncate max-w-[180px]">
                            {item.subject}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm mb-2">{item.question}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => onSelectItem(item)}
                        >
                          View Solution
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
            <X className="h-12 w-12 mb-2 opacity-20" />
            <p className="text-sm">No history yet</p>
            <p className="text-xs mt-1">
              Your solved problems will appear here
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default HistorySidebar;
