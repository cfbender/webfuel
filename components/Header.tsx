import React, { useState } from "react";

import Link from "next/link";
import { Lottie } from "@crello/react-lottie";
import coffee from "../public/assets/coffee-outline.json";

type Props = {
  user: any;
  loading: boolean;
};

const Header: React.FunctionComponent<Props> = ({ user, loading }) => {
  const [playing, setPlaying]: ["playing" | "stopped", any] = useState(
    "stopped"
  );
  return (
    <header className="header">
      <nav>
        <Link href="/">
          <div
            className="logo"
            onMouseEnter={() => void setPlaying("playing")}
            onMouseLeave={() => void setPlaying("stopped")}
          >
            <Lottie
              config={{
                animationData: coffee,
                autoplay: true,
                loop: true
              }}
              height={"80px"}
              width={"80px"}
              playingState={playing}
            />
            <h1 className="logo-name">WebFuel</h1>
          </div>
        </Link>

        <div className="routes">
          <Link href="/challenges" passHref>
            <a className="route-link">Challenges</a>
          </Link>{" "}
          |
          <Link href="/learn" passHref>
            <a className="route-link">Learn</a>
          </Link>
        </div>
        <div className="user">
          {!loading &&
            (user ? (
              <div className="links">
                <a href="/api/user/logout">Logout</a>
              </div>
            ) : (
              <a href="/api/user/login">Login</a>
            ))}
        </div>
      </nav>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .route-link {
            color: #e4bd54;
          }
          .header {
            background-color: #19262f;
            padding: 25px;
            margin: 0 auto;
          }
          .routes {
            display: flex;
            min-width: 200px;
            justify-content: space-between;
            color: #c94437;
          }
          .logo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .logo-name {
            color: #e4bd54;
            font-family: "Montserrat", sans-serif;
            font-size: 32px;
            margin: 0;
            margin-left: 10px;
          }

          .cls-1 {
            fill: #e4bd54;
            stroke: #e4bd54;
            stroke-miterlimit: 10;
            stroke-width: 3px;
            max-width: 25px;
          }

          a {
            color: #5abdae;
            text-decoration: none;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
