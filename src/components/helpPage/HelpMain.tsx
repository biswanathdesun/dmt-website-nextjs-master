'use client'
import * as React from 'react'
import HeadBanner from '../common/HeadBanner'
import Footer from '../common/footer/Footer'
import HelpView from './components/HelpView';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getHelpCategoryAsync } from '../../redux/services/help';
import { Box, CircularProgress } from '@mui/material';


function HelpMain() {
    const dispatch: AppDispatch = useDispatch();
    const { isHelpCategoryLoading, getHelpCategory } = useSelector((state: any) => state?.help)
    React.useEffect(
        () => {
            const payload = {
                type:'help'
            }
            dispatch(getHelpCategoryAsync(payload));
        }, [dispatch])
    return (
        <>
            <HeadBanner>Help Page</HeadBanner>
            {isHelpCategoryLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "45vh",
                    }}
                >
                    <CircularProgress />
                </Box >
            ) : (
                <HelpView listData={getHelpCategory} />
            )}
            <Footer />
        </>
    )
}

export default HelpMain