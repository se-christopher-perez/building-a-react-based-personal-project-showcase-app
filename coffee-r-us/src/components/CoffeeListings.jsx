import React from 'react'
import { useCoffeeContext } from '../context/CoffeeContext'
import Coffee from './Coffee'
import SearchBar from './SearchBar'
import useSearch from '../hooks/useSearch'
import useDelete from '../hooks/useDelete'

function CoffeeListings() {

    const { coffees, setCoffees } = useCoffeeContext()

    const { search, setSearch, filteredArray } = useSearch(coffees, "name")

    const { handleDelete } = useDelete(setCoffees)

    return (
        <>
            <div className="coffee-listings-container">

                <h1>Coffee Listings</h1>

                <SearchBar search={search} setSearch={setSearch} />

                {!coffees ? 
                <p>No Coffee Found</p> :
                filteredArray.map((coffee) => {

                    return <Coffee key={coffee.id} coffee={coffee} handleDelete={handleDelete} />

                })
                
                }

            </div>
        </>
    )
}

export default CoffeeListings
