import imageCompression from 'browser-image-compression';

export const compressUploadFile = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // Limit to 1 MB
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    // Compress the image
    const compressedBlob = await imageCompression(file, options);
    
    // Create a new File object with the original name
    const compressedFile = new File([compressedBlob], file.name, { type: file.type });
    return compressedFile;
  } catch (error) {
    throw new Error('Failed to compress or upload file');
  }
};
