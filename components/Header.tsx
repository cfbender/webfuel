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
          </Link>
          <Link href="/learn" passHref>
            <a className="route-link ">Learn</a>
          </Link>

          {!loading &&
            (user ? (
              <a href="/api/user/logout" className="user-link route-link">
                Logout
              </a>
            ) : (
              <a href="/api/user/login" className=" route-link user-link">
                Login
              </a>
            ))}
        </div>
      </nav>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

          nav {
            padding: 0 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .route-link {
            color: #e4bd54;
            padding-left: 2rem;
          }
          .route-link:not(.user-link) {
            border-right: 1px solid #c94437;
            padding-right: 2rem;
          }
          .header {
            width: 100%;
            background-color: #19262f;
            margin: 0 auto;
          }
          .routes {
            display: flex;
            min-width: 200px;
            justify-content: space-between;
          }
          .logo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
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
            text-decoration: none;
          }
          .user-link {
            color: #5abdae;
          }

          @media only screen and (max-width: 600px) {
            .routes {
              flex-direction: column;
              margin: 1.5rem 1.5rem 1.5rem 0;
            }

            .route-link {
              border-right: none !important;
              margin: 0.5rem 0 0.5rem 0;
              padding-right: 0rem;
            }

            .logo-name {
              font-size: 22px;
            }
            nav {
              padding: 0 5%;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
