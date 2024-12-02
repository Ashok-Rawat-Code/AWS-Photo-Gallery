import React, { useState } from 'react';
import { PhotoGridHeader } from './PhotoGridHeader';
import { PhotoThumbnail } from './PhotoThumbnail';
import { PhotoModal } from './PhotoModal';
import { useSelection } from '../hooks/useSelection';
import { usePhotoDelete } from '../hooks/usePhotoDelete';
import { Photo } from '../types';

interface PhotoGridProps {
  photos: Photo[];
  onDelete: (key: string) => void;
}

export function PhotoGrid({ photos, onDelete }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { selectedItems, isSelectionMode, toggleSelection, clearSelection, startSelection } = useSelection();
  const { deletingKeys, handleDelete } = usePhotoDelete({ onDelete, clearSelection });

  const handlePhotoClick = (photo: Photo) => {
    if (isSelectionMode) {
      toggleSelection(photo.key);
    } else {
      setSelectedPhoto(photo);
    }
  };

  return (
    <>
      <PhotoGridHeader
        isSelectionMode={isSelectionMode}
        selectedCount={selectedItems.size}
        onDelete={() => handleDelete(Array.from(selectedItems))}
        onClearSelection={clearSelection}
        startSelection={startSelection}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {photos.map((photo) => (
          <PhotoThumbnail
            key={photo.key}
            photo={photo}
            isSelected={selectedItems.has(photo.key)}
            isDeleting={deletingKeys.has(photo.key)}
            isSelectionMode={isSelectionMode}
            onSelect={toggleSelection}
            onClick={() => handlePhotoClick(photo)}
            onDelete={() => handleDelete([photo.key])}
          />
        ))}
      </div>

      {selectedPhoto && !isSelectionMode && (
        <PhotoModal
          isOpen={true}
          onClose={() => setSelectedPhoto(null)}
          imageUrl={selectedPhoto.url}
        />
      )}
    </>
  );
}