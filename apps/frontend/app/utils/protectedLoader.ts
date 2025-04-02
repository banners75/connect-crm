import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "../sessions";

export function protectedLoader<T extends LoaderFunction>
    (loader: (args: LoaderFunctionArgs & { userSession: any }) => ReturnType<T>): LoaderFunction {
    return async (args) => {
        const userSession = await requireUserSession(args.request); 
        return loader({ ...args, userSession });
    };
}
