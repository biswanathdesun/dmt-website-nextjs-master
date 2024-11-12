import { Button, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import type { SVGProps } from 'react';
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
interface CustomTableRowProps {
    isrc: string;
    upc: string;
    title: string;
    status: string;
}

const CustomTableRow: React.FC<CustomTableRowProps> = ({ isrc, upc, title, status }) => {
  return (
      <TableRow>
          <TableCell>
              <IconButton aria-label="edit">
                  <Icon icon="fluent:edit-12-regular" />
              </IconButton>
          </TableCell>
          <TableCell><Typography sx={{
              color: '#585858', fontWeight: '500', fontFamily: 'Lato', fontSize: '1.21rem'
          }}>{isrc}</Typography></TableCell>
          <TableCell><Typography sx={{
              color: '#585858', fontWeight: '500', fontFamily: 'Lato', fontSize: '1.21rem'
          }}>{ upc}</Typography></TableCell>
          <TableCell><Typography sx={{
              color: '#585858', fontWeight: '500', fontFamily: 'Lato', fontSize: '1.21rem'
          }}>{ title}</Typography></TableCell>
          <TableCell>
              <Button variant="contained" style={{
                  backgroundColor: '#FED7D7', color: '#702459', borderRadius: '138px'
              }}>
                 {status}
              </Button>
          </TableCell>
      </TableRow>
  )
}

export default CustomTableRow
