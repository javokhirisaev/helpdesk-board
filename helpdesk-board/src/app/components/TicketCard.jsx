'use client';

function Badge({ children, tone = 'gray' }) {
  const tones = {
    gray: 'bg-gray-700 text-gray-200',
    green: 'bg-green-700 text-green-100',
    yellow: 'bg-yellow-700 text-yellow-100',
    red: 'bg-red-700 text-red-100',
    blue: 'bg-blue-700 text-blue-100',
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

const toneForStatus = (s) =>
  s === 'Resolved' ? 'green' : s === 'On Hold' ? 'yellow' : s === 'In Progress' ? 'blue' : 'gray';
const toneForPriority = (p) =>
  p === 'Critical' ? 'red' : p === 'High' ? 'yellow' : p === 'Medium' ? 'blue' : 'gray';

export default function TicketCard({ ticket, isQueued, onAdd }) {
  return (
    <article className="rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-sm text-gray-100">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-5 text-white">{ticket.title}</h3>
        <Badge tone={toneForPriority(ticket.priority)}>Priority: {ticket.priority}</Badge>
      </div>

      <p className="mt-2 text-sm text-gray-300 line-clamp-3">{ticket.description}</p>

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <Badge tone={toneForStatus(ticket.status)}>Status: {ticket.status}</Badge>
        <span className="text-gray-400">Assignee: {ticket.assignee}</span>
        <span className="text-gray-400">
          Updated: {new Date(ticket.updatedAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-4">
        <button
          className="w-full rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          onClick={onAdd}
          disabled={isQueued}
        >
          {isQueued ? 'Already in My Queue' : 'Add to My Queue'}
        </button>
        {isQueued && (
          <p className="mt-1 text-xs text-gray-500">This ticket is in your queue.</p>
        )}
      </div>
    </article>
  );
}
