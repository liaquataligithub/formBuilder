import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
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
import { FormComponent } from './components/FormComponent';
import { DraggableComponent } from './components/DraggableComponent';
import { LayoutGrid } from 'lucide-react';

const formComponents = [
  { id: 'text', type: 'text', label: 'Text Input', placeholder: 'Enter text' },
  { id: 'number', type: 'number', label: 'Number Input', placeholder: 'Enter number' },
  { id: 'email', type: 'email', label: 'Email Input', placeholder: 'Enter email' },
  { id: 'textarea', type: 'textarea', label: 'Text Area', placeholder: 'Enter long text' },
  { id: 'select', type: 'select', label: 'Select Input' },
];

function App() {
  const [activeId, setActiveId] = useState(null);
  const [formFields, setFormFields] = useState([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = formFields.findIndex((field) => field.id === active.id);
      const newIndex = formFields.findIndex((field) => field.id === over.id);
      
      setFormFields(arrayMove(formFields, oldIndex, newIndex));
    }
    
    setActiveId(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // If dragging from components to form area
    const componentType = active.id;
    const component = formComponents.find((c) => c.type === componentType);
    
    if (component && !formFields.find((f) => f.id === active.id)) {
      const newField = { ...component, id: uuidv4() };
      setFormFields([...formFields, newField]);
    }
  };

  const handleAddField = (field) => {
    setFormFields([...formFields, field]);
  };

  const handleDeleteField = React.useCallback((fieldId) => {
    if (!fieldId) return;
    
    setFormFields(prevFields => 
      prevFields.filter(field => field.id !== fieldId)
    );
  }, []);

  const handleMoveField = React.useCallback((fieldId, direction) => {
    if (!fieldId) return;

    setFormFields(prevFields => {
      const currentIndex = prevFields.findIndex(field => field.id === fieldId);
      
      // If field not found, return unchanged
      if (currentIndex === -1) return prevFields;

      // Create new array
      const newFields = [...prevFields];

      if (direction === 'up' && currentIndex > 0) {
        // Move up - swap with previous element
        const temp = newFields[currentIndex];
        newFields[currentIndex] = newFields[currentIndex - 1];
        newFields[currentIndex - 1] = temp;
      } 
      else if (direction === 'down' && currentIndex < newFields.length - 1) {
        // Move down - swap with next element
        const temp = newFields[currentIndex];
        newFields[currentIndex] = newFields[currentIndex + 1];
        newFields[currentIndex + 1] = temp;
      }

      return newFields;
    });
  }, []);

  useEffect(() => {
    console.log('Form fields state updated:', formFields);
  }, [formFields]);

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
                  {formFields.map((field, index) => {
                    if (!field || !field.id) {
                      console.error('Invalid field:', field);
                      return null;
                    }

                    return (
                      <FormComponent 
                        key={field.id} 
                        field={field} 
                        onDelete={(id) => handleDeleteField(id)}
                        onMove={handleMoveField}
                        isFirst={index === 0}
                        isLast={index === formFields.length - 1}
                      />
                    );
                  })}
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