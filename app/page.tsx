"use client";
import "./globals.css";
import { useState } from "react";
import { Octokit } from "@octokit/core";

export default function Home() {
  const [link, setLink] = useState<string>("");
  const [pullStatus, setPullStatus] = useState<string>();
  const [requestStatus, setRequestStatus] = useState<number>();

  const filterParams = () => {
    const delimiter1 = "github.com";
    const delimiter2 = "https://github.com";
    // remove head
    const regex = new RegExp(`${delimiter1}|${delimiter2}`, "g");
    const withoutHead = link.split(regex);
    // split into required parameters
    const params = withoutHead[1].split("/");
    return params;
  };

  const validateURL = () => {
    const scheme_1 = "https://";
    const scheme_2 = "www.";
    const domain = "github.com";

    const split = link.split(
      new RegExp(`${scheme_1}|${scheme_2}|${domain}`, "g")
    );
    console.log(split);
  };
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });
  const run = async () => {
    const params = filterParams();
    try {
      //validate filterParams()-response
      if (params[1] && params[2] && params[4]) {
        //sending request
        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/pulls/{pull_number}",
          {
            owner: params[1],
            repo: params[2],
            pull_number: Number(params[4]),
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        console.log(JSON.parse(JSON.stringify(response)));

        setPullStatus(JSON.parse(JSON.stringify(response))["data"]["state"]);
        setRequestStatus(JSON.parse(JSON.stringify(response))["status"]);
      } else {
        console.log("Missing parameters.");
      }
    } catch (e) {
      console.log("------------------------------");
      console.log("Error log:");
      console.log(e);
      console.log("------------------------------");
    }
  };
  return (
    <main>
      <div className="container">
        <div className="input-row">
          <input
            placeholder="URL of pull request (E.g: github.com/anthony/myrepo/pull/453"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button onClick={validateURL}>submit</button>
        </div>
        <div className="validation">
          {requestStatus != 200 && requestStatus && (
            <div className="status-bar invalid">Pull request is invalid.</div>
          )}
          {requestStatus == 200 && pullStatus == "open" && (
            <div className="status-bar open">Pull request is open.</div>
          )}
          {requestStatus == 200 && pullStatus == "closed" && (
            <div className="status-bar closed">Pull request is closed.</div>
          )}
        </div>
      </div>
    </main>
  );
}
