"use client";

import type React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface KeywordInputProps {
  keywords: string[];
  maxKeywords?: number;
  onChange: (keywords: string[]) => void;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({ keywords, maxKeywords = 10, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() && keywords.length < maxKeywords) {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (!keywords.includes(newKeyword)) {
        onChange([...keywords, newKeyword]);
      }
      setInputValue("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    onChange(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-3 bg-white">
      <div className="flex flex-wrap gap-2 mb-3">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            {keyword}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveKeyword(keyword)}
            >
              <X className="w-3 h-3" />
            </Button>
          </span>
        ))}
      </div>

      <div className="relative">
        <Input
          placeholder="Add search keywords that highlight your event's topic, theme, and more"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddKeyword}
          className="pr-20 border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-300"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
          {keywords.length}/{maxKeywords} Tags
        </span>
      </div>
    </div>
  );
};
