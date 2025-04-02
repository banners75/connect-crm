import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { protectedLoader } from "~/utils/protectedLoader";

export const loader = protectedLoader(async ({ request, userSession }) => { 

  if (!userSession.token) {
    return redirect("/login")
  }

  return { userSession };
});

export default function IndexPage() {
  return <h1>Welcome! This is the index page.</h1>;
}
