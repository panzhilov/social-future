import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";

import AuthForm from "../components/forms/AuthForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [state, setState] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
        email,
        password,
      });
      setLoading(false);
      // console.log(result.data);

      //update context
      setState({
        user: result.data.user,
        token: result.data.token,
      });

      //save in local storage
      localStorage.setItem('user', JSON.stringify(result.data));

      // useRouter().push('/')
    } catch (err) {
      setLoading(false);
      toast.error(err.response);
    }
  };

  return (
    <div className="container-fluid">
      <div className="info-box row py-5 text-light">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Don`t have register?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
