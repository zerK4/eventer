import { create } from "zustand";

export interface DefaultStore {
    loading: boolean;
}

export const useDefaultStore = create<DefaultStore>((set, get) => ({
    loading: false
}))

export default useDefaultStore;