'use client'
import { Box, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import React, { useState, useEffect } from 'react';
import StoreData from './StoreData';
import SearchBar from './SearchBar';
import Image from 'next/image';
import HeadBanner from '@/components/common/HeadBanner';

const Store = () => {
    const [end, setEnd] = useState(8);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(StoreData);

    useEffect(() => {
        const filtered = StoreData.filter(store =>
            store.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setEnd(8);
    }, [searchQuery]);

    const handleNext = () => {
        setEnd(end + 8);
    };

    return (
        <>
            <HeadBanner>Discover Your Soundtrack Across <br></br> Platforms!</HeadBanner>
            <Container sx={{ display: 'flex', justifyContent: 'flex-start', marginY: 6, }}>
                <SearchBar onSearch={setSearchQuery} />
            </Container>
            <Container sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginY: 6,
                justifyContent: { xs: 'center' }
            }}>
                {filteredData.slice(0, end).map((c, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: '100%',
                            maxWidth: 270,
                            height: 350,
                            borderRadius: 2,
                            borderWidth: 0.75,
                            borderColor: '#D0D0D0',
                            borderStyle: 'solid',
                            margin: '7px',
                            padding: '24px 0.75px',
                            gap: '6px',
                            bgcolor: '#FFFFFF',
                        }}
                    >
                        <CardActionArea>
                            <Box
                                sx={{
                                    width: 286,
                                    height: 60,
                                    borderRadius: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src={c.image}
                                    height={55}
                                    style={{
                                        display: 'flex', justifyContent: 'center'
                                    }}
                                    alt="Icon"
                                    layout=""
                                />
                            </Box>
                            <CardContent>
                                <Typography component={'div'} sx={{
                                    fontFamily: 'Poppins', fontWeight: '550',
                                    color: '#000000', fontSize: '1.125rem',
                                }}>
                                    {c.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Poppins', fontWeight: '500',
                                        color: '#6D7882', fontSize: '0.75rem'
                                    }}
                                >
                                    {c.content}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Container>
            <Container sx={{ display: 'flex', justifyContent: 'center', marginY: 6 }}>
                {end >= filteredData.length ? " " : (
                    <Button
                        sx={{
                            borderRadius: '75px',
                            border: '0.75px solid black',
                            gap: '9px',
                            backgroundColor: '#FFFFFF',
                            color: 'black',
                            fontSize: '0.75rem'
                        }}
                        onClick={handleNext}
                    >Load more results</Button>
                )}
            </Container>
        </>
    );
}

export default Store;
