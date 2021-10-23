import moment from 'moment'

export const getTimeStamps = (type = "pastMonth", reqStartDate = 0, reqEndDate = 0) => {
    let startDate = null;
    let endDate = null;

    switch (type) {
        case 'pastWeek':
            startDate = moment().subtract(1, 'weeks').startOf('isoWeek').valueOf()
            endDate = moment().subtract(1, 'weeks').endOf('isoWeek').valueOf()
            break;
        case 'pastMonth':
            startDate = moment().subtract(1, 'M').startOf('month').valueOf()
            endDate = moment().subtract(1, 'M').endOf('month').valueOf()
            break;
        case 'past3Months':
            startDate = moment().subtract(90, 'd').startOf('D').valueOf()
            endDate = moment().valueOf()
            break;
        case 'past6Months':
            startDate = moment().subtract(180, 'd').startOf('D').valueOf()
            endDate = moment().valueOf()
            break;
        case 'pastYear':
            startDate = moment().subtract(1, 'years').startOf('D').valueOf()
            endDate = moment().valueOf()
            break;
        case 'past2Year':
            startDate = moment().subtract(2, 'years').startOf('D').valueOf()
            endDate = moment().valueOf()
            break;
        case 'past5Year':
            startDate = moment().subtract(5, 'years').startOf('D').valueOf()
            endDate = moment().valueOf()
            break;
        case 'customDate':
            startDate = moment(reqStartDate).valueOf()
            endDate = moment(reqEndDate).valueOf()
            break;
        case 'all':
            startDate = 1020623400000
            endDate = moment().valueOf()
            break;

        default:
            startDate = moment().subtract(6, 'd').startOf('D').valueOf()
            endDate = moment().valueOf()
            break;
    }
    return { startDate, endDate }
}

export const FilterDate = [
    { label: 'Past Week', value: 'pastWeek' },
    { label: 'Past Month', value: 'pastMonth' },
    { label: 'Past 3 Months', value: 'past3Months' },
    { label: 'Past 6 Months', value: 'past6Months' },
    { label: 'Past Year', value: 'pastYear' },
    { label: 'Past 2 Years', value: 'past2Year' },
    { label: 'Past 5 Years', value: 'past5Year' },
    { label: 'All', value: 'all' },
    { label: 'Custom Date', value: 'customDate' },
]

export const statusFilterOptions = [
    { id: 1, label: 'All Launches', value: 'all' },
    { id: 2, label: 'Upcoming Launches', value: 'upcoming' },
    { id: 3, label: 'Successful Launches', value: 'success' },
    { id: 4, label: 'Failed Launches', value: 'failed' },
]

export function failedTimeFormat(data) {
    return moment(data).format('DD MMMM YYYY [at] HH:MM') || ''
}

export function timeFormat(data) {
    return moment(data).format('DD MMMM YYYY HH:MM') || ''
}