
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface MonthYearPickerProps {
  value?: { month: number; year: number }
  onChange?: (value: { month: number; year: number }) => void
  placeholder?: string
  className?: string
  minYear?: number
  maxYear?: number
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function MonthYearPicker({
  value,
  onChange,
  placeholder = "Select month and year",
  className,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // mulai range tahun berdasarkan value atau tahun sekarang
  const initialYear = value?.year || new Date().getFullYear()
  const startDecade = Math.floor(initialYear / 10) * 10
  const [startYear, setStartYear] = useState(startDecade)

  const handleYearSelect = (year: number) => {
    onChange?.({ month: value?.month ?? new Date().getMonth(), year })
  }

  const handleMonthSelect = (monthIndex: number) => {
    onChange?.({ month: monthIndex, year: value?.year ?? startYear })
    setIsOpen(false)
  }

  const formatValue = () => {
    if (!value) return placeholder
    return `${months[value.month]} ${value.year}`
  }

  const years = Array.from({ length: 12 }, (_, i) => startYear + i) // tampilkan 12 tahun

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", className)}
        >
          {formatValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-4">
          {/* Header navigasi tahun */}
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStartYear((prev) => prev - 12)}
              disabled={startYear <= minYear}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-semibold">
              {years[0]} - {years[years.length - 1]}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStartYear((prev) => prev + 12)}
              disabled={startYear >= maxYear}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Grid tahun */}
          <div className="grid grid-cols-4 gap-2">
            {years.map((y) => (
              <Button
                key={y}
                variant={value?.year === y ? "default" : "outline"}
                size="sm"
                disabled={y < minYear || y > maxYear}
                onClick={() => handleYearSelect(y)}
              >
                {y}
              </Button>
            ))}
          </div>

          {/* Grid bulan */}
          <div>
            <div className="mb-2 font-semibold">Month</div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((m, i) => (
                <Button
                  key={m}
                  variant={value?.month === i && value?.year === value?.year ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMonthSelect(i)}
                  className="h-9 text-xs"
                >
                  {m.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
