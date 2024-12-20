import "../../index.css"

const Notification = ({ message, type }) => {
    if (message === null || message === "") {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification