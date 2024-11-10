const Flag = ({flag}) => (
    <div>
        <h2>Flag</h2>
        <img
            style={{border: '2px solid #1e1e1e1e', borderRadius: "10px"}}
            src={flag.png}
            alt={flag.alt}/>
    </div>
)

export default Flag
