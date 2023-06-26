import axios from "axios";
import { create } from "zustand";
import useDefaultStore from "./useDefaultStore";
import { toast } from "react-toastify";
import _ from "lodash";

export interface GuestStore {
    guest: {
        id?: string;
        name: string;
        email: string;
        phone: string;
        location: string;
    };
    data: any[];
    table: any;
    createGuest: () => Promise<void>;
    deleteRows: (row: any | null) => Promise<void>;
}

export const useGuestStore = create<GuestStore>((set, get) => ({
    guest: {
        id: '',
        name: '',
        email: '',
        phone: '',
        location: ''
    },
    data: [],
    table: null,
    deleteRows: async (row) => {
        let id: any;
        if (row) {
            set((state) => {
                const data = state.data.filter((item) => item.id!== row.id);
                return { data };
            });
        }
        
        const selected = get().table.getSelectedRowModel().rows.map((row: any) => {
          return get().data.find((item) => item.id === row.original.id);
        });
        console.log(selected, "selected");
    
        try {
            id = toast('Hang on, deleting right now...')
            const {data} = await axios({
                method: "POST",
                url: `/api/deleteGuest`,
                data: selected.length === 0 ? row : selected
            })
            
            const filteredData = get().data.filter((item) => {
                return !selected.find((row: any) => row?.id === item.id);
              });

            console.log(data, 'getting response from server');

            useGuestStore.setState({
                data: filteredData,
              }); 

              toast.update(id, { render: data.data.message, type: "success", isLoading: false });
        } catch (err: any) {
            console.error(err);

            toast.update(id, { render: err.response.data.message, type: "success", isLoading: false });
        }
        get().table.setRowSelection({});
      },
    createGuest: async () => {
        let id: any;

        if (get().guest.name !== '') {
            id = toast('Hang on, we are processing this...')
        }
        try {
            if (get().guest.name === '') {
                toast.warn('Please complete all the fields!')
            } else {
                const { data } = await axios({
                    method: 'post',
                        url: '/api/guests',
                        data: get().guest,
                })
                console.log(data);
                set((state) => ({
                    data: [
                        ...state.data,
                        data.data.data
                    ]
                }))
                toast.update(id, { render: data.data.message, type: "success", isLoading: false });
            }
            
        } catch (err: any) {
            console.error(err);
            toast.update(id, { render: err.response.data.message, type: "error", isLoading: false });
        } finally {
            useDefaultStore.setState({
                loading: false
            })
        }
        
    }
}))

export default useGuestStore;