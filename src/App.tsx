import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { FormField } from './types';
import { FormComponent } from './components/FormComponent';
import { DraggableComponent } from './components/DraggableComponent';
import { LayoutGrid } from 'lucide-react';

const formComponents: FormField[] = [
  { id: 'text', type: 'text', label: 'Text Input', placeholder: 'Enter text' },
  { id: 'number', type: 'number', label: 'Number Input', placeholder: 'Enter number' },
  { id: 'email', type: 'email', label: 'Email Input', placeholder: 'Enter email' },
  { id: 'textarea', type: 'textarea', label: 'Text Area', placeholder: 'Enter long text' },
  { id: 'select', type: 'select', label: 'Select Input' },
];

function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = formFields.findIndex((field) => field.id === active.id);
      const newIndex = formFields.findIndex((field) => field.id === over.id);
      
      setFormFields(arrayMove(formFields, oldIndex, newIndex));
    }
    
    setActiveId(null);
  };

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // If dragging from components to form area
    const componentType = active.id as string;
    const component = formComponents.find((c) => c.type === componentType);
    
    if (component && !formFields.find((f) => f.id === active.id)) {
      const newField = { ...component, id: uuidv4() };
      setFormFields([...formFields, newField]);
    }
  };

  const handleAddField = (field: FormField) => {
    setFormFields([...formFields, field]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <LayoutGrid className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
        </div>
        
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="grid grid-cols-12 gap-8">
            {/* Components Panel */}
            <div className="col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
                <div className="space-y-3">
                  {formComponents.map((component) => (
                    <DraggableComponent 
                      key={component.type} 
                      field={component}
                      onAdd={handleAddField}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Form Building Area */}
            <div className="col-span-9">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Preview</h2>
                <SortableContext items={formFields} strategy={verticalListSortingStrategy}>
                  {formFields.map((field) => (
                    <FormComponent key={field.id} field={field} />
                  ))}
                </SortableContext>
                
                {formFields.length === 0 && (
                  <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">Drag and drop components here to build your form</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-500">
                {formComponents.find((c) => c.type === activeId)?.label}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;