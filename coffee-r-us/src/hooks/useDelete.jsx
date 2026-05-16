import React from "react";

function useDelete(setCoffees){

    function handleDelete(id){

        fetch(`http://localhost:8000/coffee/${id}`, {

            method: "DELETE"

        })
        .then(r => {

            if(!r.ok) throw new Error("Issue with DELETE")

            setCoffees(prevCoffee => prevCoffee.filter(coffee => coffee.id !== id))

        })
        .catch(err => console.log(err))

    }

    return { handleDelete }

}

export default useDelete