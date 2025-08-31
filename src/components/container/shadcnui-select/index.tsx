import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Option = {
  label: string;
  value: string;
};

type ShadcnUiSelectProps = {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export default function ShadcnUiSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
}: ShadcnUiSelectProps) {
  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && <Label>{label}</Label>}
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
