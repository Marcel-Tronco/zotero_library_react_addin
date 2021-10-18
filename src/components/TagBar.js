import React, {useState, useEffect} from "react"

const TagBar = ({tags, selected, setSelected}) => {
  return <p> { tags.map((tag)=>{
    return <button>{tag}</button>
  })}</p>
}

export default TagBar