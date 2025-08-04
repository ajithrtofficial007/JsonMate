import { Dispatch, SetStateAction, useEffect } from "react";
import { IndexedDB } from "./indexed-db";
import { JsonSchema } from "./json-schema";
import { Project } from "@/types/project";

export class EditorHandler {
    readonly indexedDbService = new IndexedDB();
    readonly jsonSchemaService = new JsonSchema();
    readonly USER_INPUT_JSON_TAB = "input-json";
    readonly JSON_SCHEMA_TAB = "json-schema";

    async toggleSchemaLock(currentProject: Project,
        setCurrentProject: Dispatch<SetStateAction<Project | null>>
    ) {
        const updatedProject = {
            ...currentProject,
            isSchemaLocked: !currentProject.isSchemaLocked,
        };
        
        await this.indexedDbService.setProjectInfo(updatedProject);
        setCurrentProject(updatedProject);
    }
    
    async handleEditorChange(value: string | undefined,
        activeTab: string,
        currentProject: Project,
        setCurrentProject: Dispatch<SetStateAction<Project | null>>
    ) {
        let project = currentProject;
        project.tabs[activeTab] = value ?? "";

        await this.indexedDbService.setProjectInfo(project);
        setCurrentProject(project);
    }

    public onCloseSchemaGeneratorPopup(
        popupStatuses: PopupStates,
        setIsPopupOpen: Dispatch<SetStateAction<PopupStates>>
    ){
        setIsPopupOpen({
            ...popupStatuses,
            schemaGeneratorPopup: false
        });
    }

    public openSchemaGeneratorPopup(
        popupStatuses: PopupStates,
        setIsPopupOpen: Dispatch<SetStateAction<PopupStates>>
    ){
        setIsPopupOpen({
            ...popupStatuses,
            schemaGeneratorPopup: true
        });
    }
    public onActionSchemaGeneratorPopup(
        jsonInput: string,
        currentProject: Project,
        setCurrentProject: Dispatch<SetStateAction<Project | null>>
    ) {
        if (jsonInput) {
            const generatedSchema = this.jsonSchemaService.generateSchemaFromInput(jsonInput);
            var updatedProject:Project = {
                ...currentProject,
                tabs: {
                    ...currentProject.tabs,
                    [this.JSON_SCHEMA_TAB]: generatedSchema
                }
            }
            this.indexedDbService.setProjectInfo(updatedProject);
            setCurrentProject(updatedProject);
        }
    }
}