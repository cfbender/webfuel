import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import challengeList from "../public/assets/challenges.json";
import { useFetchUser } from "../lib/user";

const Index = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      {/*
        //@ts-ignore */}
      {challengeList.map((challenge: any, idx: number) => (
        <Link
          key={idx}
          href="challenge/[name]"
          as={`/challenge/${challenge.name}`}
        >
          <a>{challenge.name.toUpperCase()}</a>
        </Link>
      ))}
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
