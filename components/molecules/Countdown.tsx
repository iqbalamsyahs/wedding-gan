"use client";

import { useState, useEffect } from "react";
import Typography from "@/components/atoms/Typography";

const TARGET = new Date("2026-10-26T09:00:00+07:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}

const LABELS: [keyof ReturnType<typeof diff>, string][] = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minute"],
  ["seconds", "Second"],
];

export default function Countdown() {
  const [vals, setVals] = useState(diff);

  useEffect(() => {
    const id = setInterval(() => setVals(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-9 lg:gap-14">
      {LABELS.map(([key, label]) => (
        <div key={key} className="flex flex-col items-center">
          <Typography
            variant="body-bold"
            className="text-[32px] leading-none text-[#934646] tracking-[-0.02em] lg:text-[40px]"
          >
            {String(vals[key]).padStart(2, "0")}
          </Typography>
          <Typography
            variant="body-bold"
            className="text-[12px] leading-tight text-[#934646] tracking-[-0.02em] lg:text-[14px]"
          >
            {label}
          </Typography>
        </div>
      ))}
    </div>
  );
}
