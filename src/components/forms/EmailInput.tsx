"use client";

import { forwardRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      value,
      onChange,
      onValidChange,
      placeholder = "Enter your email",
      disabled,
      error,
    },
    ref
  ) => {
    const handleGmailClick = () => {
      if (!value.includes("@") && value.trim()) {
        const newValue = `${value}@gmail.com`;
        onChange(newValue);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Basic email validation
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
      onValidChange?.(isValid);
    };

    const showGmailButton = value.trim() && !value.includes("@");

    return (
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-accent h-4 w-4" />
            <Input
              ref={ref}
              type="email"
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              disabled={disabled}
              className={`pl-10 bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary ${
                error
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : ""
              }`}
            />
          </div>

          {showGmailButton && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGmailClick}
              disabled={disabled}
              className="bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-600/50 hover:border-slate-500 px-3 py-2 text-sm whitespace-nowrap"
            >
              @gmail.com
            </Button>
          )}
        </div>

        {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

EmailInput.displayName = "EmailInput";
