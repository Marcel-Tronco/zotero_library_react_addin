import React, {useState} from "react"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { cleanISBN } from "../utils";

const getCoverUrl = (isbn, size) => {
  return `https://covers.openlibrary.org/b/isbn/${cleanISBN(isbn)}-${size}.jpg?default=false`
}

const BookCoverThumbnail = ({size, isbn, ...otherProps}) => {
  const [errored, setErrored] = useState(false)
  const onError = () => {
    console.log("otherProps:", otherProps)
    setErrored(true)
  }
  return ! isbn || errored
    ? <MenuBookIcon {...otherProps}/>
    : <img src={getCoverUrl(isbn,size)} onError={onError} {...otherProps}/>
}
export default BookCoverThumbnail