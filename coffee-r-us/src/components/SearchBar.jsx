import React from 'react'

function SearchBar({ search, setSearch }) {


    return (
        <>
            <div className="search-container">

                <label htmlFor="search-input"></label>
                <input id="search-input" type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />

            </div>
        </>
    )
}

export default SearchBar