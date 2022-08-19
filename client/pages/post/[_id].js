import { RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import UserRoute from "../../components/routes/userRoute";

const PostComments = () => {
  const [post, setPosts] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) {
      fetchPost();
    }
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="info-box row py-5 text-light">
          <div className="col text-center">
            <h1>Social Furutre</h1>
          </div>
        </div>
       <div className="container col-md-8 offset-md-2 pt-5">
        <Post post={post} />
       </div>

       <Link href="/user/dashboard">
        <a className="d-flex justify-content-center p-5"><RollbackOutlined /></a>
       </Link>
      </div>
    </>
  );
};

export default PostComments;
