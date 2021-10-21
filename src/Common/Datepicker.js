import moment from 'moment'
import EventIcon from '@mui/icons-material/Event';
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import { Box } from '@mui/system';


function Datepicker(props) {
    const {
        startDate,
        endDate,
        handleDateChange = () => { },
        focusedInput,
        setFocusedInput
    } = props

    return (
        <Box pl={1}>
            <DateRangePicker
                startDate={startDate}
                startDateId="startDate"
                startDatePlaceholderText="From..."
                endDatePlaceholderText="To..."
                customArrowIcon={<p className="start-end-date-divider">|</p>}
                endDate={endDate}
                endDateId="endDate"
                customInputIcon={<EventIcon className="date-picker-icon" />}
                isOutsideRange={date =>
                    date.isBefore(moment().year()) ||
                    date.isAfter(moment())
                }
                onDatesChange={handleDateChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                verticalHeight={380}
                customCloseIcon={null}
                anchorDirection="left"
                inputIconPosition="after"
                hideKeyboardShortcutsPanel
                displayFormat="MMM-DD-YYYY"
            >
            </DateRangePicker>
        </Box>
    )
}

export default Datepicker