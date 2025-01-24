import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';

export function DraggableComponent({ field, onAdd }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: field.type,
    data: field,
  });

  const handleClick = () => {
    const newField = { ...field, id: uuidv4() };
    onAdd(newField);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-pointer
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:border-blue-500 hover:shadow-md transition-all duration-200`}
    >
      <p className="font-medium text-gray-700">{field.label}</p>
      <p className="text-sm text-gray-500">Click to add to form</p>
    </div>
  );
} 