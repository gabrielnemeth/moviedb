import { Department } from './credits';

export interface Crew {
    department?: Department;
    job?: Job;
    credit_id: string;
    id: number;
    name: string;
    profile_path?: string;
}

export enum Job {
    Director = 'Director',
    DirectorOfPhotography = 'Director of Photography',
    Editor = 'Editor',
    Writer = 'Writer',
}
