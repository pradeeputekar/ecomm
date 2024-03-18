import Link from "next/link";

function NotFound() {
  return (
    <div>
      <h1>Not found – 404!</h1>
      <div>
        <Link href="/">click here to Go back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
