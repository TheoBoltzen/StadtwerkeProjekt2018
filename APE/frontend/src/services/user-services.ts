import {apiURL} from "../constants";

const authHeader = () => {
    //returns header with jwt token
    let user = JSON.parse(localStorage.getItem('user') as any) //TODO: Remove any

    if(user && user.token) {
        return {'Authorization': user.token}
    }
    else {
        return {}
    }
}

export const login = (username: any, password: any) => { //TODO: Remove any
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    }

    return fetch(`${apiURL}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then((user: any) => { //TODO: Remove any
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const getAll = () => {
    const requestOptions: any = { //TODO: Remove any
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${apiURL}/users`, requestOptions).then(handleResponse)
}

export const getByID = (id:  any) => { //TODO: Remove any
    const requestOptions: any = { //TODO: Remove any
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${apiURL}/users/${id}`, requestOptions).then(handleResponse)
}

const handleResponse = (response: any) => { //TODO: Remove any
    return response.text().then((text: any) => { //TODO: Renove any
        const data = text && JSON.parse(text)

        if (!response.ok) {
            if (response.status === 401) {
                //auto logout
                logout()
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    })
}
