import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Photo } from '../types';

interface PhotoThumbnailProps {
  photo: Photo;
  isSelected: boolean;
  isDeleting: boolean;
  isSelectionMode: boolean;
  onSelect: (key: string) => void;
  onClick: () => void;
  onDelete: () => void;
}

export function PhotoThumbnail({
  photo,
  isSelected,
  isDeleting,
  isSelectionMode,
  onSelect,
  onClick,
  onDelete
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

      {/* Checkbox for selection */}
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

      {/* Delete button */}
      {!isSelectionMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={isDeleting}
          className={`absolute top-2 right-2 p-2 bg-red-500 rounded-full 
            transition-all duration-200 touch-manipulation
            ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <TrashIcon className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}