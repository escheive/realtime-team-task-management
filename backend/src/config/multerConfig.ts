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
    metadata: (req, file, callback): void => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
      callback(null, `uploads/${Date.now().toString()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Please upload an image file.')); // Image only
    }
    callback(null, true);
  }
});

export default upload;