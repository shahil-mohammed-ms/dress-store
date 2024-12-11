'use client'
import axiosInstance from '../../axios';

export const getAddress = ()=>{ return axiosInstance.get(`/address`)}
export const addAddress = (address)=>{ return axiosInstance.post(`/address`,address)}
export const deleteAddress = (id)=>{ return axiosInstance.delete(`/address/${id}`)}
export const defaultAddress = (addressId)=>{ return axiosInstance.patch(`/address/setprimary`,{addressId:addressId})}

