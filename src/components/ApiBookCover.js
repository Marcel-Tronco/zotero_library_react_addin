import React, {useState} from "react"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getCoverUrl} from "../utils";

const BookCoverThumbnail = ({size, isbn, ...otherProps}) => {
  const [errored, setErrored] = useState(false)
  const onError = () => {
    setErrored(true)
  }
  return ! isbn || errored
    ? <MenuBookIcon {...otherProps}/>
    : <img src={getCoverUrl(isbn,size)} onError={onError} {...otherProps}/>
}
export default BookCoverThumbnail