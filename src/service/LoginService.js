import sendRequest from "../axios";

const LOGIN_API = ""
const  LoginService = () => {
    function doLogin(data) {
        sendRequest({METHOD:'POST',PATH:LOGIN_API}, data);
    }

    return Object.freeze({
        doLogin,
    });
}
export default LoginService;