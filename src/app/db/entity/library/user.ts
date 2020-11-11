import config from '../../../../resources/config';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserInstance extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    email : string;
    password: string;
	_id?: string;
	validatePassword(password: string): Promise<boolean>;
	generateToken(): string;
	save(): Promise<UserInstance>;
}
const UserSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true},
	userName: { type: String, required: true, unique: true},
	email: { type: String, required: true, unique: true},
	password: { type: String, required: true}
},
{ timestamps: true });

UserSchema.pre<UserInstance>('save', function preSave (next: any) {
	try {
		// const user = this
		if (!this.isModified('password')) {
			return next();
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(this.password, salt);
		this.password = hash;
		next(null);
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.validatePassword = function validatePassword(password: string) {
	// const user = this
	return new Promise((resolve) => {
		try {
			const isMatch = bcrypt.compareSync(password, this.password);
			resolve(isMatch);
		} catch (error) {
			console.log('error');
			resolve(false);
		}
	});
};

UserSchema.methods.generateToken = function generateToken () {
	// const user = this
	return jwt.sign({
		id: this._id
	}, config.token);
};

export default mongoose.model<UserInstance>('User', UserSchema);
