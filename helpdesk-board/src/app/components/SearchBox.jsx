'use client';

export default function SearchBox({ value, onChange }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1 text-gray-300">Search</span>
      <input
        type="text"
        placeholder="Search title or description"
        className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-gray-100 placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
