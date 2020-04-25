import React from "react"

// real functionality for a context is provided by a provider compoent
export const AuthContext = React.createContext({
    isAuthenticated: false,
    webToken: null,
    authenticate: (username, password) => {},
    signout: () => {}
})