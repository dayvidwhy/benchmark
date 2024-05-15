import React from "react";
import { Link } from "@inertiajs/react";

const getCurrentRoute = () => {
    return window.location.pathname;
};

const routes = [
    { path: "/", name: "Home" },
    { path: "/survey", name: "Surveys" },
];

export const Navigation = () => {
    return (
        <header className="flex bg-slate-700">
            <div className="bg-slate-200 flex shadow">
                <ul className="flex flex-row w-48 bg-slate-800">
                    <li className="w-full text-center">
                        <a className="text-slate-50 block px-2 py-4 text-xl font-bold hover:text-slate-200 hover:bg-slate-600" href="/">Benchmark</a>
                    </li>
                </ul>
            </div>
            <nav className="flex align-middle justify-center text-slate-300">
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        className={`
                            py-4 px-4
                            hover:bg-slate-500 
                            ${getCurrentRoute() === route.path ? "bg-slate-600" : ""}
                        `}
                        href={route.path}>{route.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};
