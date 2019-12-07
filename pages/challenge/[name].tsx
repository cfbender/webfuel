import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/user";
import Challenge from "../../components/Challenge";
import challengeList from "../../public/assets/challenges.json";

const challenges = () => {
  const router = useRouter();
  const { name } = router.query;
  const challengeData = challengeList.filter(item => item.name === name)[0];
  if (!challengeData) {
    return <div>Challenge not found.</div>;
  }
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <Challenge
        defaultCode={challengeData.code}
        defaultTests={challengeData.tests}
        description={challengeData.description}
        name={challengeData.name}
        title={challengeData.title}
        user={user}
      />
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

export default challenges;
