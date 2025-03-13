import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const CloudinaryUpload = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const cld = new Cloudinary({ cloud: { cloudName: "dnez6l71o" } });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hrms_preset");
      formData.append("cloud_name", "dnez6l71o");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dnez6l71o/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Upload failed");
        }

        const data = await response.json();
        setSelectedImage(data.public_id);
        setImageUrl(data.secure_url);

        // Call the callback function with the image URL
        if (onImageUpload) {
          onImageUpload(data.secure_url);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {isUploading && (
          <div className="text-sm text-blue-600">Uploading...</div>
        )}

        {error && <div className="text-sm text-red-600">Error: {error}</div>}

        {selectedImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <AdvancedImage
              cldImg={cld
                .image(selectedImage)
                .resize(fill().width(300).height(200))}
              className="rounded-lg shadow-md"
            />
            {imageUrl && (
              <p className="text-sm text-gray-500 mt-2 break-all">
                Image URL: {imageUrl}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudinaryUpload;
