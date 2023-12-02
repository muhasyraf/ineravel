import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateNoteModal from "./Partials/CreateNoteModal";
import { useState } from "react";
import ShowNoteModal from "./Partials/ShowNoteModal";
import { usePage } from "@inertiajs/react";

export default function Notes({ auth, notes }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Notes
                </h2>
            }
        >
            <Head title="Notes" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-4 lg:px-6">
                    <div className="overflow-hidden flex-col shadow-sm sm:rounded-lg">
                        <div className="button-action flex justify-end">
                            {flash.message && (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{flash.message}</span>
                                </div>
                            )}

                            <CreateNoteModal className="px-6"></CreateNoteModal>
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-4 gap-2">
                                {notes.reverse().map((item) => (
                                    <div
                                        key={item.id}
                                        className="card w-auto bg-lime-300 text-primary-content"
                                    >
                                        <div className="card-body">
                                            <h2 className="card-title text-2xl">
                                                {item.title}
                                            </h2>
                                            <div className="text-sm leading-tight">
                                                <p>by {item.user.name}</p>
                                                <p>
                                                    {item.created_at ===
                                                    item.updated_at
                                                        ? "Created at "
                                                        : "Updated at "}
                                                    {new Date(
                                                        item.updated_at
                                                    ).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                            <p className="text-base h-36 text-ellipsis overflow-hidden">
                                                {item.content}
                                            </p>
                                            <div className="card-actions justify-center">
                                                <ShowNoteModal
                                                    className="p-1"
                                                    noteData={[item]}
                                                ></ShowNoteModal>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
