import Board from './components/Board';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Helpdesk Ticket Board</h1>
      <Board />
    </main>
  );
}