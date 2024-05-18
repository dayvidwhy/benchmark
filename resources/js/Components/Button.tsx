import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
    onClick: () => void;
    text: string;
    type: "primary" | "secondary" | "danger" | "tertiary";
    classes?: string[]; // style overrides
};

export const Button = ({
    onClick,
    text,
    classes,
    type
} : ButtonProps) => {
    return (
        <button
            type="button"
            className={twMerge(
                [
                    ...(() => {
                        if (type === "primary") {
                            return [
                                "text-slate-300",
                                "hover:bg-slate-400",
                                "hover:text-slate-50"
                            ];
                        }

                        if (type === "secondary") {
                            return [
                                "text-slate-500",
                                "hover:bg-slate-400",
                                "hover:text-slate-50"
                            ];
                        }
                        
                        if (type === "danger") {
                            return [
                                "text-white",
                                "bg-red-500",
                                "hover:bg-red-400",
                                "hover:text-slate-50"
                            ];
                        }

                        if (type === "tertiary") {
                            return [
                                "bg-slate-500",
                                "hover:bg-slate-400",
                                "text-slate-50"
                            ];
                        }

                        return [];
                    })(),
                    "border", "border-slate-50",
                    "p-1", "ml-2",
                    "text-sm",
                    "inline-block",
                    "transition",
                    "cursor-pointer"
                ].join(" "), classes?.join(" "))}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
