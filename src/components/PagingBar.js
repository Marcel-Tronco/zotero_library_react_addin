import React, {useState, useEffect} from "react"

const PagingBar = ({tags, selected, setSelected}) => {
  return <p> { tags.map((tag)=>{
    return <button>{tag}</button>
  })}</p>
}

export default PagingBar