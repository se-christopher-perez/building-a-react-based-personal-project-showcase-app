import React, { useEffect, useRef } from 'react'

function SearchBar({ search, setSearch }) {

    const inputRef = useRef(null)

    useEffect(() => {

        inputRef.current.focus()

    }, [])

    return (
        <>
            <div className="search-container">

                <label htmlFor="search-input"></label>
                <input id="search-input" ref={inputRef} type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />

            </div>
        </>
    )
}

export default SearchBar