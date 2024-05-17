import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

export type Survey = {
    id: number;
    title: string;
};

export default function SurveyList({ surveys }: { surveys: Survey[] }) {
    const [surveyList, setSurveyList] = useState<Survey[]>(surveys);

    const deleteSurvey = async (surveyId: number) => {
        await axios({
            method: "delete",
            url: `/api/surveys/${surveyId}`
        });

        setSurveyList(surveyList.filter((s) => s.id !== surveyId));
    };

    const createSurvey = async () => {
        let createSurveyResponse;

        try {
            createSurveyResponse = await axios({
                method: "post",
                url: "/api/surveys",
                data: {
                    survey: {
                        title: "New Survey"
                    }
                }
            });
        } catch (error) {
            console.error(error);
            return;
        }

        setSurveyList([...surveyList, {
            id: createSurveyResponse.data.survey_id,
            title:createSurveyResponse.data.survey_title
        }]);
    };
    
    return (
        <Layout>
            <Head title="Survey" />
            <div className="w-48 overflow-y-auto bg-slate-700 border-r border-slate-600 text-slate-300">
                <div className="my-1 flex justify-between align-middle p-2">
                    <button
                        onClick={createSurvey}
                        className="w-full bg-slate-600 hover:bg-slate-500 text-slate-200 mb-2 py-1 px-2 rounded-sm text-left">
                        Create Survey
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="w-full p-4 bg-slate-100 h-full">
                    {surveyList.map((survey, index) => (
                        <div
                            key={index}
                            className="
                            mb-4 p-4 
                            bg-slate-50 shadow
                            items-center
                            flex justify-between
                            text-slate-700
                            transition duration-300 ease-in-out
                        ">
                            <span>{survey.title}</span>
                            <div>
                                <Link
                                    href={`/survey/${survey.id}/edit`}
                                    className="
                                        text-slate-500 p-1
                                        inline-block
                                        rounded w-16
                                        text-center
                                        border border-slate-300
                                        hover:bg-slate-400 hover:text-slate-50
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="
                                        text-slate-500 p-1 ml-2
                                        rounded w-16
                                        inline-block
                                        border border-slate-300
                                        hover:bg-slate-400 hover:text-slate-50
                                        transition
                                        cursor-pointer
                                    "
                                    onClick={() => deleteSurvey(survey.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
