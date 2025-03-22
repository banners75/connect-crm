import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";
import type { ActionFunction } from "@remix-run/node";


export const loader = async ({ request }: { request: Request }) => {
    return await endSession(request);
};

export const action: ActionFunction = async ({ request }) => {
    return await endSession(request);
};

async function endSession(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));

    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

