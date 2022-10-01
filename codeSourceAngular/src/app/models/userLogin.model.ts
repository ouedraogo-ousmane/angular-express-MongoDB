interface ILogInfo {
    userEmailOrPhone:string;
    userPassword:string;
}
export class LogInfo implements ILogInfo{

  constructor(
    public  userEmailOrPhone:string,

    public userPassword:string
    ){}

}
