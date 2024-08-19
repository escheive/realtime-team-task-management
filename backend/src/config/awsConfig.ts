import AWS from 'aws-sdk';
import dotenv from 'dotenv';

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_ACCESS_SECRET = process.env.AWS_ACCESS_SECRET;
const AWS_REGION = process.env.AWS_REGION;

if (!AWS_ACCESS_KEY || !AWS_ACCESS_SECRET) {
  throw new Error('Missing AWS access key or secret access key');
}

// Configure AWS SDK
AWS.config.update({
  region: AWS_REGION,
  credentials: new AWS.Credentials(AWS_ACCESS_KEY, AWS_ACCESS_SECRET)
});

// Create S3 instance
const s3 = new AWS.S3();