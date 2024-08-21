import { Request } from 'express';
import { S3 } from '@aws-sdk/client-s3';

declare global {
  namespace Express {
    interface Request {
      file?: S3.ManagedUpload.SendData;
      files?: S3.ManagedUpload.SendData[];
    }
  }
}
