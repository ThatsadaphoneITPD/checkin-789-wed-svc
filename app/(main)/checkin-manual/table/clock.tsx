import React, { useMemo } from 'react';
import Clock from 'react-simple-clock';

interface ClockDisplayProps {
  formattedTime: string;
}

const parseTime = (timeStr: string): { hour24: number; minute: number; period: 'AM' | 'PM' } => {
  if (!timeStr) return { hour24: 0, minute: 0, period: 'AM' };

  // Split into time and optional period (AM/PM)
  const [timePart, periodRaw] = timeStr.trim().split(/\s+/);
  const [hStr, mStr = '0'] = timePart.split(':');
  let hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  let period: 'AM' | 'PM' = 'AM';

  if (periodRaw) {
    period = periodRaw.toUpperCase() === 'PM' ? 'PM' : 'AM';
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
  } else {
    period = hour >= 12 ? 'PM' : 'AM';
  }
  return { hour24: hour % 24, minute, period };
};



const ClockDisplay: React.FC<ClockDisplayProps> = ({ formattedTime }) => {
  // Memoise parsed values so we only re‑compute when formattedTime changes
  const { hour24, minute, period } = useMemo(() => parseTime(formattedTime), [formattedTime]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-center justify-center">
      {/* Clock column */}
      <div className="mx-auto justify-center sm:justify-end">
        <Clock
          live={false}
          hourValue={hour24}
          minuteValue={minute}
          hourMarkFormat="number"
          className="clock_check shrink-0"
          size={150}
        />
      </div>

      {/* Text column */}
      <div className="text-center mx-auto mt-auto md:mt-6 md:ml-4 sm:text-left text-base sm:text-xl md:text-2xl font-mono text-gray-700 dark:text-gray-200">
        {hour24}:{minute}  ({period === 'AM' ? 'ເຊົ້າ' : 'ແລງ'})
      </div>
    </div>
  );
};

export default ClockDisplay;
