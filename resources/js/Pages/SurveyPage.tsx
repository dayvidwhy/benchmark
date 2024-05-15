import React from "react";
import Layout from "../Layouts/Layout";
import { Head, Link } from "@inertiajs/react";

type Survey = {
    id: number;
    title: string;
};

const Survey = ({ survey }: { survey: Survey }): React.ReactNode => {
    return (
        <Link
            href={`/survey/${survey.id}`}
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

export default function SurveyPage({ surveys }: { surveys: Survey[] }) {
    return (
        <Layout>
            <Head title="Survey" />
            <div className="w-full p-4 bg-slate-100 h-full">
                <h1 className="text-2xl mb-4 text-slate-800">Surveys</h1>
                {surveys.map((survey) => (
                    <Survey key={survey.id} survey={survey} />
                ))}
            </div>
        </Layout>
    );
}
