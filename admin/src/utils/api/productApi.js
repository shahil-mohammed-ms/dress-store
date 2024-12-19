import axiosInstance from '../../axios'

export const getProducts = ()=>{ return axiosInstance.get(`/products`)}
export const getProductsAdmin = ()=>{ return axiosInstance.get(`/products/admin`)}
export const addProducts = (prods)=>{ return axiosInstance.post(`/products`,prods)}



