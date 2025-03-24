import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token"); 

  if (token) {
    return redirect("/dashboard");
  }

  return redirect("/login")
};

export default function IndexPage() {
  return <h1>Welcome! Please log in.</h1>;
}
