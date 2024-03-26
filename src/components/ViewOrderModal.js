import { useState } from "react";

const ViewOrderModal = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <button onClick={openModal} className="text-blue-700 font-bold">
        View
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-red-900 opacity-75"></div>
          <div className="relative w-full h-full mx-2 overflow-auto bg-white rounded-lg p-2">
            <div className="text-left text-red-500 font-extrabold">
              ShopCart
            </div>
            <div className="text-center text-blue-900 font-bold">Invoice</div>
            <div className="text-left">Order ID: {order._id}</div>
            <div className="text-left">
              Order Date: {order.createdAt.toString().slice(0, 10)}
            </div>
            <div className="text-left mt-2">Customer Name: {order.name}</div>
            <div className="text-left">
              Customer Address: {order.line1},
              {order.line2 === "null" ? "" : order.line2}
              {order.city},{order.state}, {order.country} - {order.postal_code}
            </div>
            <hr />
            <div className="text-left mt-2">Payment Status: {order.status}</div>
            <div className="text-left">
              Transaction ID:{" "}
              {order.status === "Not Paid" ? "NIL" : order.intent_id}
            </div>
            <div className="text-left">
              Payment Mode: {order.status === "Not Paid" ? "Not Paid" : "Card"}
            </div>
            <hr />
            <table className="w-full my-8">
              <thead className="font-bold">
                <tr>
                  <td className="w-8">Sr.</td>
                  <td className="min-w-20">Product Details</td>
                  <td className="min-w-16">Qty</td>
                  <td className="min-w-16">Price</td>
                  <td className="min-w-16">Total</td>
                </tr>
              </thead>
              <tbody>
                {order.allProducts.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="font-semibold">{item.title}</div>
                      <div>
                        {item.description.split(" ").slice(0, 20).join(" ")}
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="text-left m-2">
                <tr>
                  <th className="min-w-80">Total Quantity</th>
                  <td className="text-right">{order.totalItem}</td>
                </tr>
                <tr>
                  <th>Total MRP</th>
                  <td className="text-right">{order.totalMRP}</td>
                </tr>
                <tr>
                  <th>Discount (10%)</th>
                  <td className="text-right">{order.totalDiscount}</td>
                </tr>
                <tr>
                  <th>Delivery</th>
                  <td className="text-right">FREE</td>
                </tr>
                <tr>
                  <th>Total Amount (INCL All TAX)</th>
                  <td className="text-right">{order.finalPayment}</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={handlePrint}
              className="print:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded"
            >
              Print
            </button>
            <button
              onClick={closeModal}
              className="print:hidden bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrderModal;
