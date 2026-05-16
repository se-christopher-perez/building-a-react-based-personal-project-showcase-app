import React, { useState } from "react";

function useSearch(array, word){

    const [search, setSearch] = useState("")

    const filteredArray = array.filter((item) => {

        return item[word].toLowerCase().includes(search.toLowerCase())

    })

    return { search, setSearch, filteredArray }

}

export default useSearch