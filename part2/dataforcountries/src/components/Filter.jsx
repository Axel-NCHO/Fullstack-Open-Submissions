const Filter = ({filter, onChangeFilter}) => (
    <>
        <div>Find countries</div>
        <div>
            <input value={filter} onChange={onChangeFilter}/>
        </div>
    </>
)

export default Filter