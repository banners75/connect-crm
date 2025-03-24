import { Form, Link, useLocation } from "@remix-run/react";
import Notifications from "./Notifications";

export default function Navbar({ hasToken, notifications }: { hasToken: boolean, notifications: any }) {

    const location = useLocation();
    const showlogin = location.pathname !== "/login";


    return (
        <nav className="topnav">
            {/* Logo */}
            <Link to="/">
                MyApp
            </Link>

            <div>
                <Notifications />
            </div>

            {/* <div>
                <ul>
                    {notifications.map((notif: any, index: any) => (
                        <li key={index}>
                            {notif.recipient}: {notif.message}
                        </li>
                    ))}
                </ul>
            </div> */}

            <div style={{ display: hasToken ? "block" : "none" }} >
                <Link to="/contacts">Contacts</Link>
                <Link to="/contactsExample">Contacts Example</Link>
            </div>

            <div>
                <Form method="post" action="/logout">
                    <button type="submit" style={{ display: hasToken ? "block" : "none" }}>
                        Logout
                    </button>
                </Form>
            </div>
            <div>
                <Form method="post" action="/login">
                    <button type="submit" style={{ display: showlogin && !hasToken ? "block" : "none" }}>
                        Login
                    </button>
                </Form>
            </div>
        </nav>
    );
}
