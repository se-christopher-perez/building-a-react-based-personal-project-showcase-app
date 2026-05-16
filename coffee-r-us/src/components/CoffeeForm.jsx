import React, { useState, useEffect, useRef, useId } from 'react'
import { useOutletContext } from 'react-router-dom'

function CoffeeForm() {

    const { coffees, setCoffees } = useOutletContext()

    const nameID = useId()

    const descriptionID = useId()

    const originID = useId()

    const priceID = useId()

    const inputRef = useRef(null)

    useEffect(() => {

        inputRef.current.focus()

    }, [])

    const [newCoffee, setNewCoffee] = useState({

        name: "",
        description: "",
        origin: "",
        price: ""

    })

    function handleSubmit(e) {

        e.preventDefault()

        console.log(newCoffee)

        fetch("http://localhost:8000/coffee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCoffee)
        })
            .then(r => {

                if (!r.ok) { throw new Error("Issue with POST") }

                return r.json()

            })
            .then(data => {

                setCoffees([...coffees, data])

                setNewCoffee({
                    name: "",
                    description: "",
                    origin: "",
                    price: ""
                })

                inputRef.current.focus()

            })

    }


    return (
        <>
            <div className="coffee-form-container">

                <h1>Add More Coffee!</h1>

                <form className='form-container' onSubmit={handleSubmit}>

                    <label htmlFor={nameID} >Coffee Name</label>
                    <input id={nameID} ref={inputRef} type="text" value={newCoffee.name} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, name: e.target.value }))} />

                    <label htmlFor={descriptionID} >Description</label>
                    <input id={descriptionID} type="text" value={newCoffee.description} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, description: e.target.value }))} />

                    <label htmlFor={originID} >Origin</label>
                    <input id={originID} type="text" value={newCoffee.origin} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, origin: e.target.value }))} />

                    <label htmlFor={priceID} >Price</label>
                    <input id={priceID} type="text" value={newCoffee.price} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, price: e.target.value }))} />

                    <input type="submit" />

                </form>

            </div>
        </>
    )
}

export default CoffeeForm
