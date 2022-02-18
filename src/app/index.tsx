/** @jsx React.createElement */
import React, { useState } from "react";
import { Header } from "./header";
import { Body } from "./body";
import { Footer } from "./footer";

export const App = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Body />
      <Footer />
    </div>
  );
};
