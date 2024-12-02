import React, { useState } from 'react';
import { PhotoUploader } from './components/PhotoUploader';
import { PhotoGrid } from './components/PhotoGrid';
import { FolderNavigation } from './components/FolderNavigation';
import { useS3Photos } from './hooks/useS3Photos';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function App() {
  const [currentPath, setCurrentPath] = useState<string>('');
  const { photos, folderStructure, isLoading, refreshPhotos } = useS3Photos(currentPath);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDelete = (key: string) => {
    refreshPhotos();
  };

  const handleFolderClick = (folder: string) => {
    setCurrentPath(folder);
    setIsSidebarOpen(false);
  };

  const handleNavigateUp = () => {
    const newPath = currentPath.split('/').slice(0, -2).join('/');
    setCurrentPath(newPath ? `${newPath}/` : '');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Photo Manager</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:static inset-0 z-10 transform lg:transform-none
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            transition-transform duration-300 ease-in-out
            lg:flex-shrink-0 lg:w-80 xl:w-96 bg-white lg:min-h-screen
          `}
        >
          <div className="h-full overflow-y-auto p-4">
            <FolderNavigation
              currentPath={currentPath}
              folderStructure={folderStructure}
              onFolderClick={handleFolderClick}
              onNavigateUp={handleNavigateUp}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden lg:flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Photo Manager</h1>
              <div className="text-sm text-gray-600">
                Current location: {currentPath || 'Root'}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 mb-8">
              <PhotoUploader currentPath={currentPath} onUploadSuccess={refreshPhotos} />
            </div>

            {isLoading ? (
              <div className="text-center text-gray-600">Loading photos...</div>
            ) : photos.length === 0 && Object.keys(folderStructure).length === 0 ? (
              <div className="text-center text-gray-600">No photos or folders found</div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Found {photos.length} photos in this location
                </div>
                <PhotoGrid photos={photos} onDelete={handleDelete} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;