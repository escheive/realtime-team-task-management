import express from 'express';
import multer from 'multer';
import { fileUpload } from '../controllers/fileController';

const router = express.Router();
const upload = multer(); // multer middleware

// Endpoint for file uploads
router.post('/upload', upload.single('file'), fileUpload);

export default router;