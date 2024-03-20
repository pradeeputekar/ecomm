import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const handlePay = (orderId) => {
    router.push(`/pay/${orderId}`);
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete("/api/orders/" + orderId);
      toast.success("Order deleted successfully");
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
      toast.error("failed to delete order");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <div className="h-1/2 p-4 flex flex-col justify-center lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
          Your Orders are empty, please buy some Products
        </div>
      ) : (
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr className="text-left">
                <th className="min-w-max">Order ID</th>
                <th className="min-w-max">Transaction ID</th>
                <th className="min-w-max">Customer Name</th>
                <th className="min-w-max">Order Date</th>
                <th className="min-w-max">Total Amount</th>
                <th className="min-w-max">Products</th>
                <th className="min-w-max">Status</th>
                <th className="min-w-max">Payment</th>
                <th className="min-w-max">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr
                  className={`${
                    item.status === "Paid" && "bg-green-200"
                  } text-left`}
                  key={item._id}
                >
                  <td className="py-6 px-1">{item._id}</td>
                  <td className="py-6 px-1">
                    {item.status === "Not Paid" ? "NIL" : item.intent_id}
                  </td>
                  <td className="py-6 px-1">{item.name}</td>
                  <td className="py-6 px-1">
                    {item.createdAt.toString().slice(0, 10)}
                  </td>
                  <td className="py-6 px-1">₹{item.finalPayment}</td>
                  <td className="py-6 px-1">
                    {item.allProducts.map((product, index) => (
                      <span key={index}>
                        {product.title}{" "}
                        {index < item.allProducts.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className="py-6 px-1">{item.status}</td>
                  <td className="py-6 px-1">
                    <button
                      disabled={item.status === "Paid"}
                      className={`p-2 ${
                        item.status === "Paid"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600"
                      } text-white rounded-xl`}
                      onClick={() => {
                        handlePay(item._id);
                      }}
                    >
                      Re-Pay
                    </button>
                  </td>
                  <td className="py-6 px-1">
                    <button
                      className="p-2 bg-red-500 text-white rounded-xl"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
