import React from "react";
import { Link } from "@inertiajs/react";

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
