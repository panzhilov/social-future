import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { UserContext } from '../../../context/index';

import AuthForm from "../../../components/forms/AuthForm";
import { useRouter } from "next/router";


const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
if(state && state.user) {
  setUsername(state.user.username)
  setAbout(state.user.about)
  setName(state.user.name)
  setEmail(state.user.email)
}
  },[state && state.user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const {data} = await axios.put(`/profile-update`,
        {
          username,
          about,
          name,
          email,
        }
      );
     
      if(data.error) {
        toast.error(data.error)
        setLoading(false)
      }else{
        let auth = JSON.parse(localStorage.getItem('user'));
        auth.user = data;
        localStorage.setItem('user', JSON.stringify(auth));
        setState({...state, user: data})

        setOk(true)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container-fluid">
      <div className="info-box row py-5 text-light">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
          ProfileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            loading={loading}
          />
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
            <p>You have succsefully updated your profile.</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
