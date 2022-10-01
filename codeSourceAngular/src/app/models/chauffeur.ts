import { Employees } from './employees';
export class Chauffeur {


    constructor(
        public _id: Object,
        public nom: string,
        public prenom: string,
        public adresse: string,
        public photo: string,
        public disponibilite: boolean,
        public permisExp:  Date ,
        public permis: String ,
        public password: String ,
        public telephone: String 
        ){

    }

}
