import React from "react";
import Layout from "../components/Layout";
import { Lottie } from "@crello/react-lottie";
import coffee from "../public/assets/coffee-outline.json";
import { useFetchUser } from "../lib/user";

const Index = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <div className="hero-container">
        <div className="primer">
          <h3>
            Welcome to WebFuel! The free and open-source online holistic web
            development learning platform.
          </h3>

          <p>
            This is a site where you can learn about and challenge yourself of
            numerous topics related to web development. Read blog posts and
            other learning resources under Learn, or dive right in and start
            writing some code with one of our Challenges!
          </p>
        </div>
        <div className="logo">
          <Lottie
            config={{
              animationData: coffee,
              autoplay: true,
              loop: true
            }}
            playingState={"playing"}
          />
        </div>
      </div>
      <style jsx>{`
        .logo {
          background-color: #19262f;
          border-radius: 25px;
          min-width: 400px;
        }
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          background-color: #19262f;
          color: #eee;
        }
        .primer {
          padding: 50px;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
        #editor {
          margin: 20px;
        }
        .editor {
          display: flex;
          flex-direction: column;
        }
        @media only screen and (max-width: 600px) {
          .container {
            flex-direction: column;
          }
          .logo {
            min-width: 100px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Index;
