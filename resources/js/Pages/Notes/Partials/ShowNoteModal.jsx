import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

export default function ShowNoteModal({ className, noteData }) {
    const [showNoteDetails, setShowNoteDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorUpdate, setErrorUpdate] = useState(Boolean);

    const confirmNoteDetails = () => {
        setShowNoteDetails(true);
        setTitle(noteData[0].title);
        setContent(noteData[0].content);
    };
    const editModeButton = () => {
        setEditMode(!editMode);
        if (editMode === false) {
            setTitle(noteData[0].title);
            setContent(noteData[0].content);
        }
        setErrorUpdate(false);
    };

    const {
        data,
        setData,
        patch: update,
        processing,
        reset,
        errors,
    } = useForm({
        title: "",
        content: "",
    });
    const closeModal = () => {
        setShowNoteDetails(false);
        setEditMode(false);
        reset();
        setErrorUpdate(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const updateNote = (e) => {
        e.preventDefault();
        data.title = title;
        data.content = content;
        if (
            data.title === noteData[0].title &&
            data.content === noteData[0].content
        ) {
            setErrorUpdate(true);
        } else {
            update(route("notes.update", noteData[0]), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => console.log(errors),
                onFinish: () => reset(),
            });
        }
    };
    // const renderNoteData = () => {
    //     if (editMode === false) {
    //         return (
    //             <>
    //                 {noteData.map((item) => (
    //                     <div className="p-4 text-gray-900" key={item.id}>
    //                         <h2 className="text-2xl">{item.title}</h2>
    //                         <p className="text-sm">{item.user.name}</p>
    //                         <p className="text-sm">{item.created_at}</p>
    //                         <p className="text-base">{item.content}</p>
    //                     </div>
    //                 ))}
    //             </>
    //         );
    //     } else {
    //         return (
    //             <>
    //                 <p>MODE EDIT AKTIF</p>;
    //             </>
    //         );
    //     }
    // };
    const renderNoteData = () => {
        return (
            <>
                {noteData.map((item) => (
                    <div key={item.id}>
                        <div className="mt-6 text-gray-950">
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={editMode ? title : item.title}
                                onChange={(e) => {
                                    handleTitleChange(e);
                                }}
                                className="mt-1 block w-full"
                                placeholder={
                                    editMode ? "Type new title here" : ""
                                }
                                disabled={editMode ? false : true}
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6 text-gray-950">
                            <InputLabel htmlFor="content" value="Content" />
                            <textarea
                                name="content"
                                rows={3}
                                value={editMode ? content : item.content}
                                onChange={(e) => {
                                    handleContentChange(e);
                                }}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                placeholder={
                                    editMode ? "Type new content here" : ""
                                }
                                disabled={editMode ? false : true}
                            ></textarea>
                            <InputError
                                message={errors.content}
                                className="mt-2"
                            />
                        </div>
                    </div>
                ))}
            </>
        );
    };
    return (
        <div className={`${className}`}>
            <PrimaryButton onClick={confirmNoteDetails}>
                Show Details
            </PrimaryButton>
            <Modal show={showNoteDetails} onClose={closeModal}>
                <form onSubmit={updateNote} className="p-4">
                    {renderNoteData()}
                    {errorUpdate ? (
                        <div className="flex justify-center">
                            <div
                                role="alert"
                                className="alert alert-error mt-4 mx-2 w-1/2 flex items-center justify-center"
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
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>
                                    Try again, you haven't changed anything
                                </span>
                            </div>
                        </div>
                    ) : null}
                    <div
                        className={
                            editMode
                                ? "mt-6 flex justify-between p-6"
                                : " mt-6 flex justify-end p-6"
                        }
                    >
                        {editMode ? (
                            <PrimaryButton type="submit" disabled={processing}>
                                Update
                            </PrimaryButton>
                        ) : null}
                        <div>
                            <SecondaryButton onClick={closeModal}>
                                Exit
                            </SecondaryButton>
                            <SecondaryButton
                                className="ms-3"
                                onClick={editModeButton}
                            >
                                {editMode ? "Cancel" : "Edit"}
                            </SecondaryButton>
                            <DangerButton className="ms-3">Delete</DangerButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
