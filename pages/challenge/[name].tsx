import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/user";
import Challenge from "../../components/Challenge";
import challengeList from "../../public/assets/data/challenges.json";

const challenge = () => {
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
        defaultTests={challengeData.initialTests}
        description={challengeData.description}
        name={challengeData.name}
        title={challengeData.title}
        finalTests={challengeData.finalTests}
        user={user}
      />
    </Layout>
  );
};

export default challenge;
