import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/inertia";

const getCurrentRoute = () => {
    return window.location.pathname;
};

type Route = {
    path: string;
    name: string;
};

const routes: Route[] = [
    { path: "/", name: "Home" },
    { path: "/survey", name: "Surveys" },
];

const authRoutes: Route[] = [
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" },
];

const signOutRoutes: Route[] = [
    { path: "/logout", name: "Logout" },
];

interface SharedProps extends PageProps {
    auth: {
        user: {
            id: number,
            name: string,
            email: string
        }
    },
    csrf_token: string
}

export const Navigation = () => {
    const { auth }: SharedProps = usePage<SharedProps>().props;
    return (
        <header className="flex bg-slate-700">
            <div className="bg-slate-200 flex shadow">
                <ul className="flex flex-row w-48 bg-slate-800">
                    <li className="w-full text-center">
                        <a className="text-slate-50 block px-2 py-4 text-xl font-bold hover:text-slate-200 hover:bg-slate-600" href="/">Benchmark</a>
                    </li>
                </ul>
            </div>
            <div className="flex w-full justify-between">
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
                <nav className="flex align-middle justify-end text-slate-300">
                    {auth.user ? signOutRoutes.map((route) => (
                        <Link
                            key={route.path}
                            className={`
                            py-4 px-4
                            hover:bg-slate-500 
                            ${getCurrentRoute() === route.path ? "bg-slate-600" : ""}
                        `}
                            href={route.path}>{route.name}
                        </Link>
                    )) : authRoutes.map((route) => (
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
            </div>
        </header>
    );
};
