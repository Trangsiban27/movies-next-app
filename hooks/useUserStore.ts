import { getCurrent } from "@/services/authService";
import { create } from "zustand";

interface UserStore {
    isLoading: boolean,
    user: any,
    fetchUser: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
    isLoading: false,
    user: null,
    fetchUser: async () => {
        set({isLoading: true})

        try {
            const res = await getCurrent()
            
            set({user: res, isLoading: false})
        } catch (err) {
            console.log('err: ', err)
            set({isLoading: false})
        }
    }
}))