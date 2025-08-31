import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";

type DatePickerProps = {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showDropdown?: boolean;
  className?: string;
  disabled?: boolean;
};

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  open,
  onOpenChange,
  showDropdown = true,
  className = "",
  disabled = false,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(undefined);
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const selectedDate = date !== undefined ? date : internalDate;
  const isOpen = open !== undefined ? open : internalOpen;
  const isControlled = date !== undefined && onDateChange !== undefined;

  const handleDateChange = (newDate: Date | undefined) => {
    if (isControlled) {
      onDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
            disabled={disabled}
          >
            {selectedDate ? format(selectedDate, "PPP") : placeholder}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout={showDropdown ? "dropdown" : "label"}
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
