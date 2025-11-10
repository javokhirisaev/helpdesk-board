'use client';

export default function MyQueueSummary({ tickets, onRemove, onClear }) {
  return (
    <section className="rounded-lg border border-gray-700 bg-gray-900 p-4 text-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Queue</h2>
        <span className="text-sm text-gray-400">Selected: {tickets.length}</span>
      </div>

      {tickets.length === 0 ? (
        <p className="mt-2 text-sm text-gray-400">No tickets in your queue.</p>
      ) : (
        <>
          <ul className="mt-3 divide-y divide-gray-700">
            {tickets.map((t) => (
              <li key={t.id} className="py-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-gray-400">
                    {t.priority} · {t.status}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(t.id)}
                  className="text-sm rounded border border-gray-600 px-2 py-1 hover:bg-gray-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-end">
            <button
              onClick={onClear}
              className="rounded bg-gray-700 hover:bg-gray-600 px-3 py-2 text-sm text-white"
            >
              Clear Queue
            </button>
          </div>
        </>
      )}
    </section>
  );
}
