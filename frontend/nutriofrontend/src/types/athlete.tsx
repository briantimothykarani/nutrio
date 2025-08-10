export interface Athlete {
    id?: number;
    athlete: string;
    email: string;
    bday: number;
    institution: string;
    sex: 'M' | 'F';
    height: number;
    weight: number;
    about_athlete?: string;
}