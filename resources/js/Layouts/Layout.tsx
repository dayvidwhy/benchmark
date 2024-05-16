import React from "react";
import { Navigation } from "../Components/Navigation";

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-full flex flex-col">
            <Navigation />
            <div className="flex-1 overflow-hidden">
                <div className="flex flex-row h-full">
                    {children}
                </div>
            </div>
            <div className="flex justify-center py-2 bg-slate-50 border-t border-slate-400">
                <span className="text-sm text-slate-500">Built by <a className="hover:text-teal-700 transition" href="https://davidyoung.tech">https://davidyoung.tech</a></span>
            </div>
        </div>
    );
}
