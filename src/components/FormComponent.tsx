// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { FormField } from '../types';
// import { Grip, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

// interface FormComponentProps {
//   field: FormField;
//   onDelete?: (id: string) => void;
//   onMove?: (id: string, direction: 'up' | 'down') => void;
//   isFirst?: boolean;
//   isLast?: boolean;
// }

// export function FormComponent({ field, onDelete, onMove, isFirst, isLast }: FormComponentProps) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: field.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleDelete = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!field?.id) {
//       console.error('Field ID is missing');
//       return;
//     }

//     onDelete?.(field.id);
//   };

//   const handleMove = (direction: 'up' | 'down', e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!field?.id) {
//       console.error('Field ID is missing');
//       return;
//     }

//     onMove?.(field.id, direction);
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 relative group"
//     >
//       <div className="absolute right-2 top-1/5 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100">
//         {!isFirst && (
//           <button
//             type="button"
//             onClick={(e) => handleMove('up', e)}
//             className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors z-50"
//             title="Move up"
//           >
//             <ChevronUp className="w-4 h-4" />
//           </button>
//         )}

//         {!isLast && (
//           <button
//             type="button"
//             onClick={(e) => handleMove('down', e)}
//             className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors z-50"
//             title="Move down"
//           >
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         )}

//         <button
//           type="button"
//           onClick={handleDelete}
//           className="p-1 hover:bg-red-50 rounded-md text-red-500 transition-colors z-50"
//           title="Delete field"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>

//         <div
//           {...attributes}
//           {...listeners}
//           className="p-1 hover:bg-gray-50 rounded-md cursor-move"
//         >
//           <Grip className="w-4 h-4 text-gray-400" />
//         </div>
//       </div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {field.label}
//       </label>
//       {field.type === 'text' && (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           placeholder={field.placeholder}
//         />
//       )}
//       {field.type === 'number' && (
//         <input
//           type="number"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           placeholder={field.placeholder}
//         />
//       )}
//       {field.type === 'email' && (
//         <input
//           type="email"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           placeholder={field.placeholder}
//         />
//       )}
//       {field.type === 'textarea' && (
//         <textarea
//           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           placeholder={field.placeholder}
//           rows={3}
//         />
//       )}
//       {field.type === 'select' && (
//         <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//           <option value="">Select an option</option>
//         </select>
//       )}
//     </div>
//   );
// }