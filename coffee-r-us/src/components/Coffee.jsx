import React, { useState, useId } from "react"
import { useCoffeeContext } from '../context/CoffeeContext'

function Coffee({ coffee, handleDelete }) {

    const { coffees, setCoffees } = useCoffeeContext()

    const nameID = useId()

    const descriptionID = useId()

    const originID = useId()

    const priceID = useId()

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


            <div className="coffee-contents-container" >

                <form className="edit-form-container" onSubmit={handleSubmit}>

                    <label htmlFor={nameID}>Name:</label><br />
                    <input id={nameID} type="text" placeholder={coffee.name} value={updateCoffee.name} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, name: e.target.value }))} /><br /><br />

                    <label htmlFor={originID} >Origin:</label><br />
                    <input id={originID} type="text" placeholder={coffee.origin} value={updateCoffee.origin} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, origin: e.target.value }))} /><br /><br />

                    <label htmlFor={descriptionID}>Description:</label><br />
                    <input id={descriptionID} type="text" placeholder={coffee.description} value={updateCoffee.description} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, description: e.target.value }))} /><br /><br />

                    <label htmlFor={priceID}>Price:</label><br />
                    <input id={priceID} type="text" placeholder={coffee.price} value={updateCoffee.price} onChange={(e) => setUpdateCoffee(prevUpdateCoffee => ({ ...prevUpdateCoffee, price: e.target.value }))} /><br /><br />

                    <button type="submit" >Update</button>

                </form>

            </div>



        </>
    )

    return (
        <>

            <div className="coffee-contents-container">

                <p>Coffee Name: {coffee.name}</p>
                <p>Origin: {coffee.origin}</p>
                <p>Description: {coffee.description}</p>
                <p>Price: ${coffee.price}</p>
                <button onClick={() => setEdit(!edit)} >Edit</button>
                <button onClick={() => handleDelete(coffee.id)} >Delete</button>

            </div>

        </>
    )
}

export default Coffee
