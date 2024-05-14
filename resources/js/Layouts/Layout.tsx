import React from "react";
import { Navigation } from "../Components/Navigation";

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-full flex flex-col">
            <div>
                <Navigation />
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex flex-row h-full">
                    <div className="w-48 overflow-auto">
                        Sidebar
                    </div>
                    <div className="flex-1 overflow-auto">
                        <article>{children}</article>
                    </div>
                </div>
            </div>
            <div>
                Footer
            </div>
        </div>
    );
}
