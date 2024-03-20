"use client";
import FetchProducts from "@/components/FetchProducts";
import Notification from "@/components/Notification";

const Home = () => {
  return (
    <>
      <Notification />
      <FetchProducts />
    </>
  );
};

export default Home;
