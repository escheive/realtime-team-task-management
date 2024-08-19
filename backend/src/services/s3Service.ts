import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/awsConfig';

// Define s3 bucket name from AWS
const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

// Upload file to S3
export const uploadFile = async (file: Express.Multer.File) => {
  const params = {
    Bucket: BUCKET_NAME || '',
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    return `https://${BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error uploading file: ${error.message}`);
      throw new Error(`Error uploading file: ${error.message}`);
    } else {
      console.error('An unknown error occurred during file upload');
      throw new Error('An unknown error occurred during file upload');
    }
  }
}