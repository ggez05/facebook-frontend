import { Feeling, LiveVideo, Photo } from "../../svg";
import UserMenu from "../header/userMenu";
import "./style.css";
export default function CreatePost({ user, setVisible, profile }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div
          className="open_post hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          Create a Post, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createpost-bodytext">
        Create Your Own Post.
        <span>Your Post will be shared with your friends only.</span>
      </div>
    </div>
  );
}
