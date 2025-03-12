import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Upload, Camera, Image as ImageIcon, Send } from "lucide-react";

interface InputSectionProps {
  onSubmit?: (data: {
    type: "text" | "image";
    question: string;
    subject: string;
    imageUrl?: string;
  }) => void;
}

const InputSection = ({ onSubmit }: InputSectionProps) => {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [textQuestion, setTextQuestion] = useState("");
  const [subject, setSubject] = useState("math");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textQuestion.trim() && onSubmit) {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        onSubmit({
          type: "text",
          question: textQuestion,
          subject,
        });
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile && onSubmit) {
      setIsProcessing(true);
      // Simulate OCR processing
      setTimeout(() => {
        onSubmit({
          type: "image",
          question: "Extracted question would appear here",
          subject,
          imageUrl: imagePreview || undefined,
        });
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Ask Your Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="text"
          onValueChange={(value) => setActiveTab(value as "text" | "image")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Send size={16} /> Type Question
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon size={16} /> Upload Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Your Question</Label>
                <Input
                  id="question"
                  placeholder="Type your question here..."
                  value={textQuestion}
                  onChange={(e) => setTextQuestion(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="computer_science">
                      Computer Science
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing || !textQuestion.trim()}
              >
                {isProcessing ? "Processing..." : "Submit Question"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="image">
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-md"
                    />
                    <p className="text-sm text-gray-500">
                      Click or drag to replace
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">
                        Drag and drop your image here
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        or click to browse files
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    document.getElementById("camera-capture")?.click()
                  }
                >
                  <Camera size={16} />
                  Take Photo
                  <input
                    id="camera-capture"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="image-subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="computer_science">
                      Computer Science
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing || !imageFile}
              >
                {isProcessing ? "Processing OCR..." : "Extract & Submit"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InputSection;
