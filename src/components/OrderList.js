import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <div className="h-1/2 p-4 flex flex-col justify-center lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
          Your Orders are empty, please buy some Products
        </div>
      ) : (
        <div className="p-4 lg:px-20 xl:px-40">
          <table className="w-full border-separate border-spacing-3">
            <thead>
              <tr className="text-left">
                <th className="hidden md:block">Order ID</th>
                <th>Date</th>
                <th>Price</th>
                <th className="hidden md:block">Products</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr
                  className={`${item.status !== "delivered" && "bg-red-50"}`}
                  key={item._id}
                >
                  <td className="hidden md:block py-6 px-1">{item._id}</td>
                  <td className="py-6 px-1">
                    {item.createdAt.toString().slice(0, 10)}
                  </td>
                  <td className="py-6 px-1">{item.finalPayment}</td>
                  <td className="hidden md:block py-6 px-1">
                    {item.allProducts.map((product, index) => (
                      <span key={index}>
                        {product.title}{" "}
                        {index < item.allProducts.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className="py-6 px-1">{item.status}</td>
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
