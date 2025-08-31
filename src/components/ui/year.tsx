"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface YearPickerProps {
  value?: number;
  onChange?: (year: number) => void;
  placeholder?: string;
  className?: string;
  minYear?: number;
  maxYear?: number;
}

export function YearPicker({
  value,
  onChange,
  placeholder = "Select year",
  className,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
}: YearPickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayYear, setDisplayYear] = useState(value || new Date().getFullYear());

  const years = useMemo(() => {
    const yearList = [];
    for (let year = minYear; year <= maxYear; year++) {
      yearList.push(year);
    }
    return yearList;
  }, [minYear, maxYear]);

  const handleYearSelect = (year: number) => {
    onChange?.(year);
    setIsOpen(false);
  };

  const navigateYears = (direction: "prev" | "next") => {
    const increment = direction === "next" ? 12 : -12;
    const newYear = displayYear + increment;
    if (newYear >= minYear && newYear <= maxYear) {
      setDisplayYear(newYear);
    }
  };

  const getVisibleYears = () => {
    const startYear = Math.floor(displayYear / 12) * 12;
    return years
      .slice(Math.max(0, startYear - minYear), Math.max(0, startYear - minYear + 12))
      .filter((year) => year >= minYear && year <= maxYear);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? value : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateYears("prev")}
              disabled={displayYear - 12 < minYear}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-semibold">
              {Math.floor(displayYear / 12) * 12} - {Math.floor(displayYear / 12) * 12 + 11}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateYears("next")}
              disabled={displayYear + 12 > maxYear}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {getVisibleYears().map((year) => (
              <Button
                key={year}
                variant={value === year ? "default" : "outline"}
                size="sm"
                onClick={() => handleYearSelect(year)}
                className="h-9"
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
