'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography } from '@mui/material';
import CustomTableRow from './CustomTableRow';
import Scrollbar from '../common/scrollbar';
import { TableHeadCustom } from '../common/table';
const RaiseTicket = () => {
    interface HeadCell {
        id: string;
        label: string;
        align?: "left" | "center" | "right";
        width?: string;
        minWidth?: string;
    }

    const TABLE_HEAD: readonly HeadCell[] = [
        { id: "Edit", label: "Edit" },
        { id: "Date", label: "Date" },
        { id: "Ticket#", label: "Ticket#" },
        { id: "Reason", label: "Reason" },
        { id: "Status", label: "Status" },
    ] as const;
    const items = [{
        isrc:"ISRC123456" ,
        upc:"UPC123456",
        title:"Levitating",
        status:" In progress"
    }]
  return (
      <TableContainer component={Paper}>
          <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
                  <TableHeadCustom
                      headLabel={TABLE_HEAD}
                  sx={{
                      backgroundColor: "#FFF4E7" }}
                  />
              <TableBody>{
                  items.map((item,index)=>(
                      <CustomTableRow
                          key={index}
                      isrc={item.isrc}
                      upc={item.upc}
                      title={item.title}
                      status={item.status}
                  />
                  )) }
              </TableBody>
              </Table>
          </Scrollbar>
      </TableContainer>
  )
}

export default RaiseTicket
