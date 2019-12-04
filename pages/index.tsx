import React from "react";
import Layout from "../components/Layout";
import Challenge from "../components/Challenge";
const Index = () => {
  return (
    <Layout>
      <Challenge />
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0 auto;
          height: 100%;
        }
        p {
          padding: 50px;
        }

        .container {
          display: flex;
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
