import React from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function HomePage() {
    return (
        <Layout>
            <Head title="Home" />
            <div className="bg-slate-100 h-full p-4">
                <h1 className="text-2xl mb-4 text-slate-800">Home</h1>
            </div>
        </Layout>
    );
}
