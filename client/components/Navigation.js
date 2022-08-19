import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Navigation = () => {
  const [state, setState] = useContext(UserContext);
  const [currentLink, setCurrentLink] = useState("");

  useEffect(() => {
    process.browser && setCurrentLink(location.pathname);
  }, [process.browser && location.pathname]);

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
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              style={{color:"#fff", textShadow: "1px 1px #1d3557"}}
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state.user.name}
            </a>

            <ul className="dropdown-menu">
              <li>
                <Link href="/user/dashboard">
                  <a
                    className={`nav-link dropdown-item${
                      currentLink == "/user/dashboard" && "active"
                    }`}
                    style={{color:"#e63946"}}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/user/profile/update">
                  <a
                    className={`nav-link dropdown-item${
                      currentLink == "/user/profile/update" && "active"
                    }`}
                    style={{color:"#e63946"}}
                  >
                    Profile
                  </a>
                </Link>
              </li>

              <li>
                <a onClick={logout} className="nav-link"
                style={{color:"#e63946"}}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light ${
                currentLink == "/login" && "active"
              }`}
            >
              Login
            </a>
          </Link>

          <Link href="/register">
            <a
              className={`nav-link text-light ${
                currentLink == "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
