import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Coffee from './Coffee'
import SearchBar from './SearchBar'

function CoffeeListings() {

    const { coffees } = useOutletContext()

    const [search, setSearch] = useState("")

    const searchCoffee = coffees.filter((coffee) => {

        return coffee.name.toLowerCase().includes(search.toLowerCase())

    })

    return (
        <>
            <div className="coffee-listings-container">

                <h1>Coffee Listings</h1>

                <button onClick={() => handleClick()}>Coffee Data</button>

                <SearchBar search={search} setSearch={setSearch} />

                {!coffees ? 
                <p>No Coffee Found</p> :
                searchCoffee.map((coffee) => {

                    return <Coffee key={coffee.id} coffee={coffee}/>

                })
                
                }

            </div>
        </>
    )
}

export default CoffeeListings
