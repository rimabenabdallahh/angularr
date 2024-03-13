import { ItemModel } from "./formation.model";

export class Users{
    id? :string="";
    prenom :string="";
    nom :string="";
    email :string="";
    motDePasse :string="";
    adresse :string="";
    telephone :string="";
    role? :string="";
    nbr:number=0;
    client:ItemModel=new ItemModel()
}