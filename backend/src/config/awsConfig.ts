import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_ACCESS_SECRET = process.env.AWS_ACCESS_SECRET;
const AWS_REGION = process.env.AWS_REGION;

if (!AWS_ACCESS_KEY || !AWS_ACCESS_SECRET) {
  throw new Error('Missing AWS access key or secret access key');
}

// Configure AWS SDK
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY || '',
    secretAccessKey: AWS_ACCESS_SECRET || '',
  },
});

export default s3;