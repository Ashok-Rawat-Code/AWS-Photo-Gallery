import React from 'react';
import { Square2StackIcon, ArrowUturnLeftIcon, FolderIcon, TrashIcon } from '@heroicons/react/24/outline';

interface PhotoGridHeaderProps {
  isSelectionMode: boolean;
  selectedCount: number;
  onDelete: () => void;
  onMove: () => void;
  onClearSelection: () => void;
  startSelection: () => void;
}

export function PhotoGridHeader({
  isSelectionMode,
  selectedCount,
  onDelete,
  onMove,
  onClearSelection,
  startSelection
}: PhotoGridHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm mb-4 p-4 rounded-lg">
      {isSelectionMode ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-lg font-medium text-gray-900">
            {selectedCount} photo{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onMove}
              disabled={selectedCount === 0}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FolderIcon className="w-5 h-5 mr-2" />
              Move to Folder
            </button>
            <button
              onClick={onDelete}
              disabled={selectedCount === 0}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              Delete
            </button>
            <button
              onClick={onClearSelection}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Photos</h2>
          <button
            onClick={startSelection}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Square2StackIcon className="w-5 h-5 mr-2" />
            Select Multiple Photos
          </button>
        </div>
      )}
    </div>
  );
}