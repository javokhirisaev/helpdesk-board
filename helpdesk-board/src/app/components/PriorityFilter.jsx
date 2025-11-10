'use client';

export default function PriorityFilter({ value, onChange, options }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1 text-gray-300">Priority</span>
      <select
        className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
