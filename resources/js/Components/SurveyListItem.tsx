import React from "react";
import { Link } from "@inertiajs/react";

export type Survey = {
    id: number;
    title: string;
};

export const SurveyListItem = ({ survey }: { survey: Survey }): React.ReactNode => {
    return (
        <Link
            href={`/survey/${survey.id}/edit`}
            className="
                mb-4 p-4 
                bg-slate-50 shadow
                flex justify-between
                text-slate-700
                hover:shadow-md
                hover:bg-slate-100
                transition duration-300 ease-in-out
                cursor-pointer
            ">
            <span>{survey.title}</span>
            <span>Details</span>
        </Link>
    );
};
