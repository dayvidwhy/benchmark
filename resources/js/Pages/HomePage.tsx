import React from "react";
import Layout from "../Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function HomePage() {
    return (
        <Layout>
            <Head title="Home" />
            <h1 className="text-4xl">Home</h1>
        </Layout>
    );
}
