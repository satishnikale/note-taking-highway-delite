import { useState } from "react";
import {
    Plus,
    Trash2
} from "lucide-react";
import { CreateNote } from "../components/CreateNote";

export default function Dashboard() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [noteHeading, setNoteHeading] = useState("");
    const [noteContent, setNoteContent] = useState("");

    const [notes, setNotes] = useState([
        { id: 1, title: "Note 1", content: "This is the first note" },
        { id: 2, title: "Note 2", content: "This is the second note" }
    ]);

    const handleCreateNote = () => {
        if (noteHeading.trim()) {
            const newNote = {
                id: notes.length + 1,
                title: noteHeading,
                content: noteContent
            };
            setNotes([...notes, newNote]);
            setNoteHeading("");
            setNoteContent("");
            setCreateModalOpen(false);
        }
    };

    const handleDeleteNote = (id: any) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const resetModal = () => {
        setNoteHeading("");
        setNoteContent("");
        setCreateModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-inter mx-auto">
            {/* Create Note Modal */}
            {createModalOpen && (
                <CreateNote setCreateModalOpen={setCreateModalOpen} />
            )}
            {/* Main content */}
            <div className="min-h-screen w-full">
                {/* Top bar */}
                <div className="flex flex-row justify-between p-4 sm:p-6 lg:p-8">
                    <h1 className="font-medium">Dashboard</h1>
                    <button className="text-blue-600 underline cursor-pointer font-medium">Sign Out</button>
                </div>
                {/* Main content area */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Welcome section */}
                    <div className="mb-8 border rounded px-3 py-5 md:px-8 md:py-10 shadow-md">
                        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                            Welcome, Jonas Kahnwald !
                        </h1>
                        <p className="text-slate-600">
                            Email: xxxxxx@xxxx.com
                        </p>
                    </div>
                    {/* Create Note button */}
                    <div className="mb-8">
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            className="w-full inline-flex justify-center md:justify-start md:w-auto items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            Create Note
                        </button>
                    </div>
                    {/* Notes section */}
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Notes</h2>
                        <div className="space-y-3">
                            {notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="bg-white px-6 py-4 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="font-medium text-slate-900">{note.title}</h3>
                                        {note.content && (
                                            <p className="text-sm text-slate-600 mt-1">{note.content}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}