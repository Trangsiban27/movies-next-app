'use client'
import apiClient from "@/lib/axios.config"
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const loginWithTMDB = async () => {
    try {
        const res = await apiClient.get(`${BASE_URL}/authentication/token/new`)

        return res?.data
    } catch (err) {
        console.log('err: ', err)
    }
}

export const createSessionId = async (requestToken: string) => {
    try {
        const res = await apiClient.post(`${BASE_URL}/authentication/session/new`, {
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