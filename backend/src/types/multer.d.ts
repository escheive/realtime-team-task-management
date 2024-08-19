// import * as multer from 'multer';
// import * as multerS3 from 'multer-s3';

// declare module 'multer' {
//   interface File {
//     location?: string; // Add location property
//   }
// }

import { Request } from 'express';
import { S3 } from '@aws-sdk/client-s3';

declare global {
  namespace Express {
    interface Request {
      file?: S3.ManagedUpload.SendData; // Or use the custom type if defined
      files?: S3.ManagedUpload.SendData[];
    }
  }
}
