export type Project = {
    id: number,
    name: string,
    isNew: boolean,
    isSchemaLocked: boolean,
    tabs: Record<string,string>,
    lastUpdatedOn: Date
};