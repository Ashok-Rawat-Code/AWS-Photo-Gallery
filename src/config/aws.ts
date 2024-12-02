import { S3Client } from '@aws-sdk/client-s3';

const validateConfig = () => {
  const required = [
    'VITE_AWS_ACCESS_KEY_ID',
    'VITE_AWS_SECRET_ACCESS_KEY',
    'VITE_AWS_REGION',
    'VITE_AWS_BUCKET_NAME'
  ];

  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required AWS configuration: ${missing.join(', ')}`);
  }
};

validateConfig();

export const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});