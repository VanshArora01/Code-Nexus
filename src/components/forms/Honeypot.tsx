"use client";

import { type ReactElement } from "react";

interface HoneypotProps {
  name?: string;
  value: string;
  onChange: (v: string) => void;
}

/**
 * Honeypot component to catch bots.
 * Bots usually fill all fields, while humans don't see this one.
 * If this field has a value on submission, it's likely a bot.
 */
export function Honeypot({ 
  name = "website_verification", 
  value, 
  onChange 
}: HoneypotProps): ReactElement {
  return (
    <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
      <label htmlFor={name}>Leave this field empty</label>
      <input
        id={name}
        name={name}
        type="text"
        tabIndex={-1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
