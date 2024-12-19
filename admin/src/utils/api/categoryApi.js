import axiosInstance from '../../axios'

export const getCategories = ()=>{ return axiosInstance.get(`/category`)}
export const addCategory = (datas)=>{ return axiosInstance.post(`/category`,datas)}

