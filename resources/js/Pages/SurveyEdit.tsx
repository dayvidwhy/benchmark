import React, { useState, useCallback } from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";
import axios from "axios";

type SelectedQuestions = {
    label: string;
    questionType: string;
    description: string;
     // This is the id of the question in the database
     // New questions start off with this being null
     // We let the server provide an ID when saving the question
    id: string | null;
};

type Survey = {
    id: number;
    title: string;
    questions: SelectedQuestions[] | null;
};

type Questions = {
    localId: number;
    questionDisplayName: string;
    questionType: string;
};

const availableQuestions: Questions[] = [
    {
        localId: 1,
        questionDisplayName: "Text",
        questionType: "text"
    },
    {
        localId: 2,
        questionDisplayName: "Long Text",
        questionType: "long_text"
    }
];

// Add the SurveyEdit component 
export default function SurveyEdit({ survey, questions }: { survey: Survey, questions: SelectedQuestions[]}) {
    const [selectedQuestions, setSelectedQuestions] = useState<SelectedQuestions[]>([...questions || []]);
    const [surveyTitle, setSurveyTitle] = useState<string>(survey.title);
    const [savePending, setSavePending] = useState<boolean>(false);

    const handleQuestionMove = useCallback((index: number, direction: "up" | "down") => {
        setSelectedQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            const targetIndex = direction === "up" ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= newQuestions.length) return newQuestions;

            const [movedQuestion] = newQuestions.splice(index, 1);
            newQuestions.splice(targetIndex, 0, movedQuestion);
            return newQuestions;
        });
    }, []);

    const saveSurvey = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavePending(true);
        await axios({
            method: "put",
            url: `/api/surveys/${survey.id}`,
            data: {
                survey: {
                    title: surveyTitle,
                    questions: selectedQuestions
                }
            }
        });
        setSavePending(false);
    };

    return (
        <Layout>
            <Head title="Survey" />
            <div className="w-48 overflow-y-auto bg-slate-700 border-r border-slate-600 text-slate-300">
                <div className="my-1 flex flex-col justify-between align-middle p-2">
                    <h1 className="text-sm mb-2">Question Types</h1>
                    <div className="flex flex-col">
                        {availableQuestions.map((availableQuestion) => (
                            <button
                                key={availableQuestion.localId}
                                onClick={() => setSelectedQuestions([...selectedQuestions, {
                                    label: "",
                                    description: "",
                                    questionType: availableQuestion.questionType,
                                    id: null
                                }])}
                                className="bg-slate-600 hover:bg-slate-500 text-slate-200 mb-2 py-1 px-2 rounded-sm text-left">
                                {availableQuestion.questionDisplayName}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 bg-slate-100 h-full">
                <form onSubmit={saveSurvey} className="w-full p-4 bg-white h-full shadow overflow-y-auto">
                    <input
                        type="submit"
                        value="Save"
                        disabled={savePending}
                        className="
                            border border-slate-300
                            text-slate-600 
                            hover:bg-slate-200
                            py-1 px-2 rounded mb-4 cursor-pointer transition
                        "
                    />
                    <input
                        type="text"
                        value={surveyTitle}
                        onChange={(e) => setSurveyTitle(e.target.value)}
                        className="w-full p-2 mb-4 bg-inherit text-2xl"
                    />
                    {selectedQuestions.map((question, index) => (
                        <div key={index} className="bg-slate-100 p-2 mb-2 rounded flex w-full justify-between">
                            <div className="flex-1 pr-2">
                                <span className="text-sm px-2 text-slate-600">
                                    {(() => {
                                        const matchingQuestion = availableQuestions.find((availableQuestion) => {
                                            return availableQuestion.questionType === question.questionType;
                                        });
                                        return matchingQuestion?.questionDisplayName || "Unknown";
                                    })()}
                                </span>
                                <input
                                    type="text"
                                    value={question.label || ""}
                                    onChange={(e) => {
                                        const newQuestions = [...selectedQuestions];
                                        newQuestions[index].label = e.target.value;
                                        setSelectedQuestions(newQuestions);
                                    }}
                                    placeholder="Question label"
                                    className="w-full px-2 mb-2 bg-inherit text-md font-bold"
                                />
                                <input 
                                    type="text"
                                    value={question.description || ""}
                                    onChange={(e) => {
                                        const newQuestions = [...selectedQuestions];
                                        newQuestions[index].description = e.target.value;
                                        setSelectedQuestions(newQuestions);
                                    }}
                                    placeholder="Description"
                                    className="w-full px-2 mb-2 bg-inherit text-sm text-slate-600"    
                                />
                            </div>
                            <div className="flex flex-col w-20 text-center">
                                <button 
                                    onClick={() => {
                                        const newQuestions = [...selectedQuestions];
                                        newQuestions.splice(index, 1);
                                        setSelectedQuestions(newQuestions);
                                    }}
                                    type="button"
                                    className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded-sm mb-2 text-sm">
                                    Remove
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuestionMove(index, "up")}
                                    className="bg-slate-600 hover:bg-slate-500 text-slate-200 py-1 px-2 mb-2 rounded-sm text-sm"
                                >
                                    Up
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuestionMove(index, "down")}
                                    className="bg-slate-600 hover:bg-slate-500 text-slate-200 py-1 px-2 mb-2 rounded-sm text-sm"
                                >
                                    Down
                                </button>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </Layout>
    );
}
