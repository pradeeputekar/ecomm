"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaFileUpload } from "react-icons/fa";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock_qty: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const item = e.target.files[0];
    setImage(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.stock_qty ||
      !image
    ) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock_qty", product.stock_qty);
    formData.append("image", image);

    try {
      await axios.post("/api/products", formData);
      toast.success("Product Added Successfully");
      setProduct({ title: "", description: "", price: "", stock_qty: "" });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">Add New Product :</h1>

      <div className="w-full flex flex-col gap-2 ">
        <label className="text-sm font-bold">Title</label>
        <input
          type="text"
          className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-sm font-bold">Description</label>
        <textarea
          rows={3}
          className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
          placeholder="Product Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full flex flex-col gap-2 ">
        <label className="text-sm font-bold">Price</label>
        <input
          className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
          type="number"
          placeholder="Product Price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full flex flex-col gap-2 ">
        <label className="text-sm font-bold">Stock Quantity</label>
        <input
          className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
          type="number"
          placeholder="Stock Qty"
          name="stock_qty"
          value={product.stock_qty}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <label
          className="text-sm font-semibold cursor-pointer flex gap-4 items-center"
          htmlFor="file"
        >
          <FaFileUpload size={30} />
          <span>
            {image === null ? "Upload Product Image" : "Image Uploaded"}
          </span>
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          name="Image"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
      >
        {loading ? "Processing..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;
