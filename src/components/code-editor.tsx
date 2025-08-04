"use client";

import { WorkbenchContext } from "@/context/workbench";
import { EditorHandler } from "@/services/editor-handler";
import { IndexedDB } from "@/services/indexed-db";
import { Project } from "@/types/project";
import { faGear, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@monaco-editor/react";
import { useContext, useEffect } from "react";
import SchemaGeneratorPopup from "./popups";

const editorHandler = new EditorHandler();
const indexedDB = new IndexedDB();

export default function CodeEditor() {
    const {activeTab, setActiveTab, tabs, currentProject, setCurrentProject, popupStatuses, setPopupStatuses} = useContext(WorkbenchContext);
    useEffect(() => {
        indexedDB.getActiveProject().then((val) => setCurrentProject(val))
    },[]);
    return (
        <div className="w-[40%] h-full">
            <div className="flex flex-col w-full h-full bg-[#1e1e1e] text-white">
                <div className="flex bg-[#2d2d2d] border-b border-gray-700 text-sm">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 border-r border-gray-700 cursor-pointer flex gap-2 items-center
              ${activeTab === tab
                                    ? "bg-[#1e1e1e] text-white"
                                    : "bg-[#2d2d2d] text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab}
                            {tab === editorHandler.JSON_SCHEMA_TAB && <FontAwesomeIcon 
                                icon={currentProject?.isSchemaLocked ? faLock : faLockOpen} 
                                className="cursor-pointer"
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    if (currentProject) {
                                        await editorHandler.toggleSchemaLock(currentProject, setCurrentProject);
                                    }
                                }}
                            />}
                            {tab === editorHandler.JSON_SCHEMA_TAB && <FontAwesomeIcon 
                                icon={faGear} 
                                className="cursor-pointer" 
                                onClick={() => editorHandler.openSchemaGeneratorPopup(popupStatuses, setPopupStatuses)}
                            />}
                        </div>
                    ))}
                </div>
                <Editor
                    key={activeTab}
                    value={currentProject?.tabs[activeTab]}
                    onChange={async (value: string | undefined) => {
                        let activeProject = currentProject as Project;
                        return await editorHandler.handleEditorChange(value, activeTab, activeProject, setCurrentProject)
                    }}
                    defaultLanguage="json"
                    defaultValue={"[\n  {\n    \"your-key\": \"your-value\"\n  }\n]"}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        readOnly: activeTab === editorHandler.JSON_SCHEMA_TAB? currentProject?.isSchemaLocked : false,
                        lineNumbers: "on",
                        renderLineHighlight: "line",
                        selectionHighlight: true
                    }}
                />
            </div>
            <SchemaGeneratorPopup isOpen={popupStatuses.schemaGeneratorPopup}/>
        </div>
    )
}