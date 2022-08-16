import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Navigation = () => {
  const [state, setState] = useContext(UserContext);
  const[currentLink, setCurrentLink] = useState("")

  useEffect(() => {
    process.browser && setCurrentLink(location.pathname)
  }, [process.browser && location.pathname])

  console.log(currentLink);
  

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="nav d-flex justify-content-between">
      <Link href="/">
        <a className="nav-link text-light logo">SOCIAL FUTURE</a>
      </Link>

      {state !== null ? (
        <>
          <Link href="/user/dashboard">
            <a className={`nav-link text-light ${currentLink == '/user/dashboard' && 'active'}`}>{state.user.name}</a>
          </Link>

          <a onClick={logout} className="nav-link text-light">
            Logout
          </a>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className={`nav-link text-light ${currentLink == '/login' && 'active'}`}>Login</a>
          </Link>

          <Link href="/register">
            <a className={`nav-link text-light ${currentLink == '/register' && 'active'}`}>Register</a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
