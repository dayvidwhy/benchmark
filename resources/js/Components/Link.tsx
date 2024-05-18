import React from "react";
import { twMerge } from "tailwind-merge";
import { Link as InertiaLink } from "@inertiajs/react";

type ButtonProps = {
    to: string;
    text: string;
    type: "primary" | "secondary";
    classes: string[] | null;
};

export const Link = ({
    to,
    text,
    classes,
    type
} : ButtonProps) => {
    return (
        <InertiaLink
            href={to}
            className={twMerge(
                [
                    type == "primary" ? "text-slate-300" : "text-slate-500",
                    "p-1",
                    "ml-2",
                    "rounded",
                    "inline-block",
                    "text-center",
                    "border", "border-slate-300",
                    "hover:bg-slate-400", "hover:text-slate-50",
                    "transition",
                    "cursor-pointer"
                ].join(" "), classes?.join(" "))}
        >
            {text}
        </InertiaLink>
    );
};
