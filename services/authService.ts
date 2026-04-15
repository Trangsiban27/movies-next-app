'use client'
import apiClient from "@/lib/axios.config"
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const loginWithTMDB = async () => {
    try {
        const res = await axios.get(`/api/auth/login`)

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const createSessionId = async (requestToken: string) => {
    try {
        const res = await axios.post(`/api/auth/session`, {
            request_token: requestToken
        })

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const getCurrent = async () => {
    try {
        const res = await axios.get('/api/auth/me')

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}