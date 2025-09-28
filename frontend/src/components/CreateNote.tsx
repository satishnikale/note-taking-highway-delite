import { Save, X } from "lucide-react";
import { useState } from "react";

export const CreateNote = ({ setCreateModalOpen }: any) => {
    const [noteHeading, setNoteHeading] = useState("");
    const [noteContent, setNoteContent] = useState("");

    const [notes, setNotes] = useState([
        { id: 1, title: "Note 1", content: "This is the first note" },
        { id: 2, title: "Note 2", content: "This is the second note" }
    ]);

    const resetModal = () => {
        setNoteHeading("");
        setNoteContent("");
        setCreateModalOpen(false);
    };
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
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900">Create New Note</h3>
                    <button
                        onClick={resetModal}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Note Heading
                        </label>
                        <input
                            type="text"
                            placeholder="Enter note heading"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                            value={noteHeading}
                            onChange={(e) => setNoteHeading(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Note Content
                        </label>
                        <textarea
                            placeholder="Enter your note content..."
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
                    <button
                        onClick={resetModal}
                        className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateNote}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    >
                        <Save className="h-4 w-4" />
                        Save Note
                    </button>
                </div>
            </div>
        </div>

    )
}