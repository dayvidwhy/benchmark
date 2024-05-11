import React from "react";
import Layout from "./Layout";
import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <Layout>
            <Head title="Home" />
            <h1 className="text-4xl">Home</h1>
        </Layout>
    );
}
