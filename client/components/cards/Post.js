import { Avatar } from "antd";
import moment from "moment";
import renderHTML from "react-render-html";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentCount
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
          {post && post.author && (<div key={post._id} className="card mb-5">
            <div className="card-header">
              <Avatar size={40}>{post.author.name[0]}</Avatar>{" "}
              <span className="pt-2 ml-3" style={{ marginLeft: "0.5rem" }}>
                {post.author.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex pt-2">
                {state &&
                state.user &&
                post.likes &&
                post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                )}

                <div className="pt-2 px-2" style={{ marginRight: "1rem" }}>
                  {" "}
                  {post.likes.length} likes
                </div>
                <CommentOutlined
                  onClick={() => handleComment(post)}
                  className="text-danger pt-2 h5 pl-5"
                />
                <div className="pt-2 px-2">
                  <Link href={`/post/${post._id}`}>
                    <a>{post.comments.length} comments</a>
                  </Link>
                </div>

                {state && state.user && state.user._id == post.author._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-danger pt-2 h5 px-2 mx-auto"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger pt-2 h5 px-2"
                    />
                  </>
                )}
              </div>
            </div>
            {post.comments && post.comments.length > 0 && (
              <ol className="list-group">
                {post.comments.slice(0, 3).map((comment) => (
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar size={30} className="mb-1 mr-3">{post.author.name[0]}</Avatar>{" "}
                      {post.author.name}
                      </div>
                      <div>{comment.text}</div>
                    </div>
                    <span className="badge rounded-pill text-muted">{moment(comment.created).fromNow()}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>)}
    </>
  );
};

export default Post;
