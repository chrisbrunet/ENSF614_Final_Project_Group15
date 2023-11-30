import AppContext from './AppContext';
import React, { useState } from 'react';

const AppState = (props) => {
    const usr = {
        accessToken: '',
        refreshToken: '',
        userId: '',
        fname: '',
        lname: '',
        accountId: 0,
        isAdmin: false};

    const [user, setUser] = useState(usr);
    const [userEmail, setUserEmail] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userSignedIn, setUserSignedIn] = useState(null);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                isSignedIn,
                setIsSignedIn,
                isModerator,
                setIsModerator,
                userEmail,
                setUserEmail,
                userSignedIn,
                setUserSignedIn,
                isAdmin,
                setIsAdmin,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;