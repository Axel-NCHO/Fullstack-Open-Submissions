const Filter = ({filter, updateFilter}) => (
    <>
        <div>Filter shown with name starting with</div>
        <div>
            <input value={filter} onChange={updateFilter}/>
        </div>
    </>
)

export default Filter