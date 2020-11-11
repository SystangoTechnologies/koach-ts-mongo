import { DatabaseConfigurationManager } from '../../DatabaseConfigurationManager';
import configuration from '../../../../resources/config';
export default class CreateDatabaseConnection {
	connect():Promise<any> {
		const databaseConfigurationManager: DatabaseConfigurationManager = new DatabaseConfigurationManager(configuration.database);
		return databaseConfigurationManager.connect();
	}
}
