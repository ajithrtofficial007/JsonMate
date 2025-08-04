import { Project } from "@/types/project";
import { Dispatch, SetStateAction } from "react";

export interface ContextItems {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
    currentProject: Project | null,
    setCurrentProject: Dispatch<SetStateAction<Project | null>>,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>,
    tabs: string[],
    projects: Project[],
    popupStatuses: PopupStates,
    setPopupStatuses: Dispatch<SetStateAction<PopupStates>>,
    loadProjects: () => void
}