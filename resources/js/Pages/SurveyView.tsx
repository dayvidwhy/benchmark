import React from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";

type Survey = {
    id: number;
    title: string;
};

export default function SurveyView({ survey }: { survey: Survey}) {
    return (
        <Layout>
            <Head title="Survey" />
            <div className="w-48 overflow-y-auto bg-slate-700 border-r border-slate-600 text-slate-300">
                <div className="my-1 flex justify-between align-middle p-2">
                    Controls
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="w-full p-4 bg-slate-100 h-full">
                    <h1 className="text-2xl mb-4 text-slate-800">{survey.title}</h1>

                </div>
            </div>
        </Layout>
    );
}
