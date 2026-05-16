import React, { useEffect, useRef, useId } from 'react'

function SearchBar({ search, setSearch }) {

    const inputRef = useRef(null)

    const searchID = useId()

    useEffect(() => {

        inputRef.current.focus()

    }, [])

    return (
        <>
            <div className="search-container">

                <label htmlFor={searchID} >Search: </label>
                <input id={searchID} ref={inputRef} type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />

            </div>
        </>
    )
}

export default SearchBar