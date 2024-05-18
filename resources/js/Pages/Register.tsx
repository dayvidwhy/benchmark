import React from "react";
import Layout from "../Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Register() {
    const { csrf_token, errors } = usePage().props;
    console.log(errors);
    return (
        <Layout>
            <Head title="Register" />
            <div className="w-48 overflow-y-auto bg-slate-700 border-r border-slate-600 text-slate-300">
                <div className="my-1 flex justify-between align-middle p-2">
                    
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <div className="w-full p-4 bg-slate-100 h-full">
                    <div className="flex flex-col items-center justify-center h-full">
                        <form method="post" action="/users">
                            <input type="hidden" name="_token" value={csrf_token as string} />
                            <h1 className="text-2xl text-slate-800 text-center mb-2">Register</h1>
                            <div className="flex flex-col w-96">
                                <label htmlFor="name" className="text-slate-600">Name</label>
                                <input name="name" type="text" id="name" className="p-2 border border-slate-300 rounded" />
                            </div>
                            <div className="flex flex-col w-96">
                                <label htmlFor="email" className="text-slate-600">Email</label>
                                <input name="email" type="email" id="email" className="p-2 border border-slate-300 rounded" />
                            </div>
                            <div className="flex flex-col w-96">
                                <label htmlFor="password" className="text-slate-600">Password</label>
                                <input name="password" type="password" id="password" className="p-2 border border-slate-300 rounded" />
                            </div>
                            <button className="bg-slate-800 text-slate-50 p-2 rounded w-96 mt-4">Register</button>
                            <Link href="/login" className="text-slate-600 mt-2 block">Already have an account? Login</Link>
                            { errors.message && (
                                <p className="text-red-600 mt-2 block">
                                    {errors.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
