import { Request, Response } from 'express';
import { uploadFile } from '../services/s3Service';


export const fileUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Upload file to S3 and get URL
    const fileUrl = await uploadFile(req.file);

    // Respond with file URL
    res.status(200).json({ fileUrl });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(`Error uploading file: ${error.message}`);
    } else {
      res.status(500).send(`Unknown error while uploading file: ${error}`);
    }
  }
}