import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";
import { Link } from "../Components/Link";
import { Button } from "../Components/Button";
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
            url: `/surveys/${surveyId}`
        });

        setSurveyList(surveyList.filter((s) => s.id !== surveyId));
    };

    const createSurvey = async () => {
        let createSurveyResponse;

        try {
            createSurveyResponse = await axios({
                method: "post",
                url: "/surveys",
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
                    <Button
                        type="primary"
                        onClick={createSurvey}
                        text="Create Survey"
                        classes={["w-full"]}
                    />
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
                                    classes={["w-16"]}
                                    type="secondary"
                                    to={`/survey/${survey.id}/edit`}
                                    text="Edit"
                                />
                                <Button
                                    classes={["w-16"]}
                                    type="danger"
                                    onClick={() => deleteSurvey(survey.id)}
                                    text="Remove"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
