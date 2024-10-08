import { useEffect, useState, useCallback } from "react"
import { addDays, format, startOfToday } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
  value,
  onChange,
}) {
  const today = startOfToday()
  
  const [date, setDate] = useState(value || {
    from: today,
    to: addDays(today, 7),
  })

  useEffect(() => {
    if (value && value.from && value.to && (value.from !== date.from || value.to !== date.to)) {
      setDate(value)
    }
  }, [value])

  const handleSelect = useCallback((newDate) => {
    if (newDate) {
      const adjustedDate = {
        from: newDate.from < today ? today : newDate.from,
        to: newDate.to
      }
      setDate(adjustedDate)
      if (onChange) {
        onChange(adjustedDate)
      }
    }
  }, [onChange, today])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ before: today }}
            fromDate={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}