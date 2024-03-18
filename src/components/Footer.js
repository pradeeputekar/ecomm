import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-8 md:h-8 p-4 bg-black text-red-500 flex items-center justify-between">
      <Link href="/" className="font-bold text-md">
        ShopCart
      </Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default Footer;
