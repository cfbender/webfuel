import React from "react";
import Head from "next/head";
import Header from "./Header";

type Props = {
  user: any;
  loading: boolean;
  children?: JSX.Element[];
};

const Layout: React.FunctionComponent<Props> = ({
  user,
  loading = false,
  children
}) => {
  return (
    <div id="layout">
      <Head>
        <title>WebFuel</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="The free and open-source online holistic web development learning platform."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/site.webmanifest" />
      </Head>

      <div className="content">
        <Header user={user} loading={loading} />
        {children}
      </div>
      <footer>
        <svg
          id="Artwork"
          className="h-8 fill-current inline"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 154.87 153.27"
          width="25px"
        >
          <title>crossed-keys-bold</title>
          <text x="-282.53" y="-211.04"></text>
          <path
            className="cls-1"
            d="M398,279.86a22.18,22.18,0,1,0,18.52-37.66,22.19,22.19,0,1,0-28.72,23.94l-27,27-27.46-27.46a22.18,22.18,0,1,0-30-23.51A22.19,22.19,0,1,0,327,271.76l27.6,27.6-46.83,46.83a2.59,2.59,0,0,0,0,3.66l2.52,2.52a2.59,2.59,0,0,0,3.66,0l46.83-46.83,31.56,31.56-12,12a2.5,2.5,0,0,0,3.54,3.54l3.71-3.71,5.94,5.94-3.71,3.71a2.5,2.5,0,1,0,3.54,3.54l12-12-11-11,13.21,13.21a2.59,2.59,0,0,0,3.66,0l2.52-2.52a2.59,2.59,0,0,0,0-3.66L367,299.35l26.4-26.4A21.93,21.93,0,0,0,398,279.86Zm-74.51-18.5a0.48,0.48,0,0,0-.54.56,16.63,16.63,0,0,1-28.67,13.68,16.79,16.79,0,0,1,.49-23.09,16.58,16.58,0,0,1,13.57-4.71,0.46,0.46,0,0,0,.51-0.53,16.6,16.6,0,0,1,4.49-14,16.63,16.63,0,1,1,23.73,23.32A16.58,16.58,0,0,1,323.53,261.36Zm59.16-4.43A16.63,16.63,0,1,1,411,247a0.46,0.46,0,0,0,.53.51,16.6,16.6,0,0,1,14,4.49,16.63,16.63,0,1,1-23.32,23.73,16.58,16.58,0,0,1-4.75-13.58,0.48,0.48,0,0,0-.56-0.54A16.6,16.6,0,0,1,382.69,256.93Z"
            transform="translate(-282.53 -211.04)"
          ></path>
          <path
            className="cls-1"
            d="M329.24,337.09l-13,13,12,12a2.5,2.5,0,1,0,3.54-3.54L328,354.83l5.94-5.94,3.71,3.71a2.5,2.5,0,1,0,3.54-3.54Z"
            transform="translate(-282.53 -211.04)"
          ></path>
        </svg>
        <span className="footer-text">
          Created and maintained by <a href="https://cfbender.dev">cfbender</a>
        </span>
      </footer>

      <style jsx>
        {`
          #layout {
            margin: 0 auto;
            display: flex;
            height: 100%;
            flex-direction: column;
          }
          .content {
            flex: 1 0 auto;
          }
          .cls-1 {
            fill: #e4bd54;
            stroke: #e4bd54;
            stroke-miterlimit: 10;
            stroke-width: 3px;
            max-width: 25px;
          }

          footer {
            background-color: #19262f;
            padding: 15px;
            flex-shrink: 0;
            align-items: center;
          }

          .footer-text {
            color: #c94437;
            margin-left: 10px;
          }

          a {
            color: #5abdae;
            text-decoration: none;
          }
        `}
      </style>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
        body {
          font-family: "Montserrat", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Layout;
