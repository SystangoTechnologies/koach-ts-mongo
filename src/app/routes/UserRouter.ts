import { RouterManager } from '../core/RouterManager';
import { UserController } from '../controller/UserController';
import { EnsureUser } from '../core/middleware/EnsureUser';
import UserValidator from '../validation/UserValidator';

const userRouterManager: RouterManager = new RouterManager('/users');
const userController: UserController = new UserController();
const userValidator: UserValidator = new UserValidator();
const ensureUserMiddleware: EnsureUser = new EnsureUser();

userRouterManager.post('/', userValidator.createUser, userController.createUser);

userRouterManager.post('/_login', userValidator.login, userController.login);

userRouterManager.get('/:userId', ensureUserMiddleware.ensureUser, userController.getUser);

userRouterManager.put('/:userId', ensureUserMiddleware.ensureUser, userValidator.updateUser, userController.updateUser);

userRouterManager.delete('/:userId', ensureUserMiddleware.ensureUser, userValidator.deleteUser, userController.deleteUser);

userRouterManager.patch('/_change-password', ensureUserMiddleware.ensureUser, userValidator.changePassword, userController.changePassword);

export default userRouterManager;
