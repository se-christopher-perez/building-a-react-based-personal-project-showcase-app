import React, { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Coffee({ coffee, handleDelete }) {

    const { coffees, setCoffees } = useOutletContext()

    const [updateCoffee, setUpdateCoffee] = useState({

        "description": coffee.description,
        "name": coffee.name,
        "origin": coffee.origin,
        "price": coffee.price

    })

    const [edit, setEdit] = useState(false)

    function handleSubmit(e) {

        e.preventDefault()

        fetch(`http://localhost:8000/coffee/${coffee.id}`, {

            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateCoffee)

        })
            .then(r => {

                if (!r.ok) { throw new Error("Issues with PATCH") }

                return r.json()

            })
            .then(newCoffee => {

                const updatedCoffees = coffees.map((c) => {

                    if (c.id === coffee.id) return newCoffee

                    return c

                })

                setCoffees(updatedCoffees)

                setEdit(false)

            })

    }

    if (edit) return (
        <>
            <div className="coffee-container">

                <form className="edit-form-container" onSubmit={handleSubmit}>

                    <label htmlFor="name-input">Name:</label><br />
                    <input id="name-input" type="text" placeholder={coffee.name} value={updateCoffee.name} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, name: e.target.value }))} /><br /><br />

                    <label htmlFor="origin-input">Origin:</label><br />
                    <input id="origin-input" type="text" placeholder={coffee.origin} value={updateCoffee.origin} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, origin: e.target.value }))} /><br /><br />

                    <label htmlFor="description-input">Description:</label><br />
                    <input id="description-input" type="text" placeholder={coffee.description} value={updateCoffee.description} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, description: e.target.value }))} /><br /><br />

                    <label htmlFor="price-input">Price:</label><br />
                    <input id="price-input" type="text" placeholder={coffee.price} value={updateCoffee.price} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, price: e.target.value }))} /><br /><br />

                    <button type="submit" >Update</button>

                </form>

            </div>
        </>
    )

    return (
        <>
            <div className="coffee-container">

                <p>{coffee.name}</p>
                <p>{coffee.origin}</p>
                <p>{coffee.description}</p>
                <p>{coffee.price}</p>
                <button onClick={() => setEdit(!edit)} >Edit</button>
                <button onClick={() => handleDelete(coffee.id)} >Delete</button>

            </div>
        </>
    )
}

export default Coffee
