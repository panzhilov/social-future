import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = e =>{
    e.preventDefault();

    console.log(1);
  }

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
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group p-2">
              <small>
                <label className="text-muted">Repeat Password</label>
              </small>
              <input
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                type="password"
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
    </div>
  );
};

export default Register;
