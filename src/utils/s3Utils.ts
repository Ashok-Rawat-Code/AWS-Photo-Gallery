import { PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws';

export const createFolder = async (folderPath: string) => {
  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: folderPath,
    Body: '', // Empty content for folder placeholder
  });
  await s3Client.send(command);
};

export const movePhoto = async (sourceKey: string, destinationKey: string) => {
  // Copy to new location
  const copyCommand = new CopyObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    CopySource: `${import.meta.env.VITE_AWS_BUCKET_NAME}/${sourceKey}`,
    Key: destinationKey,
  });
  await s3Client.send(copyCommand);

  // Delete from old location
  const deleteCommand = new DeleteObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: sourceKey,
  });
  await s3Client.send(deleteCommand);
};

export const deleteFolder = async (folderPath: string) => {
  const listCommand = new ListObjectsV2Command({
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Prefix: folderPath,
  });

  const response = await s3Client.send(listCommand);
  if (!response.Contents) return;

  await Promise.all(
    response.Contents.map(async (object) => {
      if (!object.Key) return;
      const deleteCommand = new DeleteObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: object.Key,
      });
      await s3Client.send(deleteCommand);
    })
  );
};

export const renameFolder = async (oldPath: string, newPath: string) => {
  const listCommand = new ListObjectsV2Command({
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Prefix: oldPath,
  });

  const response = await s3Client.send(listCommand);
  if (!response.Contents) return;

  await Promise.all(
    response.Contents.map(async (object) => {
      if (!object.Key) return;
      const newKey = object.Key.replace(oldPath, newPath);
      await movePhoto(object.Key, newKey);
    })
  );
};