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

const songSchema = Yup.object().shape({
    name: Yup.string().required('Song name is required'),
    link: Yup.string().url('Must be a valid URL').required('Song link is required'),
});

const colabSchema = Yup.object().shape({
    name: Yup.string(),
});



const youtubeSchema = Yup.object().shape({
    link: Yup.string().url('Must be a valid URL').required('Youtube link is required'),
});

const NewListSchema = Yup.object().shape({
    artistName: Yup.string().required('Artist Name is required'),
    artistProfileLink: Yup.string().url('Must be a valid URL').required('Artist profile link is required'),
    instagramLink: Yup.string().url('Must be a valid URL').required('Insatagram profile link is required'),
    songs: Yup.array().of(songSchema).min(1, 'At least one song is required'),
    colaboration: Yup.array().of(colabSchema),
    labelName: Yup.string().required('Label Name is required'),
    youtubeLink: Yup.array().of(youtubeSchema).min(1, 'At least one youtube link is required'),
    royalty: Yup.string().required('Total Royalty is required'),
});

const DiscoveryForm: React.FC<ListFormProps> = ({ open, handleClose }) => {

    const defaultValues = useMemo(() => ({
        artistName: '',
        artistProfileLink: '',
        instagramLink: '',
        songs: Array.from({ length: 5 }, () => ({ name: '', link: '' })),
        colaboration: Array.from({ length: 5 }, () => ({ name: '' })),
        labelName: '',
        youtubeLink: Array.from({ length: 5 }, () => ({ link: '' })),
        royalty: '',
    }), []);

    const methods = useForm({
        resolver: yupResolver(NewListSchema),
        defaultValues,
    });

    const onSubmit: SubmitHandler<any> = (data) => {
        const payload = {
            artistName: data.artistName,
            labelName: data.labelName,
            artistProfileLink: data.artistProfileLink,
            instagramLink: data.instagramLink,
            songs: data.songs,
            colaboration: data.colaboration,
            youtubeLinks: data.youtubeLinks,
            royalty: data.royalty,
            // audioUpload: data.audioUpload,
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
    };

    const { reset, handleSubmit, control, watch } = methods;
    const colaboration = watch('colaboration') || [];
    const songs = watch('songs') || [];
    const youtubeLinks = watch('youtubeLink') || [];

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
                    Discovery+ Submission Form
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
                                name='artistName'
                                label="Artist Name*"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <RHFTextField
                                name='artistProfileLink'
                                label="Atist Profile Link*"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <RHFTextField
                                name='instagramLink'
                                label="Instagram Page Link*"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight={"bold"}>Top 5 Songs Name & Link Name:</Typography>
                        </Grid>
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
                                        label="Song Name"
                                        name={`songs[${index}].name`}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <RHFTextField
                                        fullWidth
                                        label="Song Link"
                                        name={`songs[${index}].link`}
                                        size="small"
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight={"bold"}>
                                Top 5 Collaboration (Optional):
                            </Typography>
                        </Grid>
                        {colaboration.map((_, index) => (
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
                                <Grid item xs={11} sm={5}>
                                    <RHFTextField
                                        fullWidth
                                        name={`colaboration.${index}.name`}
                                        size="small"
                                        label="Colaboration Link"
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Typography variant="body1" my={2}>Label Name*:</Typography>
                            <RHFTextField
                                fullWidth
                                name="labelName"
                                size="small"
                                label="Label Name"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight={"bold"} my={2}>YouTube Video Link(up to 5)*:</Typography>
                        </Grid>

                        {youtubeLinks.map((_, index) => (
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
                                <Grid item xs={11} sm={5}>
                                    <RHFTextField
                                        fullWidth
                                        name={`youtubeLinks.${index}.link`}
                                        size="small"
                                        label="Youtube Links"
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

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight={"bold"}>
                                Last 3 months Royalty*:
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RHFTextField
                                fullWidth
                                label="Total Royalty"
                                name='royalty'
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
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

export default DiscoveryForm
