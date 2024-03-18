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
  });
  const [image, setImage] = useState();

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
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", image);

    try {
      await axios.post("/api/products", formData);
      toast.success("Product Added Successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("failed to add product");
    }
  };

  return (
    <div className="p-4 mt-6 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <h1 className="text-2xl my-2 text-gray-300 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <FaFileUpload size={30} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            name="Image"
            required
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
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
          <label className="text-sm">Description</label>
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
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="Product Price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
