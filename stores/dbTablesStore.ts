import { DbTableType } from '@/types'
import { create } from 'zustand'

const useDbTableStore = create((set) => ({
    tables: [] as DbTableType[],
    addTable: () => set((state: DbTableType[], table: DbTableType) => ({ tables: [...state, table] })),

}))

export default useDbTableStore