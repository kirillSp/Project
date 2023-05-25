import axios from "axios";
import { ProfileType } from "../Redux/profileReducer";

let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "2affb19e-3c29-41dc-8c86-f9da87d4bf78"
    }

});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(id: number) {
        return instance.delete(`follow/${id}`);
    },

    unfollow(id: number) {
        return instance.post(`follow/${id}`);
    },

    profile(userId: number) {
        console.warn("Old method, please use profileAPI");
        return profileAPI.profile(userId);
    }
};

export const profileAPI = {
    profile(userId: number) {
        return instance.get(`profile/${userId}`);
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, { status });
    },

    sendPhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put('profile/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    },

    sendUpdatedDataProfile(data: ProfileType) {
        return instance.put("profile", data);
    }
};

export const enum ResultCodeEnum {
    success = 0,
    error = 1,
}

export const enum ResultCodeCaptchaEnum {
    captchaIsRequired = 10
}

type AuthType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
};

type LoginType = {
    resultCode: ResultCodeEnum | ResultCodeCaptchaEnum
    messages: Array<string>
    data: {
      userId: number
    }
};

export const authAPI = {
    auth() {
        return instance.get<AuthType>("auth/me");
    },

    login(email: string, password: string, remmemberMe = false, captcha: undefined | string = undefined ) {
        return instance.post<LoginType>("auth/login", {email, password, remmemberMe, captcha});
    },

    logout() {
        return instance.delete("auth/login");
    }
};

export const securityAPI = {
    getCaptcha() {
        return instance.get("security/get-captcha-url");
    }
}