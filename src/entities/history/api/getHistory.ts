import { api } from "@/shared/config/api"
export const getHistory = async (cursor: number | null = null)=> {
    const response = await api.get("api/histories",{
        params: {cursor}
        
    })
    return {
        histories:response.data.histories,
        nextCursor: response.data.nextCursor ?? null
    } 
}