import { getLaunchesAPI } from './api'

export function GetLaunches(data) {
    return dispatch => {
        dispatch({
            type: GET_LAUNCH
        })
        return new Promise((resolve, reject) => {
            getLaunchesAPI(data).then(res => {
                dispatch({
                    type: GET_LAUNCH_SUCCESS,
                    payload: res || {}
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_LAUNCH_FAILED,
                        payload: {}
                    })
                    return reject(err)
                })
        })
    }
}

export const GET_LAUNCH = "GET_LAUNCH"
export const GET_LAUNCH_SUCCESS = "GET_LAUNCH_SUCCESS"
export const GET_LAUNCH_FAILED = "GET_LAUNCH_FAILED"