'use client'
import React, { useMemo } from 'react'
import { Box, Grid, Typography, Dialog, DialogContent, DialogTitle, IconButton, DialogActions, Button, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

// custom form fields
import FormProvider from '@components/hook-form/FormProvider';
import RHFTextField from '@components/hook-form/RHFTextField';

interface ListFormProps {
    open: boolean;
    handleClose: () => void;
}

const artistSchema = Yup.object().shape({
    name: Yup.string().required('Artist name is required'),
    link: Yup.string().url('Must be a valid URL').required('Artist link is required'),
});

const songSchema = Yup.object().shape({
    name: Yup.string().required('Song name is required'),
    link: Yup.string().url('Must be a valid URL').required('Song link is required'),
});

const NewListSchema = Yup.object().shape({
    labelName: Yup.string().required('Label Name is required'),
    city: Yup.string().required('City is required'),
    artists: Yup.array().of(artistSchema).min(1, 'At least one artist is required'),
    songs: Yup.array().of(songSchema).min(1, 'At least one song is required'),
    totalRevenue: Yup.number().required('Total Revenue is required').min(0, 'Total Revenue must be a positive number'),
    totalSongs: Yup.number().required('Total Songs is required').min(0, 'Total Songs must be a positive number'),
});

const LabelForm: React.FC<ListFormProps> = ({ open, handleClose }) => {

    const defaultValues = useMemo(() => ({
        labelName: '',
        city: '',
        artists: Array.from({ length: 5 }, () => ({ name: '', link: '' })),
        songs: Array.from({ length: 5 }, () => ({ name: '', link: '' })),
        totalRevenue: 0,
        totalSongs: 0,
    }), []);

    const methods = useForm({
        resolver: yupResolver(NewListSchema),
        defaultValues,
    });

    const onSubmit: SubmitHandler<any> = (data) => {
        const payload = {
            labelName: data.labelName,
            city: data.city,
            artists: data.artists,
            songs: data.songs,
            totalRevenue: data.totalRevenue,
            totalSongs: data.totalSongs,
        };
        // dispatch(addUserAsync(payload)).then((res) => {
        //     if (res?.payload?.error === false) {
        //         setUserData(payload);
        //         setIsOtp(true);
        //         reset();
        //     } else {
        //         toast.error(res?.payload?.message);
        //         setIsOtp(false);
        //     }
        // });
        // console.log('data => ', data);
        // console.log('payload => ', { payload });
    };

    const { reset, handleSubmit, control, watch } = methods;
    const artists = watch('artists') || [];
    const songs = watch('songs') || [];

    const handleDialogClose = () => {
        reset(defaultValues);  // Reset form fields to default values
        handleClose();  // Close the dialog
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Label Information Form
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers >
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <RHFTextField
                                name='labelName'
                                label="Label Name*"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <RHFTextField
                                name='city'
                                label="City*"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold">Top 5 Artist Name & Profile Link*:</Typography>
                        </Grid>
                        {artists.map((_, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={1}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%'
                                    }}>
                                        <Typography variant='body1' fontWeight="bold">{index + 1}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <RHFTextField
                                        fullWidth
                                        name={`artists[${index}].name`}
                                        size="small"
                                        label="Artist Name*"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RHFTextField
                                        fullWidth
                                        label="Profile link*"
                                        name={`artists[${index}].link`}
                                        size="small"
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold">Top 5 Songs Name & Link Name*:</Typography>
                        </Grid >
                        {songs.map((_, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={1}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%'
                                    }}>
                                        <Typography variant='body1' fontWeight="bold">{index + 1}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item sm={5} xs={12}>
                                    <RHFTextField
                                        fullWidth
                                        label="Song Name*"
                                        name={`songs[${index}].name`}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <RHFTextField
                                        fullWidth
                                        label="Song Link*"
                                        name={`songs[${index}].link`}
                                        size="small"
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Divider sx={{
                                my: 2,
                                borderColor: '#FE8E0B'
                            }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField
                                fullWidth
                                label="Total Revenue (Last 3 Months)*"
                                name='totalRevenue'
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField
                                fullWidth
                                label="Total Songs in Catalogue*"
                                name="totalSongs"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" fontWeight="bold" color="textSecondary">
                                *No account will be converted into a label if the catalogue is less than 50 songs.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <Button variant="outlined" onClick={handleDialogClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" sx={{
                                color: 'white',
                                background: "#FE8E0B",
                                border: 1,
                                borderColor: "white",
                                "&:hover": {
                                    color: 'white',
                                    background: "#FE8E0B",
                                    Border: 1,
                                    borderColor: "white",
                                },
                                ml: {
                                    md: 3,
                                    xs: 1,
                                }
                            }}>
                                Submit Form
                            </Button>
                        </Grid>
                    </Grid>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default LabelForm
