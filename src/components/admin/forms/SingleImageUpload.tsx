'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface SingleImageUploadProps {
  image: File | null;
  onImageChange: (image: File | null) => void;
  existingImageUrl?: string;
}

export default function SingleImageUpload({ 
  image, 
  onImageChange,
  existingImageUrl 
}: SingleImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showExistingImage, setShowExistingImage] = useState(!!existingImageUrl);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setShowExistingImage(false); // Hide existing image when new one is uploaded
    
    // Set the image file
    onImageChange(file);
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    maxFiles: 1
  });

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setShowExistingImage(false); // Also hide existing image when removing
    onImageChange(null);
  };

  const removeExistingImage = () => {
    setShowExistingImage(false);
    onImageChange(null);
    // You might want to send a signal to delete the existing image from server
  };

  return (
    <div className="space-y-4">
      {/* Dropzone - Show when no image is selected and no existing image is shown */}
      {!previewUrl && !showExistingImage && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary hover:bg-primary/5'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-3">
            <Upload className="h-12 w-12 text-textLight" />
            <div>
              <p className="text-lg font-medium text-headingLight text-style">
                {isDragActive ? 'Drop image here' : 'Upload project image'}
              </p>
              <p className="text-textLight text-sm mt-1 text-style">
                Drag & drop an image here or click to browse
              </p>
              <p className="text-textLight text-xs mt-2 text-style">
                Supports JPEG, PNG, WebP, GIF • Max 5MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* New Image Preview */}
      {previewUrl && (
        <div className="relative">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={previewUrl}
                  alt="Project preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-headingLight text-style">
                  New Project Image
                </p>
                <p className="text-textLight text-sm text-style">
                  {image?.name || 'Image ready for upload'}
                </p>
                <p className="text-textLight text-xs mt-1 text-style">
                  Image will be uploaded when you save the project
                </p>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="p-2 text-textLight hover:text-redType transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Image */}
      {showExistingImage && existingImageUrl && (
        <div className="border border-border rounded-lg p-4">
          <p className="text-sm font-medium text-headingLight mb-2 text-style">
            Current Project Image
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={existingImageUrl}
                alt="Current project"
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-textLight text-sm text-style">
                This is your current project image
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  type="button"
                  onClick={removeExistingImage}
                  className="px-3 py-1 text-xs bg-redType text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove Image
                </button>
                <div
                  {...getRootProps()}
                  className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  <input {...getInputProps()} />
                  Replace Image
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}