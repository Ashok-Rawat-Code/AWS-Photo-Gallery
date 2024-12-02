# AWS S3 Photo Manager

A React-based photo management application that uses AWS S3 for storage. Built with Vite, TypeScript, and Tailwind CSS.

## Features

- Upload photos to AWS S3
- Create and navigate folders
- View photos in a grid layout
- Multi-select photos for batch operations
- Delete single or multiple photos
- Automatic thumbnail generation
- Drag and drop upload support
- Mobile-responsive design
- Folder navigation with breadcrumbs

## Prerequisites

- Node.js (v14 or higher)
- npm
- AWS Account with S3 bucket
- AWS credentials with appropriate S3 permissions

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Ashok-Rawat-Code/AWS-S3-Photo-Manager.git
cd AWS-S3-Photo-Manager
```

2. Make the deployment script executable and run it:
```bash
chmod +x deploy-local.sh
./deploy-local.sh
```

3. Start the development server:
```bash
cd photo-manager
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_AWS_ACCESS_KEY_ID=your_access_key_id
VITE_AWS_SECRET_ACCESS_KEY=your_secret_access_key
VITE_AWS_REGION=your_region
VITE_AWS_BUCKET_NAME=your_bucket_name
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Security Note

Never commit your `.env` file containing AWS credentials to version control. The `.env` file is included in `.gitignore` for security.