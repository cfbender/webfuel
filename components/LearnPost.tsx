import React from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";

type Props = {
  title: string;
  author: string;
  authorLink: string;
  content: string;
};
const LearnPost: React.FunctionComponent<Props> = ({
  title,
  author,
  authorLink,
  content,
}) => {
  return (
    <div className="container">
      <div className="info">
        <h2>{title}</h2>
        <h3>
          <a href={authorLink}>{author}</a>
        </h3>
        <div className="post">
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <CodeBlock
                    value={String(children).replace(/\n$/, "")}
                    language={match[1]}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
          font-weight: 200;
        }
        h2,
        h3 {
          text-align: center;
        }

        :global(pre > code) {
          background-color: transparent !important;
          color: #fff !important;
        }
        :global(pre) {
          line-height: 1rem !important;
        }

        .container {
          display: flex;
          justify-content: flex-start;
          background-color: #fff;
          margin: 0 10rem 0 10rem;
          height: 100%;
        }
        .post {
          display: flex;
          flex-direction: column;
          margin: 2rem;
          line-height: 2rem;
        }

        @media only screen and (max-width: 600px) {
          .container {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LearnPost;
