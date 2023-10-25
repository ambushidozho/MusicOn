import IModel from '../IModel/IModel';
import Ajax from '../../Modules/Ajax/Ajax';
import { Callback, User } from '../../types';
import hosts from '../../HostConsts';
import EventDispatcher from '../../Modules/EventDispatcher/EventDispatcher';
import paths from '../../Modules/Router/RouterPaths';


/** Class representing an UserModel. */
class UserModel extends IModel {

    private currentUser: User | null;

    /**
     * Constructor for the UserModel.
     */
    public constructor() {
        super();
        this.currentUser = null;
    }

    /**
     * Get the current user.
     * @return {User | null} 
     */
    public getCurrentUser(): User | null {
        return this.currentUser;
    }

     /**
     * Signs in a user.
     *
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @param {Callback} callback - The callback function.
     * @return {void}
     */
    public signInUser(email: string, password: string, callback: Callback): void {
        Ajax.post(
			hosts.HOST + hosts.PORT + '/api/v1/login',
			{ email, password },
	    )
			.then(({ ok, status, responseBody }) => {
				if (status === 200) {
                    this.getUser();
                    callback(paths.feedAll);
					return;
				} 
			})
			.catch((error) => {
				throw error;
			});
    }

     /**
     * Sign up a user.
     *
     * @param {string} email - The user's email.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @param {string} birthDate - The user's birth date.
     * @param {Callback} callback - A callback function.
     * @return {void}
     */
    public signUpUser(email: string, username: string, password: string, birthDate: string, callback: Callback): void {
        Ajax.post(
        hosts.HOST + hosts.PORT + '/api/v1/sign_up',
        { email, username, password, birthDate },
        )
        .then(({ ok, status, responseBody }) => {
            if (status === 200) {
                this.getUser();
                callback(paths.feedAll);
                return;
            } else if (status === 400) {
                return;
            } else if (status === 409) {
                return;
            }
        })
        .catch((error) => {
            throw error;
        });

    } 


    /**
     * Logs out the user by making a POST request to the logout endpoint.
     *
     * @return {void} No return value.
     */
    public logoutUser(): void {
        Ajax.post(
        hosts.HOST + hosts.PORT + '/api/v1/logout',
        {},
	    )
		.then(({ status }) => {
			if (status === 200) {
                EventDispatcher.emit('user-changed', this.currentUser); 
				return;
			}
		})
		.catch((error) => {
			throw error;
		});
    }

    /**
     * Authenticates the user using a cookie.
     *
     * @return {void} No return value.
     */
    public authUserByCookie(): void {
        Ajax.get( hosts.HOST + hosts.PORT + '/api/v1/auth')
		.then(({ status, responseBody }) => {
			if (status === 200) {
                this.getUser();
                return;
			}	
		})
		.catch((error) => {
			throw error;
		});
    }

    /**
     * Retrieves the user data from the server.
     *
     * @private
     * @return {void}
     */
    private getUser(): void {
        Ajax.get( hosts.HOST + hosts.PORT + '/api/v1/me')
		.then(({ ok, status, responseBody }) => {
			if (status === 200) {
                this.currentUser = {
                    email: responseBody.email,
                    username: responseBody.username,
                    avatar: responseBody.avatar
                }
                EventDispatcher.emit('user-changed', this.currentUser);
			}	
		})
		.catch((error) => {
			throw error;
		});
    }
}

export default UserModel;