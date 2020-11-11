import mongoose from 'mongoose';
export class DatabaseConfigurationManager {
db: any = {};

modelDirPath: string;

constructor(modelDirPath: string) {
	this.modelDirPath = modelDirPath;
}

connect(): any {
	mongoose.connect(this.modelDirPath, { useNewUrlParser: true, useUnifiedTopology: true });
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Unable to connect to the database..'));
	db.once('open', function() {
		console.log('DB Connection has been established successfully..');
	});
	this.db = db;
	return this.db;
}
}
