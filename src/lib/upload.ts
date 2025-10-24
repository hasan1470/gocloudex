import cloudinary from './cloudinary';

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: 'gocloudex/projects',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        }
      )
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    // Extract public_id from Cloudinary URL
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`gocloudex/projects/${publicId}`);
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

export const deleteMultipleFromCloudinary = async (imageUrls: string[]): Promise<void> => {
  try {
    const deletePromises = imageUrls.map(url => deleteFromCloudinary(url));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting multiple images from Cloudinary:', error);
    throw error;
  }
};