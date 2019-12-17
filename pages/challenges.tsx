import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import challengeList from "../public/assets/data/challenges.json";
import { useFetchUser } from "../lib/user";

const challenges = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <div className="container">
        <div className="primer">
          <p>
            Welcome to WebFuel challenges! Here you can learn JavaScript on the
            fly by using our web based text editor and cloud compiler. Pick from
            the challenges below to get started!
          </p>

          {!user && (
            <code>
              Tip: Log in above using Auth0 to store your code and tests!
            </code>
          )}
        </div>
        <hr />

        <div className="challenges">
          <h1>Challenges</h1>
          {/*
        //@ts-ignore */}
          {challengeList.map((challenge: any, idx: number) => (
            <Link
              key={idx}
              href="challenge/[name]"
              as={`/challenge/${challenge.name}`}
            >
              <a className="challenge-link">{challenge.title.toUpperCase()}</a>
            </Link>
          ))}
        </div>
      </div>
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
        hr {
          width: 60%;
        }
        code {
          font-size: 1.1rem;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
        .primer {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 60rem;
          font-size: 1.5rem;
        }
        .challenges {
          display: flex;
          flex-direction: column;
          padding: 50px;
        }
        .challenge-link {
          text-decoration: none;
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        @media only screen and (max-width: 600px) {
          code {
            font-size: 1rem;
            margin: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default challenges;
