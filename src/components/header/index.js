import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Home,
  HomeActive,
  Logo,
  Search,
} from "../../svg";
import { useSelector } from "react-redux";
import { AiOutlineMessage } from "react-icons/ai";
import SearchMenu from "./SearchMenu";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
export default function Header({
  page,
  getAllPosts,
  opensearchbar,
  setopenthesearchbar,
}) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const usermenu = useRef(null);

  useEffect(() => {
    setShowSearchMenu(opensearchbar);
  }, [opensearchbar]);

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
    setopenthesearchbar(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Social Icon"
            className="hide_input"
          />
        </div>
      </div>
      {(showSearchMenu || opensearchbar) && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user.token}
        />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>

        <Link to="/chat" className="circle_icon hover1">
          <AiOutlineMessage size={25}></AiOutlineMessage>
        </Link>

        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={usermenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
