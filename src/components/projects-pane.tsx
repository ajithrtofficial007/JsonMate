"use client";

import { WorkbenchContext } from "@/context/workbench";
import { IndexedDB } from "@/services/indexed-db";
import { Project } from "@/types/project";
import { useContext } from "react";

var indexedDb = new IndexedDB();

export default function ProjectsPane() {
    const { isSidebarOpen, setCurrentProject, currentProject, projects, loadProjects } = useContext(WorkbenchContext);
    const createDefaultProject = async () => {
        var newProject = await indexedDb.createNewProject("Untitled");
        setCurrentProject(newProject);
        loadProjects();
    };

    return (
        <>
            {isSidebarOpen && <div className="bg-amber-100 h-full w-[15%] p-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded inline-flex items-center" 
                    onClick={createDefaultProject}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>New Project</span>
                </button>
                <section>
                    {projects && projects
                        .sort((a, b) => new Date(b.lastUpdatedOn).getTime() - new Date(a.lastUpdatedOn).getTime())
                        .map(element => (
                            <div className={"p-1 cursor-pointer " + (currentProject?.id === element.id ? 'bg-amber-500' : '')} 
                                key={element.id} 
                                onClick={async () => {
                                    var selectedProject = projects.find(x => x.id === element.id) as Project;
                                    setCurrentProject(selectedProject);
                                    await indexedDb.setActiveProjectId(selectedProject.id)
                                }}
                            >
                                {element.name}
                            </div>
                    ))}
                </section>
            </div>}
        </>
    )
}