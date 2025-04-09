import 'server-only';

import { paramsToUrlString } from "@/infrastructure/tools/Url";
import { METHODS, Products, Product, Users, LoginType } from "./Types";
import APIError from "./APIError";

const DOMAIN = 'https://dummyjson.com';

const httpRequest = async <T>(method: METHODS, url: string, params?: object | string): Promise<T> => {
  try {
    const queryString = params && method === METHODS.GET ? `?${paramsToUrlString(params)}` : '';
    const fetchURL = DOMAIN + url + queryString;
    const fetchParams: RequestInit = { method };
    if (method === METHODS.POST || method === METHODS.PUT) {
      fetchParams.headers = { 'Content-Type': 'application/json' };
      fetchParams.body = params ? JSON.stringify(params) : '';
      fetchParams.credentials = 'include';
    };
    
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

const searchProducts = async (params?: object | string) => {
  return GET<Products>('/products/search', params);
};

const getProducts = async (params?: object | string) => {
  let isSearch = false;
  if (typeof params === 'string') {
    const searchParams = new URLSearchParams(params);
    isSearch = searchParams.has('q');

  } else if (params && 'q' in params) {
    isSearch = true;
  }

  if (isSearch) {
    return searchProducts(params);
  }
  return GET<Products>('/products', params);
};

const getProduct = async (id: number) => {
  return GET<Product>(`/products/${id}`);
};

const searchUsers = async (params?: object | string) => {
  return GET<Users>('/users/search', params);
};

const getUsers = async (params?: object | string) => {
  let isSearch = false;
  if (typeof params === 'string') {
    const searchParams = new URLSearchParams(params);
    isSearch = searchParams.has('q');

  } else if (params && 'q' in params) {
    isSearch = true;
  }

  if (isSearch) {
    return searchUsers(params);
  }
  return GET<Users>('/users', params);
};

const loginUser = (params: LoginType) => {
  return POST<LoginType>('/auth/login', {
    username: 'emilys',
    password: 'emilyspass'
  });
};

const DataService = {
  getProducts,
  getProduct,
  getUsers,
  loginUser
};

export default DataService;
