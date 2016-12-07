export class User {
	private static _instance:User = new User();
	constructor() {
		if(User._instance) {
			throw "User class instance error";
		}
		User._instance  = this;
	}

	public static shareInstance():User {
		return User._instance;
	}

	public id:number;
	public nickname:string;
	public avatar:string;
	public phonenumber:string;
	public certification:string;

	setConfig(userConfig:Object) {
		User._instance.id = userConfig["id"];
		User._instance.nickname = userConfig["nickname"];
		User._instance.avatar = userConfig["avatar"];
		User._instance.phonenumber = userConfig["phonenumber"];
		User._instance.certification = userConfig["certification"];
	}


}