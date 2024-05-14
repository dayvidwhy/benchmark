import React from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";

type Survey = {
    id: number;
    title: string;
};

export default function SurveyPage({ surveys }: { surveys: Survey[] }) {
    return (
        <Layout>
            <Head title="Survey" />
            <h1>Survey</h1>
            {surveys.map((survey) => (
                <div key={survey.id}>
                    <h2>{survey.title}</h2>
                </div>
            ))}
        </Layout>
    );
}
