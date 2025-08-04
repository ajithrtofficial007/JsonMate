"use client";
import { WorkbenchContext } from "@/context/workbench";
import { EditorHandler } from "@/services/editor-handler";
import { useContext, useState } from "react";

const editorHandler = new EditorHandler();

export default function SchemaGeneratorPopup({ isOpen }: PopupProps) {
    const {popupStatuses, setPopupStatuses, currentProject, setCurrentProject} = useContext(WorkbenchContext);
    const [jsonInput, setJsonInput] = useState("");
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#23272f] rounded-lg shadow-lg p-6 w-full max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Generate JSON Schema from Existing JSON</h2>
                    <button
                        className="text-gray-400 hover:text-white text-xl cursor-pointer"
                        onClick={() => editorHandler.onCloseSchemaGeneratorPopup(popupStatuses, setPopupStatuses)}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <textarea
                    className="w-full h-48 p-3 rounded bg-[#181a20] text-white border border-gray-700 resize-vertical mb-4"
                    placeholder="Paste your JSON here..."
                    value={jsonInput}
                    onChange={e => setJsonInput(e.target.value)}
                />
                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
                        onClick={() => {
                            if(currentProject) {                                
                                editorHandler.onActionSchemaGeneratorPopup(jsonInput, currentProject, setCurrentProject);
                                editorHandler.onCloseSchemaGeneratorPopup(popupStatuses, setPopupStatuses);
                            }
                        }}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}