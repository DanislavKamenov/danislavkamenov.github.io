let webApi = (function () {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_ID = 'kid_SyF5rJe5f';
    const APP_SECRET = 'd6fbe5997a694848a60fe644c2cd7d2d';
    const BASE_64 = btoa(APP_ID + ':' + APP_SECRET);
    let authHeaders = {
        default: {Authorization: 'Basic ' + BASE_64},
        user: {Authorization: `Kinvey ${sessionStorage.getItem('authToken')}`}
    };
    const ACTIONS = {
        register: BASE_URL + 'user/' + APP_ID + '/',
        login: BASE_URL + 'user/' + APP_ID + '/login',
        logout: BASE_URL + 'user/' + APP_ID + '/_logout',
        accessCollection: BASE_URL + 'appdata/' + APP_ID + '/prodavachnik'
    };
    
    function registerUser() {
        let username = $('#formRegister').find('input[name=username]').val();
        let password = $('#formRegister').find('input[name=passwd]').val();

        sendRequest('POST', ACTIONS.register, authHeaders.default, {username, password})
            .then((res) => signInUser(res, 'Registration successful.'))
            .catch(handleAjaxError)
    }
    
    function loginUser() {
        let username = $('#formLogin').find('input[name=username]').val();
        let password = $('#formLogin').find('input[name=passwd]').val();

        sendRequest('POST', ACTIONS.login, authHeaders.default, {username, password})
            .then((res) => signInUser(res, 'LogIn successful.'))
            .catch(handleAjaxError);
    }
    
    function logOutUser() {
        sendRequest('POST', ACTIONS.logout, authHeaders.user)
            .then(() => signOutUser('logOut successful.'))
            .catch(handleAjaxError);
    }

    function signInUser(res, message) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authToken', res._kmd.authtoken);
        sessionStorage.setItem('userId', res._id);
        authHeaders.user = {Authorization: `Kinvey ${sessionStorage.getItem('authToken')}`};

        showMenuLinks();
        showHomeView();
        showInfo(message);
    }

    function signOutUser (message) {
        sessionStorage.clear();
        showMenuLinks();
        showHomeView();
        showInfo(message);
    }
    
    function sendRequest(method, url, headers, data) {
        return $.ajax({
            method,
            url,
            headers,
            data
        });
    }

    function handleAjaxError(err) {
        let errorMsg = JSON.stringify(err);
        if (err.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (err.responseJSON && err.responseJSON.description)
            errorMsg = err.responseJSON.description;
        showError(errorMsg);
    }

    return {registerUser, loginUser, logOutUser, sendRequest, handleAjaxError, authHeaders, ACTIONS};
})();