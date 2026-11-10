
const api_url = 'https://dummyjson.com/'

export interface IQueryParams {
    limit?: number;
    skip?: number;
    select?: string;
    q?: string;
}

export interface IParams {
    method: 'POST' | 'GET' | 'DELETE',
    headers?: { 'Content-Type': 'application/json' },
    body?: string;
    credentials?: string;
}

export async function  httpCall<T>(url: string, queryParams: IQueryParams = {}, params: IParams = {method: 'GET'}): Promise<T | null> {
    
    const searchParams = (new URLSearchParams(queryParams)).toString();
    const _params = {headers: { 'Content-Type': 'application/json' }, ...params}
    return fetch(api_url + url + '?' + searchParams, _params)
    .then(res => res.json());
}
    
    