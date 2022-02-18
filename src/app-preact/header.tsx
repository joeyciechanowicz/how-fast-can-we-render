/** @jsx h */
import { h } from "preact";

const links = [
  { url: "link1", text: "link 1" },
  { url: "link2", text: "link 2" },
  { url: "link3", text: "link 3" },
  { url: "link4", text: "link 4" },
  { url: "link5", text: "link 5" },
];

const HeaderLink = ({ url, active, children }: any) => {
  return (
    <a className={active ? "active" : ""} href={url}>
      {children}
    </a>
  );
};

export const Header = ({
  isLoggedIn,
  path,
}: {
  isLoggedIn: boolean;
  path: string;
}) => {
  return (
    <header>
      <nav>
        <ul>
          {links.map((link, idx) => (
            <HeaderLink key={idx} active={path === link.url}>
              {link.text}
            </HeaderLink>
          ))}
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
