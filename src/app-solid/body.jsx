import { Lorum } from "./lorum";

export const Body = ({ showLorum }) => {
  return (
    <main>
      <h1>Welcome</h1>

      <article>
        {showLorum && (
          <div>
            <Lorum depth={1} />
            <Lorum depth={2} />
            <Lorum depth={3} />
            <Lorum depth={4} />
          </div>
        )}
      </article>
    </main>
  );
};
