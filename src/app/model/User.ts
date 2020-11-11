export class UserModel {
_id: string;
firstName: string;
lastName: string;
userName: string;
email : string;
password: string;

constructor() {
	this._id = null;
	this.firstName = null;
	this.lastName = null;
	this.userName = null;
	this.email = null;
	this.password = null;
}

setId(_id: string): void {
	this._id = _id;
}

setFirstName(firstName: string): void {
	this.firstName = firstName;
}

setLastName(lastName: string): void {
	this.lastName = lastName;
}

setUserName(userName: string): void {
	this.userName = userName;
}

setEmail(email: string): void {
	this.email = email;
}

setPassword(password: string): void {
	this.password = password;
}

getId(): string {
	return this._id;
}

getFirstName(): string {
	return this.firstName;
}

getLastName(): string {
	return this.lastName;
}

getUserName(): string {
	return this.userName;
}

getEmail(): string {
	return this.email;
}

getPassword(): string {
	return this.password;
}
}
