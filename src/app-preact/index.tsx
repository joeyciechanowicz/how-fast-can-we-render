/** @jsx h */
import { h } from "preact";
import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";

export interface AppProps {
  isLoggedIn: boolean;
  path: string;
  showLorum: boolean;
}

export const App = ({ isLoggedIn, path, showLorum }: AppProps) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} path={path} />
      <Body showLorum={showLorum} />
      <Footer />
    </div>
  );
};
