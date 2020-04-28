export class User {
    
    constructor(private id:number,private name:string, private jwtToken:string){

    }

    get userId():number{
        return this.id;
    }

    get userName():string{
        return this.name;
    }

    get userjwtToken():string{
        return this.jwtToken
    }

    set userjwtToken(jwtToken:string){
        this.jwtToken = jwtToken;
    } 
}