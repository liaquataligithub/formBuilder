import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '../types';
import { Grip } from 'lucide-react';

interface FormComponentProps {
  field: FormField;
}

export function FormComponent({ field }: FormComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 relative group"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-move"
      >
        <Grip className="w-4 h-4 text-gray-400" />
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