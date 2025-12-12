"use client";
import { Label } from "@/app/components/ui/label";

interface SchedulePickerProps {
  date: string;
  time: string;
  onChangeDate: (value: string) => void;
  onChangeTime: (value: string) => void;
}

export const SchedulePicker = ({ date, time, onChangeDate, onChangeTime }: SchedulePickerProps) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex gap-6 items-center">
    <div className="flex flex-col flex-1">
      <Label className="text-sm font-medium text-gray-900 mb-1">Select Date</Label>
      <input
        type="date"
        className="p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
        value={date}
        onChange={e => onChangeDate(e.target.value)}
      />
    </div>
    <div className="flex flex-col flex-1">
      <Label className="text-sm font-medium text-gray-900 mb-1">Select Time</Label>
      <input
        type="time"
        className="p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
        value={time}
        onChange={e => onChangeTime(e.target.value)}
      />
    </div>
  </div>
)
