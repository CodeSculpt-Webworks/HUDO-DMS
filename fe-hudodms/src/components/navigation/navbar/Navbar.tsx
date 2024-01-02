import "./Navbar.css";

import { HudoLogo } from "../../../assets";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <a className="logo-container" href="http://192.168.1.16:5173/">
        <img src={HudoLogo} alt="hudo-logo" />
        <p>Housing & Urban Poor Development Office {"(DMS)"}</p>
      </a>
      <div className="tabs-container">
        {/* <ul>
          <li>
            <a href="Home">Home</a>
          </li>
          <li>
            <a href="About">About</a>
          </li>
          <li>
            <a href="Contact">Contact</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
};
