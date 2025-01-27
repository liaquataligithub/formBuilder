export function NoteCard({ note, onClick, isDraggable }) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg shadow-sm h-full
        ${note.color} 
        transition-all duration-200
        ${onClick ? 'hover:scale-105 cursor-pointer' : ''}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}
      `}
    >
      <h3 className="font-semibold text-slate-800 mb-2">{note.title}</h3>
      <p className="text-slate-600 text-sm">{note.content}</p>
    </div>
  );
} 