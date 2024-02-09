import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import Image from "next/image"


const Navbar = () => {
    return <>
    <nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">
      <Image src="/logo.png" alt="Logo" width="40" height="24" className="d-inline-block align-text-top"/>
      Bootstrap
    </Link>
 

        </div>
</nav>
</>
}

export default Navbar