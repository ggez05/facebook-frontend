import "./style.css";
import { Link } from "react-router-dom";
import { Friends } from "../../../svg";
import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <div className="heading">Your Profile</div>

      <Link to="/profile" className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>

      <Link to="/friends" className={`friendsleftbar hover1`}>
        <Friends color="white" />

        <span> Friends Tab</span>
      </Link>
      <Link to="/chat" className={`friendsleftbar hover1`}>
        <AiOutlineMessage size={35}></AiOutlineMessage>

        <span>Chat with your friends</span>
      </Link>

      <div className="shortcut">
        <div className="heading">Developer Links</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <a
          href="https://joyful-parfait-2aa7af.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="shortcut_item hover1"
        >
          <img src="../../images/download.png" alt="" />
          <span>Creator's Portfolio</span>
        </a>
      </div>
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        Social Icon - Garvit Bhatia © 2023
      </div>
    </div>
  );
}
