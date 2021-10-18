import React, {useState, useEffect} from "react"
import BookListTable from "./BookListTable"
import tagService from "../services/tags"
import TagBar from "./TagBar"
const LibraryShelf = () => {
  const [selectedTags, setSelectedTags] = useState([])
  const [tags, setTags] = useState([])
  useEffect(() => {
    (async () => {
      let tagResult = await tagService.getAll()
      setTags(tagResult)
    })()
  },[])
  return <>
    <TagBar tags={tags} selected={selectedTags} setSelected={setSelectedTags}/>
    <BookListTable/>
    </>
}
export default LibraryShelf