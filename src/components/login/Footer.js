import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to="/">English(UK)</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/">Français(FR)</Link>
        <Link to="/">Español (España)</Link>
        <Link to="/">italiano</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Chat</Link>
        <Link to="/">Social Icon Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Places</Link>
        <Link to="/">Games</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Garvit Bhatia © 2023
        </Link>
      </div>
    </footer>
  );
}
