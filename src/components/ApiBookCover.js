import React, { useState } from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Box, Typography, Link } from '@mui/material'

import { getCoverUrl } from '../utils'

const ApiBookCover = ({ size, isbn, ...otherProps }) => {
  const [errored, setErrored] = useState(false)
  const onError = () => {
    setErrored(true)
  }
  return ! isbn || errored
    ? <MenuBookIcon {...otherProps}/>
    : size !== 'M'
      ? <img src={getCoverUrl(isbn, size)} onError={onError} {...otherProps}/>
      : <Box sx={{ display:'flex', flexDirection: 'column' }}>
        <img src={getCoverUrl(isbn, size)} onError={onError} {...otherProps}/>
        <Typography variant='caption'>
            Cover wird bereitgestellt von <Link href='https://openlibrary.org' rel='noreferrer'>open library</Link>
        </Typography>
      </Box>
}
export default ApiBookCover
