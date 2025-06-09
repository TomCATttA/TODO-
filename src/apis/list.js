import httpInstance from "../utils/http";

export const useListApi = ({gid,lid})=>{
    return httpInstance({
        url:'/getList',
        method:'POST',
        data:{
            gid,
            lid
        }
    })
}