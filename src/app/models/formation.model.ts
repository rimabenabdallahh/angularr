export class Formation{
    id:string=""
    code :string="";
    theme :string="";
    debut :Date=new Date();
    fin :Date=new Date();
    duree :string="";
    cout:string="";
    lien:string="";
    formateur:ItemModel=new ItemModel()
    nmbr:number=0;

}
export class ItemModel{
    id:any;
    name:string=""
}