import { TableCell, TableRow } from '@mui/material';
// Icons
import CloseIcon from '@mui/icons-material/Close';
import YoutubeIcon from 'Assets/Images/youtube.svg'
import WikiIcon from 'Assets/Images/wiki.svg';
import SpaceIcon from 'Assets/Images/spacex.svg'
import DefaultImg from 'Assets/Images/spacex.png'

function LaunchView(props) {
    const { launchDetails = {} } = props
    const { mission_name = "", launch_success = "", details = "", flight_number = "", launch_date_utc = "", upcoming = "", launch_site = {}, rocket = {}, links = {} } = launchDetails
    const { site_name = "" } = launch_site
    const { second_stage = {}, rocket_type = "", rocket_name = "" } = rocket
    const { payloads = [] } = second_stage
    const { manufacturer = "", payload_type = "", orbit = "", nationality = "" } = payloads[0] || []
    const { wikipedia = "", video_link = "", article_link = "", flickr_images = [] } = links

    const viewData = [
        { label: 'Flight Number', value: flight_number },
        { label: 'Mission Name', value: mission_name },
        { label: 'Rocket Type', value: rocket_type },
        { label: 'Rocket Name', value: rocket_name },
        { label: 'Manufacturer', value: manufacturer },
        { label: 'Nationality', value: nationality },
        { label: 'Launch Date', value: launch_date_utc },
        { label: 'Payload Type', value: payload_type },
        { label: 'Orbit', value: orbit },
        { label: 'Launch Site', value: site_name },
    ]

    return (
        <div className="details-page" >
            <CloseIcon onClick={() => props.closeModal()} className="cross-icon" />
            <div className="img-container" >
                <div className="modal-top-sec">
                    <div className="top-sec-img">
                        <img src={`${flickr_images[0] ? flickr_images[0] : DefaultImg}`} alt="" />
                    </div>
                    <div className="top-sec-con">
                        <h5>
                            <span>{mission_name}</span>
                            {launch_success ? <p className="success"> Success </p> : upcoming ? <p className="upcoming"> Upcoming </p> : <p className="failed"> Failed </p>}
                        </h5>
                        <p>{site_name} </p>
                        <div className="top-icons">
                            { article_link &&  <a href={article_link} target="_blank" rel="noreferrer"><img src={SpaceIcon} alt="" /> </a>}
                            { wikipedia && <a href={wikipedia} target="_blank" rel="noreferrer"><img src={WikiIcon} alt="" /> </a>}
                            { video_link && <a href={video_link} target="_blank" rel="noreferrer"><img src={YoutubeIcon} alt="" /> </a>}
                        </div>
                    </div>
                </div>
                <div className="top-sec-des">
                    {details && <p> {details} {wikipedia && <a href={wikipedia} target="_blank" rel="noreferrer"> Wikipedia </a>}  </p> }
                </div>
            </div>
            <div className="details-table" >
                <table>
                    {viewData.map((data, i) => {
                        return <TableRow key={i}>
                            <TableCell align="right"> {data.label} </TableCell>
                            <TableCell align="right"> {data.value}</TableCell>
                        </TableRow>
                    })}
                </table>
            </div>
        </div>
    )
}

export default LaunchView