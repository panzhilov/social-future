import { useContext, useState } from "react";
import UserRoute from "../../components/routes/userRoute";
import { UserContext } from "../../context";
import CreatePostForm from "../../components/forms/CreatePostForm.js";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import SkeletonImage from "antd/lib/skeleton/Image";

const Home = () => {
  const [state, setState] = useContext(UserContext);
  const [image, setImage] = useState({})
  const[uploading, setUploading] = useState(false);


  const [content, setContent] = useState("");

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/create-post", { content, image });
      console.log("create-post ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post created");
        setContent("");
        setImage({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log('uploaded image =>', data);
      setImage({
        url: data.url,
        public_id: data.public_id
      })
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="info-box row py-5 text-light">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              onSubmit={onSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
          <div className="col-md-4">Sidebar</div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
