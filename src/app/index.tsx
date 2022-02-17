import React, { useState } from "react";
import { Lorum } from "./lorum";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header>
      <nav>
        <ul>
          <a href="/link1">Link 1</a>
          <a href="/link1">Link 2</a>
          <a href="/link1">Link 3</a>
          <a href="/link1">Link 4</a>
          {isLoggedIn ? (
            <a href="/profile">Profile</a>
          ) : (
            <a href="/login">Login</a>
          )}
        </ul>
      </nav>
    </header>
  );
};

const Main = () => {
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

const Footer = () => {
  return <footer>Thank you</footer>;
};

export const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
