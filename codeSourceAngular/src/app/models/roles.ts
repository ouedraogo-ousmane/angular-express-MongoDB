export class Roles{

    public _id:object;
    public name:string;
    public operations:[{write:boolean,read:boolean,update:boolean}];
}