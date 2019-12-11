import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useFetchUser } from "../lib/user";
import learnList from "../public/assets/data/learn.json";

const learn = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <div className="container">
        <div className="primer">
          <p>
            Welcome to WebFuel learn! Here you can learn all things web
            development including tutorials, resources, and other reading
            material! Click on a blog post below to get learning!
          </p>

          {!user && (
            <code>
              Tip: Log in above using Auth0 to store your code and tests!
            </code>
          )}
        </div>
        <hr />

        <div className="posts">
          <h1>Posts</h1>
          {/*
        //@ts-ignore */}
          {learnList.map((post: any, idx: number) => (
            <Link key={idx} href="learn/[title]" as={`/learn/${post.urlTitle}`}>
              <a className="post-link">{post.title.toUpperCase()}</a>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        hr {
          width: 60%;
        }
        p {
          padding: 50px;
        }
        a {
          margin-bottom: 10px;
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
        .posts {
          display: flex;
          flex-direction: column;
          padding: 50px;
        }
        .post-link {
          text-decoration: none;
          font-size: 1.2rem;
        }
      `}</style>
    </Layout>
  );
};

export default learn;
