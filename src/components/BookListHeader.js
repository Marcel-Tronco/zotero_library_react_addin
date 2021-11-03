import React from 'react'
import { TableRow, TableCell, TableHead, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

const BookListHeader = (props) => {
  const { headerSpecs, order, setOrder, sortButtonsDisabled } = props
  const handleSort = (id) => {
    if (id === order.id && order.direction === 'asc') {
      setOrder({ id, direction:'desc' })
    }
    else {
      setOrder({
        id,
        direction: 'asc'
      })
    }
  }

  return <TableHead>
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      {headerSpecs.cols.map((col) => {
        return <TableCell
          key={col.id}
          align="left"
          sortDirection={ order.id === col.id
            ? order.direction
            : false
          }
        >
          <TableSortLabel
            active={order.id === col.id}
            direction={order.id === col.id ? order.direction : 'asc'}
            onClick={() => (handleSort(col.id))}
            disabled={sortButtonsDisabled}
          >
            {col.label}
            {order.id === col.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      })}
    </TableRow>
  </TableHead>
}

export default BookListHeader