
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://techfood-api.fr',
});

const login = (data) => {
    return instance.post('/api/auth', data);
}

const register = (data, language) => {
    return instance.post('/api/register', data, {
        headers: {
            'X-LOCALE': language
        }
    });
}

const forgotPassword = (data) => {
    return instance.post('/api/password/forgot', data);
}

const contact = (data, token) => {
    return instance.post('/api/contact', data, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}

const sendLink = (data, token) => {
    return instance.post('/api/theme/send', data, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}

const getProfile = (token) => {
    return instance.get('/api/me', {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}

const updateProfile = (data, id, token, language) => {
    return instance.put(`/api/users/${id}`, data, {
        headers: {
            Authorization: `bearer ${token}`,
            'X-LOCALE': language
        }
    });
}

const updateSettings = (data, token) => {
    return instance.post('/api/password/change', data, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}

const getOrders = (token, userId, nextEndpoint) => {
    
    let endpoint = nextEndpoint ?? `/api/users/${userId}/orders`;

    return instance.get(endpoint, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}

const postOrder = (data, token) => {
    return instance.post('/api/orders', data, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    })
}

const refresh = (data) => {
    return instance.post('/api/auth/refresh', data);
}

const saveToken = (firebaseToken, token) => {
    return instance.post('/api/firebase/store', {firebaseToken}, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}


const removeToken = (token) => {
    return instance.post('/api/firebase/remove', null, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}

const updateLocale = (data, token) => {
    return instance.put('/api/locale', data, {
        headers: {
            Authorization: `bearer ${token}` 
        }
    });
}


export {
    login, register, 
    forgotPassword,
    contact,
    getProfile, updateProfile,
    refresh, updateSettings,
    getOrders,
    postOrder,
    saveToken,
    removeToken,
    sendLink,
    updateLocale
}