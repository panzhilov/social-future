import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from 'antd';
import Link from 'next/link';
Modal
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [ok, setOk] = useState(false);
  console.log(ok);
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3030/api/register", {
        name,
        email,
        password,
        repeatPassword,
      });
      setOk(true)
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container-fluid">
      <div className="info-box row py-5 text-light">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Your name</label>
              </small>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Email</label>
              </small>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Password</label>
              </small>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Repeat Password</label>
              </small>
              <input
                alue={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                className="form-control"
                placeholder="Repeat your password"
              />
            </div>

            <div className="form-group p-2">
              <button className="btn btn-primary ">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Modal
          title="Congratulations!"
          visible={ok}
          onCancel={() => setOk(false)}
          footer={null}
          >
            <p>You have succsefully registred.</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Register;
