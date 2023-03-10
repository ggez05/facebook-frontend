import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";
import "./style.css";
export default function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  const [opensearchbar, setopenthesearchbar] = useState(false);
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header
        page="home"
        getAllPosts={getAllPosts}
        opensearchbar={opensearchbar}
        setopenthesearchbar={setopenthesearchbar}
      />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        {/* <Stories /> */}
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
        {posts?.length === 0 ? (
          <div
            className="nopostaddfriend"
            onClick={() => setopenthesearchbar(true)}
          >
            <h3>
              {" "}
              No Posts to display! <span>Find friends...</span>
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
