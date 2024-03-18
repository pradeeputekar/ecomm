"use client";
import CartItems from "@/components/CartItems";
import { useSelector } from "react-redux";
import CartSummary from "@/components/CartSummary";

const Cart = () => {
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);

  const finalItems = items
    .filter((item) => {
      return bagItems.some((bagItem) => bagItem.productId === item._id);
    })
    .map((item) => {
      const bagItem = bagItems.find(
        (bagItem) => bagItem.productId === item._id
      );

      return { ...item, quantity: bagItem.quantity };
    });

  return (
    <>
      <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row">
        {finalItems.length === 0 ? (
          <div className="h-1/2 p-4 flex flex-col justify-center lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40  text-red-500">
            Your Cart is empty, please add some items
          </div>
        ) : (
          <div className="h-1/2 p-4 flex flex-col justify-start overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-4 xl:px-4">
            {finalItems.map((item) => (
              <CartItems key={item._id} item={item} />
            ))}
          </div>
        )}

        <CartSummary finalitems={finalItems} />
      </div>
    </>
  );
};

export default Cart;
