"use client";

import Playground from "@/components/playground";
import Navbar from "@/components/navbar";
import ProjectsPane from "@/components/projects-pane";
import { WorkbenchContextProvider } from "@/context/workbench";

export default function WorkbenchPage() {
    return (
        <WorkbenchContextProvider>
            <div className="relative w-full h-full">
                <Navbar />
                <div className="flex w-full h-[95%]">
                    <ProjectsPane />
                    <Playground />                    
                </div>
            </div>
        </WorkbenchContextProvider>
    )
}