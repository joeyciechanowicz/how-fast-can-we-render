/** @jsx React.createElement */
import React from "react";
import { Lorum } from "./lorum";

export const Body = () => {
  return (
    <main>
      <h1>Welcome</h1>

      <article>
        <Lorum />
        <Lorum />
        <Lorum />
        <Lorum />
        <Lorum />
        <Lorum />
      </article>
    </main>
  );
};
