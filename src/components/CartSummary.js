import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function CartSummary({ finalitems }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  let totalItem = 0;
  finalitems.forEach((item) => {
    totalItem += item.quantity;
  });

  let totalMRP = 0;
  finalitems.forEach((item) => {
    totalMRP += item.price * item.quantity;
  });

  let totalDiscount = (totalMRP * 0.1).toFixed(2);
  let finalPayment = (totalMRP - totalDiscount).toFixed();

  const handleCheckout = async () => {
    setLoading(true);
    if (!session) {
      toast.info("please login first to proceed");
      router.push("/login");
    } else {
      try {
        const response = await axios.post("/api/orders", {
          allProducts: finalitems,
          totalItem,
          totalMRP,
          totalDiscount,
          finalPayment,
          status: "Not Paid",
          userEmail: session?.user?.email,
          name: session?.user?.name,
          city: "---",
          country: "---",
          line1: "---",
          postal_code: "00000",
          state: "---",
        });
        if (response.data && response.data._id) {
          const orderId = response.data._id;
          router.push(`/pay/${orderId}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 xl:w-1/3 2xl:w-1/3 lg:px-15 xl:px-15">
      <div className="flex justify-between">
        <span className="">Subtotal ({totalItem} items)</span>
        <span className="">₹{totalMRP}</span>
      </div>
      <div className="flex justify-between">
        <span className="">Discount (10%)</span>
        <span className="">₹{totalDiscount}</span>
      </div>
      <div className="flex justify-between">
        <span className="">Delivery Cost</span>
        <span className="text-green-500">FREE!</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <span className="">TOTAL(INCL. VAT)</span>
        <span className="font-bold">₹{finalPayment}</span>
      </div>
      <button
        className={`bg-red-500 text-white p-3 rounded-md w-1/2 self-end ${
          finalPayment === "0" && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleCheckout}
        disabled={finalPayment === "0" || loading}
      >
        {loading ? "Processing" : "Buy Now"}
      </button>
    </div>
  );
}

export default CartSummary;
