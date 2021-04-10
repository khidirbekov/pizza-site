import axios, { AxiosInstance } from 'axios'

const baseURL = process.env.baseURL
const service: AxiosInstance = axios.create({
  baseURL,
})

export default service