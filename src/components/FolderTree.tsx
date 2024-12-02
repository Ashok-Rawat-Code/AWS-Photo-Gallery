import React, { useState } from 'react';
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { FolderTreeProps } from '../types';

export function FolderTree({ name, path, structure, level, onFolderClick }: FolderTreeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubfolders = Object.keys(structure).length > 0;

  return (
    <div className="w-full" style={{ paddingLeft: `${level * 1}rem` }}>
      <button
        onClick={() => {
          onFolderClick(path);
          setIsExpanded(!isExpanded);
        }}
        className="flex items-center w-full p-2 hover:bg-gray-50 rounded-lg group"
      >
        {hasSubfolders ? (
          <FolderOpenIcon className="h-5 w-5 text-yellow-500 mr-2" />
        ) : (
          <FolderIcon className="h-5 w-5 text-yellow-500 mr-2" />
        )}
        <span className="text-sm text-gray-600 group-hover:text-gray-900">{name}</span>
      </button>
      
      {isExpanded && hasSubfolders && (
        <div className="mt-1">
          {Object.entries(structure).map(([subName, subStructure]) => (
            <FolderTree
              key={`${path}${subName}/`}
              name={subName}
              path={`${path}${subName}/`}
              structure={subStructure}
              level={level + 1}
              onFolderClick={onFolderClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}