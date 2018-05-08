const login = (state = false, action) => {
    switch (action.type) {
        case "CHANGE_LOGIN_STATUS":
            return action.loginStatus;
        default:
            return state;
    }
}

export default login;