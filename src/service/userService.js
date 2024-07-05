import axios from "axios";
function userLoginReq(username, password){
    return axios.post('http://localhost:8080/api/login',{
        username: username,
        password: password
    }).then(res => {
        return res.data;
    })
}

export {
    userLoginReq
}