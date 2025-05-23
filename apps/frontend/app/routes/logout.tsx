import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";
import type { ActionFunction } from "@remix-run/node";
import { analyticsServer } from "~/utils/analytics.server";

export const loader = async ({ request }: { request: Request }) => {
    return await endSession(request);
};

export const action: ActionFunction = async ({ request }) => {
    return await endSession(request);
};

async function endSession(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));

    analyticsServer.track("User Logged out", {
        distinct_id: session.get("username")
    });

    return redirect("/", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

