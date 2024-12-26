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
- Docker (optional)

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

The script will automatically detect if Docker is installed and choose the appropriate deployment method.

### Docker Deployment
If Docker is installed, the application will be built and run in a Docker container:
- The application will be available at http://localhost:5173
- Environment variables will be passed from your .env file to the container

### Local Deployment
If Docker is not available, the script will:
- Install dependencies
- Build the project
- Provide instructions for running the development server

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

## Docker Commands

- `docker-compose up --build` - Build and start the container
- `docker-compose down` - Stop and remove the container
- `docker-compose logs` - View container logs

## Security Note

Never commit your `.env` file containing AWS credentials to version control. The `.env` file is included in `.gitignore` for security.