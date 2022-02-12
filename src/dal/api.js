import axios from "axios";

export const instance = axios.create({
    baseURL: `/api`,
})
export const authApi = {
    login(email, password, passwordConfirmation) {
        return instance
            .post(`/login`, {email, password, passwordConfirmation})
            .then((response) => {
                console.log(response)
                return response.data
            })
    },
    registration(email, password, passwordConfirmation) {
        return instance
            .post(`/registration`, {email, password, passwordConfirmation})
            .then((response) => {
                console.log(response)
                return response.data
            })
    },
    changePassword(email, password, passwordConfirmation) {
        return instance
            .post(`/changePassword`, {email, password, passwordConfirmation})
            .then((response) => {
                console.log(response)
                return response.data
            })
    },
    changePasswordR() {
        return instance
            .get(`/registration`)
            .then((response) => {
                console.log(response)   
                return response.data
            })
    },
}