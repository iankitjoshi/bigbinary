import { apiGet } from "../../Utils/axios";

export function getLaunchesAPI(paramData) {
    const { value = '', data = {} } = paramData
    let payload = {
        start: data && data.startDate || '',
        end: data && data.endDate || '',
    }

    const launchFilter = filter => ({
        all: '',
        upcoming: '/upcoming',
        success: "?id=true&launch_success=true",
        failed: "?id=true&launch_success=false",
    }[filter] || '')

    return apiGet(`/launches${launchFilter(value)}`, payload)
}
