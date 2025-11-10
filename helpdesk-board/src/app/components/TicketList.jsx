'use client';

import TicketCard from './TicketCard';

export default function TicketList({ tickets, queuedSet, onAddToQueue }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-gray-200">Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} isQueued={queuedSet.has(t.id)} onAdd={() => onAddToQueue(t.id)} />
        ))}
      </div>
    </section>
  );
}
