
import NotFoundImg from 'Assets/Images/notFound.png'

function NotFound() {
    return (
        <div className="not-found-page">
            <div className="image" >
                <img src={NotFoundImg} />
            </div>
            <p> <a href="/">Go to Dashboard!</a></p>
        </div >
    )
}

export default NotFound