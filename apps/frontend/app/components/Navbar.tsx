import { Form, Link, useLocation } from "@remix-run/react";

export default function Navbar({ hasToken }: { hasToken: boolean }) {

    const location = useLocation();
    const showlogin = location.pathname !== "/login";

    return (
        <nav className="topnav">
            {/* Logo */}
            <Link to="/">
                MyApp
            </Link>

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
