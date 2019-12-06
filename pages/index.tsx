import React from "react";
import Layout from "../components/Layout";

import { useFetchUser } from "../lib/user";

const Index = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <div>Welcome to Webfuel! Click Challenges to get started</div>
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
