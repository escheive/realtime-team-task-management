import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import s3 from './awsConfig';
import multerS3 from 'multer-s3';

const AWS_BUCKET = process.env.AWS_BUCKET;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: AWS_BUCKET || '',
    acl: 'public-read',
    metadata: (request, file, callback): void => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (request, file, callback) => {
      callback(null, `uploads/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

export default upload;