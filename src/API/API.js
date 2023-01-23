import * as axios from "axios";

let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "2affb19e-3c29-41dc-8c86-f9da87d4bf78"
    }

});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(id) {
        return instance.delete(`follow/${id}`);
    },

    unfollow(id) {
        return instance.post(`follow/${id}`);
    },

    profile(userId) {
        console.warn("Old method, please use profileAPI");
        return profileAPI.profile(userId);
    }
};

export const profileAPI = {
    profile(userId) {
        return instance.get(`profile/${userId}`);
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status });
    },

    sendPhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put('profile/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
};

export const authAPI = {
    auth() {
        return instance.get("auth/me");
    },

    login(email, password, remmemberMe = false) {
        return instance.post("auth/login", {email, password, remmemberMe});
    },

    logout() {
        return instance.delete("auth/login");
    }
}