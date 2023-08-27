import axios, {AxiosResponse} from "axios";
import {baseURL} from "../constants/urls";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const axiosService = axios.create({baseURL});

axiosService.defaults.headers['x-api-key'] = process.env.REACT_API_KEY;

export type {
    IRes,
}

export {
    axiosService,
}