import React from "react"

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { cleanISBN } from '../utils/index'
import ApiBookCover from "./ApiBookCover";

const getCoverUrl = (isbn, size) => {
  return `https://covers.openlibrary.org/b/isbn/${cleanISBN(isbn)}-${size}.jpg?default=false`
}

const BookListRow = ({row}) => {
  const [open, setOpen] = React.useState(false);
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
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.medium}</TableCell>
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
                    <Box>
                    <Typography variant="h6" gutterBottom component="div">
                      Detailansicht
                    </Typography>
                    <Typography variant="h7" gutterBottom component="div">
                      Beschreibung
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div">
                      {row.abstract}
                    </Typography>
                    </Box>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
  </>
}

export default BookListRow