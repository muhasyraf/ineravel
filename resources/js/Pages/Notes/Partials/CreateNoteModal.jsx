import { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function CreateNoteModal({ className = "" }) {
    const [confirmingNoteAddition, setConfirmingNoteAddition] = useState(false);

    const confirmNoteAddition = () => {
        setConfirmingNoteAddition(true);
    };

    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
    } = useForm({
        title: "",
        content: "",
    });

    const addNote = (e) => {
        e.preventDefault();
        create(route("notes.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log(errors),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingNoteAddition(false);
        reset();
    };

    return (
        <div className={`${className}`}>
            <PrimaryButton onClick={confirmNoteAddition}>
                Create New Note
            </PrimaryButton>
            <Modal show={confirmingNoteAddition} onClose={closeModal}>
                <form onSubmit={addNote} className="p-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create New Note
                    </h2>

                    <div className="mt-6 text-gray-950">
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className="mt-6 text-gray-950">
                        <InputLabel htmlFor="content" value="Content" />
                        <textarea
                            name="content"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            placeholder="Content"
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Create
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
