import React from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";

type Survey = {
    id: number;
    title: string;
};

export default function SurveyViewPage({ survey }: { survey: Survey}) {
    return (
        <Layout>
            <Head title="Survey" />
            <div className="w-full p-4 bg-slate-100 h-full">
                <h1 className="text-2xl mb-4 text-slate-800">Surveys</h1>
                {survey.title}
            </div>
        </Layout>
    );
}
