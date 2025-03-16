import { Link } from "@remix-run/react";

export default function Index() {
    return (
      <div>
      <p id="index-page">
        This is a demo for Remix..
        <br />
        Check out{" "}
        <a href="https://remix.run">the docs at remix.run</a>.
      </p>
      <p>
        <Link to={"login"}>Login</Link>
      </p>
      <p>
      <Link to={"contacts"}>Contacts</Link>
      </p>
      <p>
      <Link to={"contactsExample"}>Contacts Example</Link>
      </p>
      </div>
    );
  }
  