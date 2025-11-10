'use client';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) {
    return <div className="rounded-md border border-gray-700 bg-gray-900 p-3 text-sm text-gray-300">Loading…</div>;
  }
  if (error) {
    return <div className="rounded-md border border-red-700 bg-red-900 p-3 text-sm text-red-100">Unable to load tickets.</div>;
  }
  if (isEmpty) {
    return <div className="rounded-md border border-gray-700 bg-gray-900 p-3 text-sm text-gray-300">No tickets match your filters.</div>;
  }
  return null;
}