import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function CoffeeForm() {

    const { coffees, setCoffees } = useOutletContext()

    const [newCoffee, setNewCoffee] = useState({

        name: "",
        description: "",
        origin: "",
        price: ""

    })

    function handleSubmit(e){

        e.preventDefault()

        console.log(newCoffee)

        fetch("http://localhost:8000/coffee", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newCoffee)
        })
        .then(r => {

            if(!r.ok){ throw new Error("Issue with POST")}

            return r.json()

        })
        .then(data => {

            setCoffees([...coffees, data])

        })

    }


    return (
        <>
            <div className="coffee-form-container">

                <h1>Add More Coffee!</h1>

                <form className='form-container' onSubmit={handleSubmit}>

                    <label htmlFor='name-input' >Coffee Name</label>
                    <input id='name-input' type="text" value={newCoffee.name} onChange={(e) => setNewCoffee((prevCoffee) => ({...prevCoffee, name: e.target.value}))} />

                    <label htmlFor='description-input' >Description</label>
                    <input id='description-input' type="text" value={newCoffee.description} onChange={(e) => setNewCoffee((prevCoffee) => ({...prevCoffee, description: e.target.value}))} />

                    <label htmlFor='origin-input' >Origin</label>
                    <input id='origin-input' type="text" value={newCoffee.origin} onChange={(e) => setNewCoffee((prevCoffee) => ({...prevCoffee, origin: e.target.value}))} />

                    <label htmlFor='price-input' >Price</label>
                    <input id='price-input' type="text" value={newCoffee.price} onChange={(e) => setNewCoffee((prevCoffee) => ({...prevCoffee, price: e.target.value}))} />

                    <input type="submit" />

                </form>

            </div>
        </>
    )
}

export default CoffeeForm
