import React, { useState, useEffect, useRef, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCoffeeContext } from '../context/CoffeeContext'

function CoffeeForm() {

    const { coffees, setCoffees } = useCoffeeContext()

    const nameID = useId()

    const descriptionID = useId()

    const originID = useId()

    const priceID = useId()

    const inputRef = useRef(null)

    const navigate = useNavigate()

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

        const parsedPrice = parseFloat(newCoffee.price)

        if (!newCoffee.name || !newCoffee.description || !newCoffee.origin) {

            alert("Fill in the form")

            return

        }

        if (isNaN(parsedPrice)) {

            alert("Price must be a number")

            return

        }

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

                navigate("/shop")

            })

    }


    return (
        <>
            <div className="coffee-form-container">

                <form className='form-container' onSubmit={handleSubmit}>

                    <div>

                        <label htmlFor={nameID} >Coffee Name</label><br />
                        <input id={nameID} ref={inputRef} type="text" value={newCoffee.name} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, name: e.target.value }))} />

                    </div>


                    <div>

                        <label htmlFor={descriptionID} >Description</label><br />
                        <input id={descriptionID} type="text" value={newCoffee.description} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, description: e.target.value }))} />

                    </div>


                    <div>

                        <label htmlFor={originID} >Origin</label><br />
                        <input id={originID} type="text" value={newCoffee.origin} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, origin: e.target.value }))} />


                    </div>

                    <div>

                        <label htmlFor={priceID} >Price</label><br />
                        <input id={priceID} type="text" value={newCoffee.price} onChange={(e) => setNewCoffee((prevCoffee) => ({ ...prevCoffee, price: e.target.value }))} />

                    </div>

                    <div>

                        <input type="submit" value="Submit" />

                    </div>


                </form>

            </div>
        </>
    )
}

export default CoffeeForm
