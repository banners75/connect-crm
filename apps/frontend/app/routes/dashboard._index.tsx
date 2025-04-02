import { redirect } from "@remix-run/node";
import { protectedLoader } from "~/utils/protectedLoader";

export const loader = protectedLoader(async ({ userSession }) => { 

  if (!userSession.token) {
    return redirect("/login")
  }

  return { userSession };
});

export default function IndexPage() {
  return <h1>Welcome! This is the index page.</h1>;
}
