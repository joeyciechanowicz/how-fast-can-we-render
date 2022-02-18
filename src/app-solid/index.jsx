import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";

export const App = ({ isLoggedIn, path, showLorum }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} path={path} />
      <Body showLorum={showLorum} />
      <Footer />
    </div>
  );
};
