import React from "react";
import Layout from "../Layouts/Layout";
import { Head, Link } from "@inertiajs/react";

export default function Home() {
    return (
        <Layout>
            <Head title="Home" />
            <div className="w-48 overflow-y-auto bg-slate-700 border-r border-slate-600 text-slate-300">
                <div className="my-1 flex justify-between align-middle p-2">
                    
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="w-full p-4 bg-slate-100 h-full">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-4xl text-slate-800">Benchmark</h1>
                        <p className="text-slate-600 text-center">A simple survey tool for collecting data</p>
                        <Link className="text-slate-600 hover:text-slate-900 transition" href="/survey">
                            Start Surveying
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
