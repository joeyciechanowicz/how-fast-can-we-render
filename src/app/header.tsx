/** @jsx React.createElement */
import React from "react";

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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
