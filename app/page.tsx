"use client";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import Loader from "./components/Loader";
import Validator from "./components/Validator";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [active, setActive] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [pullStatus, setPullStatus] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState<number>(0);

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const extract = () => {
    const split = link.split(new RegExp(`${"github.com"}`, "g"));
    const values = split[split.length - 1].split("/");
    console.log(values);
    return values;
  };
  const run = async () => {
    console.log("executing function...");
    try {
      //check if link is a github pull-request
      if (link.includes("github.com") && link.includes("pull")) {
        //extract the required parameters from the URL
        const params = extract();
        //confirm that parameters are existing
        if (params[1] && params[2] && params[4]) {
          //send request
          const permalink = link;
          setInterval(async () => {
            console.log("-------------------------------");
            console.log("in the interval-loop...");
            console.log("URL: " + permalink);
            const response = await octokit
              .request("GET /repos/{owner}/{repo}/pulls/{pull_number}", {
                owner: params[1],
                repo: params[2],
                pull_number: Number(params[4]),
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              })
              .catch((error) => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  setRequestStatus(error.response.status);
                } else if (error.request) {
                  // The request was made but no response was received
                  setRequestStatus(500);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  setRequestStatus(500);
                }
              });
            console.log(
              "Pull request status: " +
                JSON.parse(JSON.stringify(response))["data"]["state"]
            );
            console.log(
              "HTTP status: " + JSON.parse(JSON.stringify(response))["status"]
            );
            setPullStatus(
              JSON.parse(JSON.stringify(response))["data"]["state"]
            );
            setRequestStatus(JSON.parse(JSON.stringify(response))["status"]);
          }, 10000);
        } else {
          setRequestStatus(0);
        }
      } else {
        setRequestStatus(0);
      }
    } catch (e) {
      console.log("Unexpected Error.");
      console.log(e);
    }
  };

  useEffect(() => {
    // Set up the interval to send the request every minute
    // Clean up the interval when the component unmounts
  }, []);
  return (
    <main>
      <Loader />
      <motion.div className="container flex-column-center-center">
        <motion.div className="input-row flex-row-center-center">
          <input
            className="font-text-small"
            placeholder="URL of pull request (E.g: github.com/anthony/myrepo/pull/453)"
            type="text"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setRequestStatus(0);
              setRequestStatus(0);
            }}
          />
          <button
            onClick={async () => {
              await run();
            }}
            className="submit font-text-small-bold"
          >
            Load
          </button>
        </motion.div>
        <AnimatePresence>
          {requestStatus != 0 && (
            <motion.div
              className="validation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0, duration: 0.2 }}
            >
              <Validator
                requestStatus={requestStatus}
                pullStatus={pullStatus}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
