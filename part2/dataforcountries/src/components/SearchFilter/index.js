import "./index.css"

const SearchFilter = ({newName, handleNameChange}) => {
    return (
        <div className = "search-field">
            <label htmlFor="searchCountry">Find Countries</label>
            <input 
                id="searchCountry" 
                name="search" 
                onChange = {handleNameChange}
            />
        </div>
    )
}

export default SearchFilter