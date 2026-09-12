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
    const url = new URL(imageUrl);
    if (url.hostname !== 'res.cloudinary.com') return;
    const uploadMarker = '/upload/';
    const uploadIndex = url.pathname.indexOf(uploadMarker);
    if (uploadIndex < 0) return;
    const assetPath = url.pathname.slice(uploadIndex + uploadMarker.length);
    const withoutVersion = assetPath.replace(/^v\d+\//, '');
    const publicId = withoutVersion.replace(/\.[a-z0-9]+$/i, '');
    if (publicId) await cloudinary.uploader.destroy(publicId);
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
