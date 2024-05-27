"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      id="loader"
      className="flex-row-center-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.8, duration: 0.2 }}
    >
      <motion.div
        className="loader-box flex-row-center-center"
        initial={{ opacity: 0, width: "0px" }}
        animate={{ opacity: 1, width: "400px" }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0, duration: 0.2 }}
      >
        <motion.div
          className="upper"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -100, opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        ></motion.div>
        <motion.div
          className="lower"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 100, opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        ></motion.div>
        <motion.div className="font-h1">GibWork!</motion.div>
      </motion.div>
    </motion.div>
  );
}