import {API_URL} from "./config";
import axios from "axios";
import {router} from "./router";

export default {
    methods: {
        getLocalStorageUsername() {
          return localStorage.username;
        },

        saveInLocalStorage(data) {
            localStorage.token = data.token;
            localStorage.username = data.username;

            if (localStorage.getItem(data.username + "-order") === null) {
                localStorage.setItem(data.username + "-order", "[]");
            }
        },

        logOut() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            router.push("/login");
        },

        apiGET(route, resolve, reject) {
            let token = localStorage.token;
            let config = {};

            if (token)
                config = {headers: {Authorization: token}};
            axios.get(API_URL + route, config)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    console.log(e);
                    if (e === null || !e.hasOwnProperty("response") || !e.response)
                        reject({response: {status: 500, data: {error: "unavailable server"}}});
                    else if (e.response.status === 401)
                        this.logOut();
                    else
                        reject(e);
                });
        },
        apiPOST(route, body, resolve, reject) {
            let token = localStorage.token;
            let config = {};

            if (token)
                config = {headers: {Authorization: token}};
            axios.post(API_URL + route, body, config)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    console.log(e);
                    if (e === null || !e.hasOwnProperty("response") || !e.response)
                        reject({response: {status: 500, data: {error: "unavailable server"}}});
                    else if (e.response.status === 401)
                        this.logOut();
                    else
                        reject(e);
                });
        },
        apiPATCH(route, body, resolve, reject) {
            let token = localStorage.token;
            let config = {};

            if (token)
                config = {headers: {Authorization: token}};
            axios.patch(API_URL + route, body, config)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    if (e === null || !e.hasOwnProperty("response") || !e.response)
                        reject({response: {status: 500, data: {error: "unavailable server"}}});
                    else if (e.response.status === 401)
                        this.logOut();
                    else
                        reject(e);
                });
        },
        apiDELETE(route, resolve, reject) {
            let token = localStorage.token;
            let config = {};

            if (token)
                config = {headers: {Authorization: token}};
            axios.delete(API_URL + route, config)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    if (e === null || !e.hasOwnProperty("response") || !e.response)
                        reject({response: {status: 500, data: {error: "unavailable server"}}});
                    else if (e.response.status === 401)
                        this.logOut();
                    else
                        reject(e);
                });
        }
    }
}