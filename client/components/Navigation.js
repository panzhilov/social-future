import Link  from "next/link";

const Navigation = () => {
  return (
    <nav className="nav d-flex justify-content-center">    
      
        <Link href="/">
           <a className="nav-link text-light">Home</a>
        </Link>
 
        <Link href="/login">
           <a className="nav-link text-light">Login</a>
        </Link>
     
        <Link href="/register">
           <a className="nav-link text-light">Register</a>
        </Link>
  
    </nav>
  );
  console.log('dsada');dsada
};

export default Navigation;
