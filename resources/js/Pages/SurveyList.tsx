import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";
import { SurveyListItem, type Survey } from "../Components/SurveyListItem";
import axios from "axios";

export default function SurveyList({ surveys }: { surveys: Survey[] }) {
    const [surveyList, setSurveyList] = useState<Survey[]>(surveys);

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
                    {surveyList.map((survey) => (
                        <SurveyListItem key={survey.id} survey={survey} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};
