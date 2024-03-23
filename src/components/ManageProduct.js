import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

const ManageProduct = ({ products, fetchData }) => {
  const handleDelete = async (e) => {
    try {
      await axios.delete("/api/products/" + e);
      toast.success("Product deleted successfully");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("failed to delete product");
    }
  };

  const UpdateProductModal = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(product);

    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    const handleUpdate = async (e) => {
      if (
        !selectedProduct.product ||
        !selectedProduct.description ||
        !selectedProduct.price ||
        !selectedProduct.stock_qty
      ) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("title", selectedProduct.title);
      formData.append("description", selectedProduct.description);
      formData.append("price", selectedProduct.price);
      formData.append("stock_qty", selectedProduct.stock_qty);
      try {
        await axios.put(`/api/products/${e}`, formData);
        closeModal();
        toast.success("Product updated successfully");
        fetchData();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update product");
      }
    };

    return (
      <>
        <button className="text-green-700" onClick={openModal}>
          Update Details
        </button>
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-red-900 mb-4">Update Product Details</h2>
            <label className="text-blue-500" htmlFor="title">
              Title :
            </label>
            <input
              type="text"
              name="title"
              value={selectedProduct.title}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  title: e.target.value,
                })
              }
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Product Name"
            />
            <label className="text-blue-500" htmlFor="description">
              Description :
            </label>
            <input
              type="text"
              name="description"
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Product Description"
            />
            <label className="text-blue-500" htmlFor="price">
              Price :
            </label>
            <input
              name="price"
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Product Price"
            />
            <label className="text-blue-500" htmlFor="stockQty">
              Stock Qty :
            </label>
            <input
              name="stockQty"
              type="number"
              value={selectedProduct.stock_qty}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  stock_qty: e.target.value,
                })
              }
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Stock Qty"
            />
            <button
              onClick={() => handleUpdate(selectedProduct._id)}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </>
    );
  };

  const UpdateImageModal = ({ product }) => {
    const [image, setImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    const handleImageUpload = (e) => {
      const item = e.target.files[0];
      if (!item) {
        return;
      }
      setImage(item);
    };

    const handleImageUpdate = async (e) => {
      if (!image) {
        toast.error("please upload image");
        return;
      }
      const formData = new FormData();
      formData.append("public_id", product.public_id);
      formData.append("image", image);

      try {
        await axios.put(`/api/imageproduct/${e}`, formData);
        setImage(null);
        closeModal();
        toast.success("Image Updated Successfully");
        fetchData();
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Image Update failed");
      }
    };

    return (
      <>
        <button className="text-green-700" onClick={openModal}>
          Update Image
        </button>
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          <div className="p-4 flex flex-col gap-4">
            <label htmlFor="file" className="mb-2 font-bold">
              Update Product Image
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              name="Image"
              onChange={handleImageUpload}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleImageUpdate(product._id)}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div className="py-2 my-2 text-center bg-orange-400 text-red-700 font-bold">
        Update & Delete Product
      </div>
      <div className="p-2 overflow-x-auto">
        <table className="w-full border-separate">
          <thead>
            <tr className="bg-red-900 text-white">
              <th className="py-2">Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Qty</th>
              <th>Update Details</th>
              <th>Update Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-300" : "bg-white"
                } text-center text-black border-b border-gray-300`}
                key={product._id}
              >
                <td className="py-2">{product.title}</td>
                <td className="w-40 max-w-40 overflow-hidden line-clamp-1">
                  {product.description}
                </td>
                <td>{product.price}</td>
                <td>{product.stock_qty}</td>
                <td>
                  <UpdateProductModal product={product} />
                </td>
                <td>
                  <UpdateImageModal product={product} />
                </td>
                <td>
                  <button
                    className="text-red-700"
                    onClick={() => handleDelete(product.public_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageProduct;
