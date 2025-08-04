"use client";

import { ContextItems } from "@/interfaces/context-items";
import { EditorHandler } from "@/services/editor-handler";
import { IndexedDB } from "@/services/indexed-db";
import { Project } from "@/types/project";
import { createContext, useEffect, useState } from "react";

var indexedDB = new IndexedDB();
var editorHandler = new EditorHandler();

export const WorkbenchContext = createContext<ContextItems>({
    isSidebarOpen: true,
    setIsSidebarOpen: () => { },
    currentProject: null,
    setCurrentProject: () => { },
    activeTab: editorHandler.USER_INPUT_JSON_TAB,
    setActiveTab: () => { },
    tabs: [editorHandler.USER_INPUT_JSON_TAB, editorHandler.JSON_SCHEMA_TAB],
    projects: [],
    popupStatuses: {
        schemaGeneratorPopup: false
    },
    setPopupStatuses: () => { },
    loadProjects: () => { }
});

export function WorkbenchContextProvider({ children }: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState<string>(editorHandler.USER_INPUT_JSON_TAB);
    const [projects, setProjects] = useState<Project[]>([]);
    const [popupStatuses, setPopupStatuses] = useState<PopupStates>({schemaGeneratorPopup: false});
    const tabs = [editorHandler.USER_INPUT_JSON_TAB, editorHandler.JSON_SCHEMA_TAB];
    
    const loadProjects = async () => {
        const allProjects = await indexedDB.getAllProjects();
        if(!allProjects){
            var newProject = await indexedDB.createNewProject("Untitled");
            setCurrentProject(newProject);
            setProjects([newProject]);
        }
        else
            setProjects(allProjects);
    }
    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <WorkbenchContext.Provider value={{ isSidebarOpen, setIsSidebarOpen,
            currentProject, setCurrentProject, 
            activeTab, setActiveTab, 
            tabs, projects, popupStatuses, setPopupStatuses, loadProjects }}>
            {children}
        </WorkbenchContext.Provider>
    )
}