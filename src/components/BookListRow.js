import React from "react"

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ApiBookCover from "./ApiBookCover"

import BookListDetails from './BookListDetails'

const BookListRow = ({row}) => {
  const [open, setOpen] = React.useState(false)
  return <>
           <TableRow
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >  
              <TableCell>
                <IconButton
                  aria-label={`Beschreibung ${open?"schließen":"öffnen"}`}
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>
                <ApiBookCover size="S" isbn={row.isbn} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.creator}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.itemType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{
                    margin: 1,
                    display: 'flex',
                    flexDirection: 'row'
                    }}>
                      <ApiBookCover style={{marginRight: "2em"}} size="M" isbn={row.isbn} />
                    <BookListDetails item={row}/>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
  </>
}

export default BookListRow