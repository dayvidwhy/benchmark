import React from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";
import { SurveyListItem, type Survey } from "../Components/SurveyListItem";

export default function SurveyList({ surveys }: { surveys: Survey[] }) {
    return (
        <Layout>
            <Head title="Survey" />
            <div className="w-48 overflow-y-auto bg-slate-700 border-r border-slate-600 text-slate-300">
                <div className="my-1 flex justify-between align-middle p-2">
                    Side
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="w-full p-4 bg-slate-100 h-full">
                    {surveys.map((survey) => (
                        <SurveyListItem key={survey.id} survey={survey} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
