import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Shop() {

    const { coffees, stores } = useOutletContext()

    function handleClick() {

        console.log(coffees)

        console.log(stores)

    }

    return (
        <>
            <div className="shop-container">

                <h1>Shop!</h1>

                <button onClick={() => handleClick()}>Coffee Data</button>
                <button onClick={() => handleClick()}>Store Data</button>

            </div>
        </>
    )
}

export default Shop
