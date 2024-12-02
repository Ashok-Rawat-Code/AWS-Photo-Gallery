import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { FolderNavigationProps } from '../types';
import { FolderTree } from './FolderTree';

export function FolderNavigation({ 
  currentPath, 
  folderStructure,
  onFolderClick, 
  onNavigateUp 
}: FolderNavigationProps) {
  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-4 bg-white p-4 rounded-lg shadow-sm">
        <button
          onClick={onNavigateUp}
          disabled={currentPath === ''}
          className={`text-sm ${currentPath === '' ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}
        >
          ← Back
        </button>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onFolderClick('')}
            className="text-gray-600 hover:text-gray-800"
          >
            Root
          </button>
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <button
                onClick={() => onFolderClick(pathParts.slice(0, index + 1).join('/') + '/')}
                className="text-gray-600 hover:text-gray-800"
              >
                {part}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Folders</h2>
        <div className="space-y-1">
          {Object.entries(folderStructure).map(([name, structure]) => (
            <FolderTree
              key={name}
              name={name}
              path={`${name}/`}
              structure={structure}
              level={0}
              onFolderClick={onFolderClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}