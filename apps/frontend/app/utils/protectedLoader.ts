import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "../sessions";

export function protectedLoader<T extends LoaderFunction>
    (loader: (args: LoaderFunctionArgs & { userSession: { hasToken: boolean, token: string | undefined, username: string | undefined } }) => ReturnType<T>): LoaderFunction {
    return async (args) => {
        const userSession = await requireUserSession(args.request); 

        return loader({ ...args, userSession });
    };
}
