import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { NoteCard } from './NoteCard';
import { DraggableNoteCard } from './DraggableNoteCard';

const initialComponents = [
  {
    id: 'component-1',
    title: 'Button Component',
    content: 'A reusable button with customizable styles',
    color: 'bg-indigo-50 hover:bg-indigo-100',
  },
  {
    id: 'component-2',
    title: 'Card Component',
    content: 'Versatile card layout for content display',
    color: 'bg-emerald-50 hover:bg-emerald-100',
  },
  {
    id: 'component-3',
    title: 'Modal Component',
    content: 'Popup dialog for important interactions',
    color: 'bg-amber-50 hover:bg-amber-100',
  },
  {
    id: 'component-4',
    title: 'Form Input',
    content: 'Styled input field with validation',
    color: 'bg-rose-50 hover:bg-rose-100',
  },
  {
    id: 'component-5',
    title: 'Navigation Bar',
    content: 'Responsive top navigation with menu items',
    color: 'bg-cyan-50 hover:bg-cyan-100',
  },
];

export function KanbanBoard() {
  const [selectedComponents, setSelectedComponents] = useState([]);

  const handleComponentClick = (component) => {
    if (!selectedComponents.some(c => c.id === component.id)) {
      setSelectedComponents(prev => [...prev, component]);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const newComponents = Array.from(selectedComponents);
    const [movedComponent] = newComponents.splice(source.index, 1);
    newComponents.splice(destination.index, 0, movedComponent);

    setSelectedComponents(newComponents);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Component Library</h1>
        
        <div className="flex gap-8">
            {/* Right Column - Available Components */}
          <div className="w-1/2">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Available Components</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {initialComponents.map(component => (
                  <NoteCard
                    key={component.id}
                    note={component}
                    onClick={() => handleComponentClick(component)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Left Column - Draggable Selected Components */}
          <div className="w-1/2">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Selected Components</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="selected-components">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      bg-white p-6 rounded-lg shadow-sm min-h-[600px]
                      ${snapshot.isDraggingOver ? 'bg-slate-50' : ''}
                    `}
                  >
                    {selectedComponents.map((component, index) => (
                      <DraggableNoteCard
                        key={component.id}
                        note={component}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                    {selectedComponents.length === 0 && (
                      <p className="text-slate-500 text-center py-4">
                        Click components from the right to add them here
                      </p>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          
        </div>
      </div>
    </div>
  );
} 