import React from 'react'
import { Container, Button, Typography, Box } from '@mui/material';
import RaiseTicket from './RaiseTicket';
import CustomHeading from '../common/CustomHeading';
const RaiseTicketContainer = () => {
    return (
        <>
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomHeading text='Tickets' />
                <Button variant="contained" color="secondary" style={{ marginBottom: '20px', backgroundColor: '#F17D10' }}>
                    Add Tickets
                </Button>
            </div>
            <RaiseTicket />
            </Container>
        </>
    )
}

export default RaiseTicketContainer
