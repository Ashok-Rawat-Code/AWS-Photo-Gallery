import React from 'react';
import { TrashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface PhotoThumbnailProps {
  photo: Photo;
  isSelected: boolean;
  isDeleting: boolean;
  isSelectionMode: boolean;
  onSelect: (key: string) => void;
  onClick: () => void;
  onDelete: () => void;
  onMove: () => void;
}

export function PhotoThumbnail({
  photo,
  isSelected,
  isDeleting,
  isSelectionMode,
  onSelect,
  onClick,
  onDelete,
  onMove
}: PhotoThumbnailProps) {
  return (
    <div className="relative group aspect-square">
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={onClick}
      >
        <img
          src={photo.thumbnailUrl}
          alt="Thumbnail"
          className={`w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-200
            ${isDeleting ? 'opacity-50' : ''}
            ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        />
      </div>

      {/* Selection checkbox */}
      <div
        className={`absolute top-2 left-2 z-10 transition-opacity duration-200
          ${isSelectionMode || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <label className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded p-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(photo.key);
            }}
            className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Action buttons */}
      {!isSelectionMode && (
        <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMove();
            }}
            className="flex-1 flex items-center justify-center px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 max-w-[100px]"
          >
            <ArrowRightIcon className="w-4 h-4 mr-1" />
            Move
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 max-w-[100px]"
          >
            <TrashIcon className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}