import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Notes({ auth, notes }) {
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            This is notes page! Grats!
                            {notes.map((item) => (
                                <div className=" text-blue-950" key={item.id}>
                                    <h2>{item.id}</h2>
                                    <h3 className=" font-bold">
                                        {item.user.name}
                                    </h3>
                                    <p>{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
