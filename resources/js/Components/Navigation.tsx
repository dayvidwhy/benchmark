import React from "react";
import { Link } from "@inertiajs/react";

export const Navigation = () => {
    return (
        <header className="flex">
            <div className=" w-48">
                Benchmark
            </div>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/survey">Survey</Link>
            </nav>
        </header>
    );
};
