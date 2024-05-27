import { motion } from "framer-motion";
import React from "react";

/**
 * Validation-panel, which will be shown when the request has been sent.
 * 200=SUCCESS
 * 400=BAD REQUEST
 * 404=NOT FOUND
 */
export default function Validator({
  requestStatus,
  pullStatus,
}: {
  requestStatus: number;
  pullStatus: string;
}) {
  let response;
  switch (requestStatus) {
    case 200:
      return (
        <motion.div
          className="status-bar success font-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0, duration: 0.2 }}
        >
          {pullStatus == "open"
            ? "Pull request is open."
            : "Pull request is open."}
        </motion.div>
      );
    case 400:
      return (
        <motion.div
          className="status-bar error font-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0, duration: 0.2 }}
        >
          Invalid URL.
        </motion.div>
      );
    case 404:
      return (
        <motion.div
          className="status-bar error font-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0, duration: 0.2 }}
        >
          Could not find pull request.
        </motion.div>
      );

    default:
      return (
        <motion.div
          className="status-bar error font-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0, duration: 0.2 }}
        >
          Unexpected error.
        </motion.div>
      );
  }
}
