import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

type YearPickerProps = {
  year?: number;
  onYearChange?: (year: number | undefined) => void;
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  disabled?: boolean;
  minYear?: number;
  maxYear?: number;
};

export function YearPicker({
  year,
  onYearChange,
  placeholder = "Select year",
  open,
  onOpenChange,
  className = "",
  disabled = false,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
}: YearPickerProps) {
  const [internalYear, setInternalYear] = useState<number | undefined>(undefined);
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const selectedYear = year !== undefined ? year : internalYear;
  const isOpen = open !== undefined ? open : internalOpen;
  const isControlled = year !== undefined && onYearChange !== undefined;

  const handleYearChange = (newYear: number) => {
    if (isControlled) {
      onYearChange(newYear);
    } else {
      setInternalYear(newYear);
    }
    handleOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  // Generate array of years
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal bg-transparent"
            disabled={disabled}
          >
            {selectedYear ? selectedYear : placeholder}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="max-h-60 overflow-y-auto p-2">
            <div className="grid grid-cols-4 gap-1">
              {years.map((yearOption) => (
                <Button
                  key={yearOption}
                  variant={selectedYear === yearOption ? "default" : "ghost"}
                  size="sm"
                  className="h-8 w-full text-sm"
                  onClick={() => handleYearChange(yearOption)}
                >
                  {yearOption}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
