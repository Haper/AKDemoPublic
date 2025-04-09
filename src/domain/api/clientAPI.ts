import { paramsToUrlString } from "@/infrastructure/tools/Url";
import { METHODS, Products, Users } from "./Types";
import APIError from "./APIError";


const httpRequest = async <T>(method: METHODS, url: string, params?: object | string): Promise<T> => {
  try {
    const queryString = params && method === METHODS.GET ? `?${paramsToUrlString(params)}` : '';
    const fetchURL = url + queryString;
    const fetchParams: RequestInit = { method };

    if (method === METHODS.POST || method === METHODS.PUT) {
      fetchParams.headers = { 'Content-Type': 'application/json' };
      fetchParams.body = params ? JSON.stringify(params) : '';
    }

    const response = await fetch(fetchURL, fetchParams);
    if (!response.ok) {
      throw new APIError(response.statusText, response.status);
    }
    return response.json();

  } catch (error) {
    throw error;
  }
};

const GET = <T>(url: string, params?: object | string) => httpRequest<T>(METHODS.GET, url, params);
const POST = <T>(url: string, params: object) => httpRequest<T>(METHODS.POST, url, params);
const PUT = <T>(url: string, params: object) => httpRequest<T>(METHODS.PUT, url, params);
const DELETE = <T>(url: string) => httpRequest<T>(METHODS.DELETE, url);

const getProducts = (params?: object | string) => {
  return GET<Products>('/api/products', params);
};

const getUsers = (params?: object | string) => {
  return GET<Users>('/api/users', params);
};

const ClientAPI = {
  getProducts,
  getUsers
};

export default ClientAPI;
