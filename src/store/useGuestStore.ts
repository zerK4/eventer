import axios from "axios";
import { create } from "zustand";
import useDefaultStore from "./useDefaultStore";
import { toast } from "react-toastify";

export interface GuestStore {
    guest: {
        id?: string;
        name?: string;
        email: string;
        phone: string;
        location: string;
    };
    createGuest: () => Promise<void>;
}

export const useGuestStore = create<GuestStore>((set, get) => ({
    guest: {
        name: '',
        email: '',
        phone: '',
        location: '',
    },
    createGuest: async () => {
        const id = toast('Hang on, we are processing this...')
        try {
            const {data} = await axios({
                method: 'post',
                    url: '/api/guests',
                    data: get().guest,
            })
            console.log(data);
            toast.update(id, { render: "Huraaay, the guest was successfully created!", type: "success", isLoading: false });
        } catch (err) {
            console.log(err);
            toast.update(id, { render: "Oooops, something wrong happened, please try again!", type: "error", isLoading: false });
        } finally {
            useDefaultStore.setState({
                loading: false
            })
        }
        
    }
}))

export default useGuestStore;