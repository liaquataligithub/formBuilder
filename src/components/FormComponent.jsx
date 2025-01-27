import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export function FormComponent({ field, onDelete, onMove, isFirst, isLast }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: field.id,
    disabled: false
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Simplified delete handler
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!field?.id) {
      console.error('Field ID is missing');
      return;
    }

    if (typeof onDelete === 'function') {
      onDelete(field.id);
    } else {
      console.error('onDelete is not a function. Received:', onDelete, 'for field ID:', field.id);
    }
  };

  // Move handler
  const handleMove = React.useCallback((direction, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!field?.id) {
      console.error('Field ID is missing'); 
      return;
    }

    if (typeof onMove === 'function') {
      onMove(field.id, direction);
    } else {
      console.error('onMove is not a function');
    }
  }, [field, onMove]);

  if (!field || !field.id || !field.type || !field.label) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 relative group"
    >
      <div className="absolute right-2 top-1/5 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100">
        {/* Move Up Button */}
        {!isFirst && (
          <button
            type="button"
            onClick={(e) => handleMove('up', e)}
            className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors z-50"
            title="Move up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {/* Move Down Button */}
        {!isLast && (
          <button
            type="button"
            onClick={(e) => handleMove('down', e)}
            className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors z-50"
            title="Move down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          className="p-1 hover:bg-red-50 rounded-md text-red-500 transition-colors z-50"
          title="Delete field"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="p-1 hover:bg-gray-50 rounded-md cursor-move"
        >
          <Grip className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      {field.type === 'text' && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder={field.placeholder}
        />
      )}
      {field.type === 'number' && (
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder={field.placeholder}
        />
      )}
      {field.type === 'email' && (
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder={field.placeholder}
        />
      )}
      {field.type === 'textarea' && (
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder={field.placeholder}
          rows={3}
        />
      )}
      {field.type === 'select' && (
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">Select an option</option>
        </select>
      )}
    </div>
  );
}

FormComponent.defaultProps = {
  onDelete: () => console.warn('onDelete function not provided'),
}; 