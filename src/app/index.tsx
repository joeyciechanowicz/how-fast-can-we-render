/** @jsx React.createElement */
import React from "react";
import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";

export interface AppProps {
  isLoggedIn: boolean;
  path: string;
}

export const App = ({ isLoggedIn, path }: AppProps) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} path={path} />
      <Body />
      <Footer />
    </div>
  );
};
