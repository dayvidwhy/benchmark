import React from "react";
import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <main>
            <header>
                <Link href="/">Home</Link>
                <Link href="/survey">Survey</Link>
            </header>
            <article>{children}</article>
        </main>
    );
}
