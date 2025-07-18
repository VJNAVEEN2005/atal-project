import React, { useState } from "react";
import {
  Package,
  User,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { showNotification, updateNotification } from "@mantine/notifications";
import api from "../../Api/api";

const UpdateStocks = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const location = useLocation();
  const { stockId, userId, userName } = location.state || {};
  const [formData, setFormData] = useState({
    stockId: stockId || "",
    countChanged: "",
    userId: userId || "",
    priceTheyBought: "",
    userName: userName || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.stockId || !formData.countChanged || !formData.userId) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    showNotification({
      id: "update-stock",
      loading: true,
      title: "Updating Stock",
      message: "Please wait while we update the stock...",
      autoClose: false,
    });

    try {
        console.log("Update Stock Response:", formData);
        
      const response = await axios.post(
        `${api.web}api/v1/update-stock`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      

      if (response.data.status === "success") {
        setMessage({ type: "success", text: "Stock updated successfully!" });
        setFormData({
          ...formData,
          stockId: "",
          userId: "",
        });
        updateNotification({
          id: "update-stock",
          title: "Stock Updated",
          message: "The stock has been updated successfully.",
          autoClose: 5000,
          color: "green",
          loading: false,
          icon: <CheckCircle className="w-4 h-4" />,
        });
      } else {
        setMessage({ type: "error", text: "Failed to update stock" });
        updateNotification({
          id: "update-stock",
          title: "Update Failed",
          message: "There was an error updating the stock.",
          autoClose: 5000,
          color: "red",
          loading: false,
          icon: <AlertCircle className="w-4 h-4" />,
        });
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      updateNotification({
        id: "update-stock",
        title: "Update Error",
        message: "An error occurred while updating the stock.",
        autoClose: 5000,
        color: "red",
        loading: false,
        icon: <AlertCircle className="w-4 h-4" />,
      });
      setMessage({
        type: "error",
        text: "An error occurred while updating stock",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Package className="h-8 w-8 mr-3" style={{ color: "#3f6197" }} />
            <h1 className="text-2xl font-bold text-gray-900">Update Stock</h1>
          </div>

          {/* Message Display */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          )}

          {/* Update Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock ID *
              </label>
              <input
                type="text"
                name="stockId"
                placeholder="Enter stock ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.stockId}
                onChange={handleInputChange}
                required
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Count Change *
              </label>
              <input
                type="number"
                name="countChanged"
                placeholder="Enter count change (+ or -)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.countChanged}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use positive numbers to add, negative to subtract
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Updated By *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter user ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price (Optional)
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  name="priceTheyBought"
                  placeholder="Enter purchase price"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.priceTheyBought}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 text-white font-medium rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: "#3f6197" }}
            >
              {loading ? "Updating..." : "Update Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStocks;
