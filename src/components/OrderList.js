import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
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
    setLoadingDelete(true);
    try {
      await axios.delete("/api/orders/" + orderId);
      toast.success("Order deleted successfully");
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
      toast.error("failed to delete order");
    } finally {
      setLoadingDelete(false);
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
        <>
          <div className="p-2 m-2 text-center bg-yellow-400 text-blue-700 font-bold">
            Track your orders
          </div>
          <div className="p-2 overflow-x-auto">
            <table className="w-full border-separate">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="py-2">Order ID</th>
                  <th>Transaction ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Products</th>
                  <th>Payment Status</th>
                  <th>Delete Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? " bg-gray-300" : "bg-white"
                    } text-black text-center border-b border-gray-300`}
                    key={item._id}
                  >
                    <td className="py-2">{item._id}</td>
                    <td>
                      {item.status === "Not Paid" ? "NIL" : item.intent_id}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.createdAt.toString().slice(0, 10)}</td>
                    <td>₹{item.finalPayment}</td>
                    <td>
                      {item.allProducts.map((product, index) => (
                        <span key={index}>
                          {product.title}{" "}
                          {index < item.allProducts.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                    <td>
                      <button
                        disabled={item.status === "Paid"}
                        className={`${
                          item.status === "Paid"
                            ? "text-green-700"
                            : "text-blue-900"
                        }`}
                        onClick={() => {
                          handlePay(item._id);
                        }}
                      >
                        {item.status === "Paid" ? "Paid" : "Pay Now"}
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={loadingDelete}
                        className="text-red-700"
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
        </>
      )}
    </>
  );
};

export default OrderList;
