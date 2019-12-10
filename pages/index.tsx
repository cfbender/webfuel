import React from "react";
import Layout from "../components/Layout";
import { Lottie } from "@crello/react-lottie";
import coffee from "../public/assets/coffee-outline.json";
import { useFetchUser } from "../lib/user";

const Index = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <div className="container">
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
            height={"400px"}
            width={"400px"}
            playingState={"playing"}
          />
        </div>
      </div>
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0 auto;
          height: 100%;
        }
        .logo {
          background-color: #19262f;
          border-radius: 25px;
        }
        .container {
          display: flex;
          align-items: center;
          padding: 150px;
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
      `}</style>
    </Layout>
  );
};

export default Index;
