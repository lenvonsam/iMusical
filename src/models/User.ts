export class User {
	private static _instance:User = null;
	constructor() {
		if(User._instance) {
			alert('user class instance error');
			throw "User class instance error";
		}
		User._instance  = this;
	}

	public static shareInstance():User {
		if(User._instance==null) {
			User._instance = new User();
		}
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

	loginout() {
		User._instance = null;
	}

	isLogin():boolean {
		if(User._instance.id) {
			return true;
		} else {
			return false;
		}
	}

}