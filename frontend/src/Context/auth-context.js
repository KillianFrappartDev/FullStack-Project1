import { createContext } from 'react';

const AuthContext = createContext({
    isLogged: false,
    token: null,
    userName: null,
    userId: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;