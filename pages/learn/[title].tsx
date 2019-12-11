import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import LearnPost from "../../components/LearnPost";
import { useFetchUser } from "../../lib/user";

import learnList from "../../public/assets/data/learn.json";

const learn = () => {
  const router = useRouter();
  const { title } = router.query;
  const learnData = learnList.filter(item => item.urlTitle === title)[0];
  if (!learnData) {
    return <div>Post not found.</div>;
  }
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <LearnPost
        title={learnData.title}
        author={learnData.author}
        authorLink={learnData.authorLink}
        content={learnData.content}
      />
    </Layout>
  );
};

export default learn;
