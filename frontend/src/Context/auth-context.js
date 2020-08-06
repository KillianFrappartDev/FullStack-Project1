import { createContext } from 'react';

const AuthContext = createContext({
    isLogged: false,
    token: null,
    userId: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;