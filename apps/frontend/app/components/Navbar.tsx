import { Form, Link } from "@remix-run/react";

export default function Navbar() {
    return (
        <nav className="topnav">
            {/* Logo */}
            <Link to="/">
                MyApp
            </Link>

            <div >
                <Link to="/contacts">Contacts</Link>
                <Link to="/contactsExample">Contacts Example</Link>
            </div>

            <div>
                <Form method="post" action="/logout">
                    <button type="submit">
                        Logout
                    </button>
                </Form>
            </div>
        </nav>
    );
}
