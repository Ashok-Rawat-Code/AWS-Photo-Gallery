import React from 'react';
import { Square2StackIcon } from '@heroicons/react/24/outline';

interface PhotoGridHeaderProps {
  isSelectionMode: boolean;
  selectedCount: number;
  onDelete: () => void;
  onClearSelection: () => void;
  startSelection: () => void;
}

export function PhotoGridHeader({
  isSelectionMode,
  selectedCount,
  onDelete,
  onClearSelection,
  startSelection
}: PhotoGridHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm mb-4 p-4 flex justify-between items-center">
      {isSelectionMode ? (
        <>
          <span className="text-sm font-medium text-gray-600">
            {selectedCount} selected
          </span>
          <div className="space-x-2">
            <button
              onClick={onDelete}
              disabled={selectedCount === 0}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Delete Selected
            </button>
            <button
              onClick={onClearSelection}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-semibold text-gray-900">Photos</h2>
          <button
            onClick={startSelection}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Square2StackIcon className="w-5 h-5 mr-2" />
            Select Multiple
          </button>
        </div>
      )}
    </div>
  );
}