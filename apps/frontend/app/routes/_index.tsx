import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token"); 

  if (!token) {
    return redirect("/login")
  }

  return { token };
};

export default function IndexPage() {
  return <h1>Welcome! This is the index page.</h1>;
}
