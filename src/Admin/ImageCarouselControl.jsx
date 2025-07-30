import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Image,
  Upload,
  Edit,
  Trash,
  X,
  Eye,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, index, onEdit, onDelete, onPreview }) => {
  return (
    <Draggable draggableId={image._id || `image-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`group flex flex-col bg-white p-4 rounded-lg shadow-md my-4 transition-all duration-200 ${
            snapshot.isDragging ? "shadow-lg scale-105 rotate-2" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="bg-[#3F6197] text-white p-2 rounded-full mr-3">
                <Image size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Order #{index + 1}
                </div>
                <div className="text-sm text-gray-500">Carousel Image</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onPreview(image)}
                className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
              >
                <Eye size={16} className="text-green-600" />
              </button>
              <button
                onClick={() => onEdit(image)}
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Edit size={16} className="text-blue-600" />
              </button>
              <button
                onClick={() => onDelete(image._id)}
                className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
              >
                <Trash size={16} className="text-red-600" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-md overflow-hidden">
            <img
              src={image.imageUrl || image.preview}
              alt={image.altText || image.title || "Carousel Image"}
              className="w-full h-48 object-cover"
            />
          </div>

          <div className="mt-3">
            <h3 className="font-medium text-gray-900 mb-1">
              {image.title || "Untitled Image"}
            </h3>
            {image.description && (
              <p className="text-sm text-gray-600">{image.description}</p>
            )}
          </div>

          {/* Drag indicator */}
          <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center text-gray-400">
              <ChevronUp size={12} />
              <div className="text-xs">Drag to reorder</div>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const ImageForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [imagePreview, setImagePreview] = useState(formData.preview || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: file,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">
        {formData._id ? "Edit Image" : "Add New Image"}
      </h3>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Upload
          </label>
          <div className="border-2 relative border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#3f6197] transition-colors">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview("");
                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                      preview: "",
                    }));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="py-4">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required={!formData._id && !imagePreview}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            placeholder="Enter image title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            rows="3"
            placeholder="Enter image description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text
          </label>
          <input
            type="text"
            name="altText"
            value={formData.altText}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            placeholder="Alt text for accessibility"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#3f6197] text-white rounded-md hover:bg-[#2c4b79] transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ImagePreviewModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">
            {image.title || "Image Preview"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <img
            src={image.imageUrl || image.preview}
            alt={image.altText || image.title}
            className="max-w-full max-h-[70vh] object-contain mx-auto"
          />
          {image.description && (
            <p className="mt-4 text-gray-600 text-center">
              {image.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ImageCarouselControl = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    altText: "",
    image: null,
    preview: "",
    _id: null,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/carousel-images`);

      // Check if response has the expected structure
      if (response.data.success && response.data.images) {
        // Sort images by order
        const sortedImages = response.data.images.sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
        setImages(sortedImages);
      } else {
        console.error("Unexpected response structure:", response.data);
        setMessage({
          text: "Failed to load images. Unexpected response format.",
          type: "error",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to load images. Please try again.",
        type: "error",
      });
      setLoading(false);
    }
  };

  const handleAddImage = () => {
    setFormData({
      title: "",
      description: "",
      altText: "",
      image: null,
      preview: "",
      _id: null,
    });
    setShowForm(true);
  };

  const handleEditImage = (image) => {
    setFormData({
      title: image.title || "",
      description: image.description || "",
      altText: image.altText || "",
      image: null,
      preview: image.imageUrl || "",
      _id: image._id,
    });
    setShowForm(true);
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        setIsSubmitting(true);
        const response = await axios.delete(
          `${api.web}api/v1/carousel-images/${id}`,{
            headers: { token: localStorage.getItem("token") }
          }
        );

        if (response.data.success) {
          fetchImages();
          setMessage({
            text: response.data.message || "Image deleted successfully!",
            type: "success",
          });
        } else {
          setMessage({
            text: response.data.message || "Failed to delete image.",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        setMessage({
          text:
            error.response?.data?.message ||
            "Failed to delete image. Please try again.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePreviewImage = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("altText", formData.altText);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      let response;
      if (formData._id) {
        // Update existing image
        response = await axios.put(
          `${api.web}api/v1/carousel-images/${formData._id}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data",
              token: localStorage.getItem("token")
             },
          }
        );
      } else {
        // Add new image
        response = await axios.post(
          `${api.web}api/v1/carousel-images`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data",
              token: localStorage.getItem("token") 
             },
          }
        );
      }

      if (response.data.success) {
        setMessage({
          text:
            response.data.message ||
            `Image ${formData._id ? "updated" : "added"} successfully!`,
          type: "success",
        });
        setShowForm(false);
        fetchImages();
      } else {
        setMessage({
          text: response.data.message || "Failed to save image.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error saving image:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to save image. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Create a copy of the images array
    const items = Array.from(images);

    // Remove the dragged item from its position
    const [reorderedItem] = items.splice(source.index, 1);

    // Insert the item at the new position
    items.splice(destination.index, 0, reorderedItem);

    // Update order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    // Update the state immediately for better UX
    setImages(updatedItems);

    try {
      // Send the updated order to the server
      const response = await axios.post(
        `${api.web}api/v1/carousel-images/reorder`,
        {
          images: updatedItems.map((item) => ({
            _id: item._id,
            order: item.order,
          })),
        },{
          headers:{
            token: localStorage.getItem("token")
          }
        }
      );

      if (response.data.success) {
        setMessage({
          text: response.data.message || "Image order updated successfully!",
          type: "success",
        });
      } else {
        setMessage({
          text: response.data.message || "Failed to update image order.",
          type: "error",
        });
        // Revert to previous state if API call fails
        fetchImages();
      }
    } catch (error) {
      console.error("Error updating image order:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to update image order. Please try again.",
        type: "error",
      });
      // Revert to previous state if API call fails
      fetchImages();
    }
  };

  // Auto-hide success messages after 3 seconds
  useEffect(() => {
    if (message.text && message.type === "success") {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin")}
              className=" left-6 top-6 flex items-center gap-2 px-3 py-2 text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Image Carousel Management
              </h1>
              <p className="text-blue-100">
                Upload and organize images for your carousel display
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm">
              <span className="font-medium">{images.length}</span> Images
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <span className="mr-2">
              {message.type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#3f6197]">
            Carousel Images
          </h2>
          <button
            onClick={handleAddImage}
            className="px-6 py-3 bg-[#3f6197] hover:bg-[#2c4b79] text-white rounded-lg transition-colors flex items-center"
          >
            <Upload className="h-5 w-5 mr-2" />
            Add Image
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <Image size={48} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No images in carousel
            </h3>
            <p className="text-gray-500">
              Upload your first image to start building your carousel.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-yellow-800 text-sm font-medium">
                  Drag and drop images to reorder them in the carousel
                </span>
              </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="image-carousel" type="image-item">
                {(provided) => (
                  <div
                    className="space-y-2 "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {images.map((image, index) => (
                      <ImageCard
                        key={image._id || `image-${index}`}
                        image={image}
                        index={index}
                        onEdit={handleEditImage}
                        onDelete={handleDeleteImage}
                        onPreview={handlePreviewImage}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={fetchImages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Image Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <ImageForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmitForm}
              onCancel={() => setShowForm(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && previewImage && (
        <ImagePreviewModal
          image={previewImage}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default ImageCarouselControl;
