import { Project } from "@/types/project";
import { get, set } from 'idb-keyval';

export class IndexedDB {
    readonly isNewUserKeyName: string = "IsNewUser";
    readonly activeProjectIdKeyName: string = "CurrentActiveProjectId"
    readonly projectsKeyName: string = "Projects"

    // current active project id to load the project workbench initally
    async setActiveProjectId(id: number): Promise<void> {
        await set(this.activeProjectIdKeyName, id)
    }
    async getActiveProject(): Promise<Project | null> {
        let projectId = await get(this.activeProjectIdKeyName);
        if (projectId != null)
            return await this.getProjectInfo(projectId);
        return null;
    }

    // IsNewUser variable to give inital instructions about the application
    async setIsNewUser(bool: boolean): Promise<void> {
        await set(this.isNewUserKeyName, bool);
    }
    async getIsNewUser(): Promise<boolean> {
        let isNewUser: boolean | undefined = await get(this.isNewUserKeyName);
        if (isNewUser == undefined)
            return true;
        else
            return isNewUser;
    }

    // total Projects count to assign Ids to new projects and for counting
    async getProjectsCount(): Promise<number> {
        let projects: Project[] | undefined = await this.getAllProjects();
        if (projects == undefined)
            return 0;
        else
            return projects.length;
    }

    // core data structure for project info
    async getAllProjects(): Promise<Project[] | undefined> {
        return await get(`Projects`);
    }
    private async setAllProjects(projects: Project[]): Promise<void> {
        await set(`Projects`, projects);
    }
    async getProjectInfo(projectId: number): Promise<Project | null> {
        let projects: Project[] | undefined = await this.getAllProjects();
        let requiredProject = projects?.find(x => x.id === projectId);
        if (!requiredProject)
            return null;
        else
            return requiredProject
    }
    async setProjectInfo(project: Project): Promise<void> {
        var projects: Project[] | undefined = await this.getAllProjects();
        if (!projects)
            await set(`Projects`, [project]);
        else {
            var requiredProject = projects.find(x => x.id === project.id);
            if (requiredProject) {
                let indexOfRequriedProject = projects.indexOf(requiredProject);
                projects[indexOfRequriedProject] = project;
            }
            else
                projects = [...projects, project];
            await this.setAllProjects(projects);
        }
    }
    async createNewProject(projectName: string): Promise<Project> {
        var newProjectId = await this.getProjectsCount() + 1;
        var newProject: Project = {
            id: newProjectId,
            name: `${projectName}-${newProjectId}`,
            isNew: true,
            isSchemaLocked: false,
            tabs: {
                "input-json": "[\n  {\n    \"your-key\": \"your-value\"\n  }\n]",
                "json-schema": "[\n  {\n    \"your-key\": \"your-value\"\n  }\n]"
            },
            lastUpdatedOn: new Date(),
        }
        await this.setProjectInfo(newProject);
        await this.setActiveProjectId(newProject.id)
        return newProject
    }
}