import { APPWRITE_URL, PROJECT_ID } from "@/lib/const";
import { Account, Client, ID } from "appwrite";
import axios from "axios";
import { create } from "zustand";

export interface EventStore {
    event?: {
        name?: string;
        type?: string;
        code?: string;
        location?: string;
        guests?: any[];
        providers?: any[];
        creator?: string;
    };
    createEvent: (email: string) => Promise<void>;
    createAccount: () => void;
}

const client = new Client()
    .setEndpoint(APPWRITE_URL)
    .setProject(PROJECT_ID);

export const useEventStore = create<EventStore>((set, get) => ({
    event: {},
    createAccount: () => {
        const account = new Account(client);

        // Register User
        account.create(
            ID.unique(),
            'me@example.com',
            'password',
            'Jane Doe'
        ).then(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    },
    createEvent: async (email) => {
        const {data} = await axios({
            method: 'POST',
            url: `/api/events/create`,
            data: {
                event: get().event,
                creator: email
            }
        })

        console.log(data);
        
    }
}))

export default useEventStore;