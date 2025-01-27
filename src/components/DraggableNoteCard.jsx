import { Draggable } from '@hello-pangea/dnd';
import { NoteCard } from './NoteCard';

export function DraggableNoteCard({ note, index }) {
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 ${snapshot.isDragging ? 'opacity-75' : ''}`}
        >
          <NoteCard note={note} isDraggable />
        </div>
      )}
    </Draggable>
  );
} 