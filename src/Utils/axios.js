import axios from "axios";
import qs from "querystring";

export function generateUrl(path) {
    return 'https://api.spacexdata.com/v3' + path;
}

export function apiReq(
    endPoint,
    data,
    method,
    headers,
    config = {},
) {
    return new Promise((res, rej) => {
        headers = { ...headers };

        if (method == 'get' || method == 'delete') {
            data = {
                params: data,
                headers,
            }
        }

        let updatedData = data instanceof FormData ? data : { ...data };
        axios[method](endPoint, updatedData, { headers, ...config })
            .then((result) => {
                let { data: resData, status } = result;
                if (status === 200) {
                    return res(resData);
                }
            })
            .catch((err) => {
                const errData = err && err.response && err.response.data || {};
                return rej(errData)
            });
    });
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
    return apiReq(generateUrl(endPoint), data, "get", headers, requestOptions);
}
