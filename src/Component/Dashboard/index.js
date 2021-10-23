import React, { useState, Fragment } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router";
// Material UI
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Grid, FormControl, MenuItem, Paper, Select } from '@mui/material';
// Utils
import { statusFilterOptions, timeFormat, FilterDate, getTimeStamps, failedTimeFormat } from "Utils/utils";
// Action
import * as action from './actions'
// Moment
import moment from "moment";
// Common File
import Datepicker from "Common/Datepicker";
import CustomModal from "Common/CustomModal";
// Icons
import Logo from 'Assets/Images/Logo.svg'
import loader from 'Assets/Images/loader.svg'
import DateIcon from 'Assets/Images/DateIcon.svg'
import FilterIcon from 'Assets/Images/filterIcon.svg'
// View Modal
import LaunchView from "./launchView";

const tableHead = ['No:', 'Launched (UTC)', 'Location', 'Mission', 'Orbit', 'Launch Status', 'Rocket']

function Dashboard(props) {
    const dispatch = useDispatch()
    const paramData = useLocation().search;

    // Params Data
    const queryData = new URLSearchParams(paramData)
    const paramsStatus = queryData.get('status') || '';
    const paramsDateFilter = queryData.get('dateFilter') || '';
    const paramsStart = queryData.get('start') || '';
    const paramsEnd = queryData.get('end') || '';
    const paramsPage = queryData.get('page') || '';

    // State
    const [statusFilter, setStatusFilter] = useState(paramsStatus || 'all')
    const [dateFilter, setDateFilter] = useState(paramsDateFilter || 'all')
    const [startDate, setStartDate] = useState(paramsStart && moment(paramsStart))
    const [endDate, setEndDate] = useState(paramsEnd && moment(paramsEnd))
    const [focusedInput, setFocusedInput] = useState(false)
    const [launchDetails, setLaunchDetails] = useState({})
    const [openDetailModal, setOpenDetailModal] = useState(false)
    const [page, setPage] = useState(Number(paramsPage) || 1 )
    const [dataPerPage, setDataPerPage] = useState(10)

    const { isLoading = false, launches = [] } = useSelector(state => state.launches) || {}

    const data = {
        startDate: startDate && moment(startDate).format('YYYY-MM-DD') || '',
        endDate: endDate && moment(endDate).format('YYYY-MM-DD') || ''
    }

    useEffect(() => {
        if (startDate || endDate) {
            dispatch(action.GetLaunches({ value : statusFilter, dateFilter, data }))
        };
    }, [startDate , endDate])

    useEffect(() => {
        if (dateFilter) {
            const { startDate: newStartDate, endDate: newEndDate } = getTimeStamps(dateFilter, startDate, endDate)
            if (dateFilter !== 'customDate') {
                setEndDate(moment(newEndDate))
                setStartDate(moment(newStartDate))
            }
            const data = {
                startDate: newStartDate && moment(newStartDate).format('YYYY-MM-DD') || '',
                endDate: newEndDate && moment(newEndDate).format('YYYY-MM-DD') || ''
            }
            props.history.replace(`?status=${statusFilter}&start=${data.startDate}&end=${data.endDate}&dateFilter=${dateFilter}&page=${page}`)
        }
    }, [dateFilter])

    const handleStatusChange = (e) => {
        const { value = "" } = e.target
        setStatusFilter(value)
        setPage(1)
        dispatch(action.GetLaunches({ value, data }))
        props.history.replace(`?status=${value}&start=${data.startDate}&end=${data.endDate}&dateFilter=${dateFilter}&page=${1}`)
    }

    const handleDateFilter = (e) => {
        const { value = "" } = e.target
        setDateFilter(value)
        setPage(1)
        props.history.replace(`?status=${statusFilter}&start=${data.startDate}&end=${data.endDate}&dateFilter=${value}&page=${1}`)
    }

    const handlePageChange = (e, value) => {
        setPage(value || page)
        props.history.replace(`?status=${statusFilter}&start=${data.startDate}&end=${data.endDate}&dateFilter=${dateFilter}&page=${value || page}`)
    }

    const DatePickerDateChange = ({ startDate, endDate }) => {
        if (startDate) setStartDate(startDate)
        if (endDate) setEndDate(endDate)

        const data = {
            startDate: startDate && moment(startDate).format('YYYY-MM-DD') || '',
            endDate: endDate && moment(endDate).format('YYYY-MM-DD') || ''
        }
        props.history.replace(`?status=${statusFilter}&start=${data.startDate}&end=${data.endDate}&dateFilter=${dateFilter}&page=${page}`)
    }

    const handleLaunchDetails = (launch) => {
        setLaunchDetails(launch)
        setOpenDetailModal(true)
    }   

    const closeDetailModal = () => {
        setLaunchDetails({})
        setOpenDetailModal(false)
    }

    let totalPage = Math.ceil((launches.length) / dataPerPage);
    let launchData = launches && launches.length && launches.slice((page - 1) * dataPerPage, ((page - 1) * dataPerPage) + dataPerPage);

    return (
        <Fragment>
            <div className="header">
                <img src={Logo} alt="logo" className="logo" />
            </div>
            <Container>
                <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <div className="cus-d-flex">
                            <div className="cus-icon">
                                <img src={DateIcon} alt="" />
                            </div>
                            <FormControl className="date-filter-field">
                                <Select
                                    value={dateFilter}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleDateFilter}
                                >
                                    {FilterDate.map((filter, i) => <MenuItem key={i} value={filter.value}>{filter.label}</MenuItem>)}
                                </Select>
                                {dateFilter == "customDate" ? 
                                    <div className="date-range-picker">
                                        <Datepicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            focusedInput={focusedInput}
                                            setFocusedInput={setFocusedInput}
                                            handleDateChange={DatePickerDateChange}
                                        />
                                    </div> : null}
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="cus-d-flex flex-right">
                            <div className="cus-icon">
                                <img src={FilterIcon} alt="" />
                            </div>
                            <FormControl className="launch-filter-field">
                                <Select
                                    value={statusFilter}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleStatusChange}
                                >
                                    {statusFilterOptions.map(filter => <MenuItem key={filter.id} value={filter.value}>{filter.label}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                </Grid>
                <div className="table" >
                        <Grid container >
                            <TableContainer component={Paper} className="tb-container">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {tableHead.map((head, i) => <TableCell key={i} > {head} </TableCell>)}
                                        </TableRow>
                                    </TableHead>
                                {!isLoading ?
                                        <TableBody>
                                            {
                                                launchData && launchData.length ?
                                                    launchData.map(launch => {
                                                        const { launch_date_utc = "", mission_name = "", launch_site = {}, rocket = {}, launch_success = "", upcoming = "", flight_number = "" } = launch || {}
                                                        const { site_name = "" } = launch_site || {}
                                                        const { second_stage = {}, rocket_name = "" } = rocket || {}
                                                        const { payloads = {} } = second_stage || {}

                                                        return <TableRow key={flight_number} onClick={() => handleLaunchDetails(launch)} >
                                                            <TableCell >{flight_number} </TableCell>
                                                            <TableCell>
                                                                {!launch_success ? launch_date_utc && failedTimeFormat(launch_date_utc) : launch_date_utc && timeFormat(launch_date_utc)}
                                                            </TableCell>
                                                            <TableCell>{site_name}</TableCell>
                                                            <TableCell>{mission_name}</TableCell>
                                                            <TableCell>{(payloads[0] && payloads[0].orbit) || '-'}</TableCell>
                                                            <TableCell>
                                                                {launch_success ? <p className="success"> Success </p> : upcoming ? <p className="upcoming"> Upcoming </p> : <p className="failed"> Failed </p>}
                                                            </TableCell>
                                                            <TableCell>{rocket_name}</TableCell>
                                                        </TableRow>
                                                    })
                                                    :
                                                    <TableCell colSpan={7} className="no-result" >No results found for the specified filter</TableCell>
                                            }
                                        </TableBody>
                                        :
                                        <TableBody>
                                            <TableCell colSpan={7} className="loader" >
                                                <img src={loader} alt="loader" />
                                            </TableCell>
                                        </TableBody>
                                }
                                </Table>
                                <Pagination
                                    color="primary"
                                    count={totalPage || 1}
                                    variant="outlined"
                                    shape="rounded"
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </TableContainer>
                        </Grid>
                </div>
            </Container>
            <CustomModal open={openDetailModal} >
                <LaunchView
                    {...props}
                    launchDetails={launchDetails}
                    closeModal={closeDetailModal}
                />
            </CustomModal>
        </Fragment>
    )
}

export default Dashboard