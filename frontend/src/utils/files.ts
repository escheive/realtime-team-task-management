import imageCompression from 'browser-image-compression';

export const compressUploadFile = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // Limit to 1 MB
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    // Compress the image
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    throw new Error('Failed to compress or upload file');
  }
};
