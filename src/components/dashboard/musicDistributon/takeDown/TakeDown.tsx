'use client'
import * as React from 'react';
import { Box, Grid, Typography, Divider, Card, Checkbox, Button, CircularProgress, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import FormProvider from '@components/hook-form/FormProvider';
import RHFTextField from '@components/hook-form/RHFTextField';
import { ArrowLeftIcon } from '@mui/x-date-pickers/icons';
import { getOrderByIdAsync, postTakeDownAsync } from '@/redux/services/uploadAudio';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

interface TakeDownProps {
    param: {
        id: string;
    };
}

const GlowCard = styled(Box)({
    boxShadow: '0 0 14px #524747',
    borderRadius: '8px',
    overflow: 'hidden',
});

interface Track {
    cover: string;
    name: string;
}

interface OrderDataById {
    tracks: Track[];
    declaration: {
        copyrighted: boolean;
    };
    productionRight: {
        year: string;
        name: string;
    };
    genre: string;
    mainArtist: string;
    releaseDate: string;
}

const TakeDown: React.FC<TakeDownProps> = ({ param }) => {

    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [formData, setFormData] = React.useState<any>(null);

    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const { orderDataById, loaderById, orderData } = useSelector((state?: any) => state.newRelease);

    const defaultValues = React.useMemo(() => ({
        artistName: '',
        songName: '',
        isrc: '',
        labelName: '',
        upc: '',
        agreeToTakeDown: false, // Add default value for the checkbox
    }), []);

    const NewListSchema = Yup.object().shape({
        artistName: Yup.string().required('Artist Name is required'),
        songName: Yup.string()
            .required('Song Name is required')
            .test('match-song-name', 'Song Name does not match the name of the first track', function (value) {
                return value === orderDataById?.tracks?.[0]?.name;
            }),
        labelName: Yup.string().required('Label Name is required'),
        isrc: Yup.string().required('ISRC is required'),
        upc: Yup.string().required('UPC is required'),
        agreeToTakeDown: Yup.boolean().oneOf([true], 'You must agree to take down the song'), // Add validation for the checkbox
    });

    const methods = useForm({
        resolver: yupResolver(NewListSchema),
        defaultValues,
    });

    const onSubmit: SubmitHandler<any> = (data) => {
        setFormData(data);
        if (orderDataById.tracks[0].name === data.songName) {
            setOpenSuccessDialog(true);
        } else {
            console.log('Song Name does not match the name of the first track.');
        }
    };

    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false);
        if (formData) {
            const data = {
                songName: formData.songName,
                ISRC: formData.isrc,
                UPC: Number(formData.upc),
                artistName: formData.artistName,
                labelName: formData.labelName,
            };

            dispatch(postTakeDownAsync({ id: param.id, data })).then((res: any) => {
                if (res?.payload?.error === false) {
                    toast.success('taken down from sale');
                    router.push('/dashboard/music-distribution/my-releases');
                } else {
                    console.log('error')
                }
            });
        }
    };

    const { handleSubmit, formState: { isLoading } } = methods;

    const mainArtist = orderDataById?.tracks?.[0]?.artists.filter(
        (artist?: any) => artist.role === "primary"
    )
    
    React.useEffect(() => {
        const id = param.id;
        dispatch(getOrderByIdAsync({ id }));
    }, [param.id, dispatch]);

    return (
        <Box sx={{ padding: 3 }}>
            <Box>
                <Typography textAlign="center" gutterBottom sx={{ fontSize: { sm: 40, xs: 21 }, fontWeight: 'bold', fontFamily: 'Raleway' }}>
                    Take Down From Sale
                </Typography>
            </Box>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <GlowCard>
                        <Card sx={{ padding: { sm: 5, xs: 2 }, elevation: 5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography px={4} gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: 18, md: 24 }, fontFamily: 'Raleway' }}>
                                        Cover
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                        {orderDataById?.tracks?.[0] && (
                                            <CardMedia
                                                component='img'
                                                src={orderDataById?.cover}
                                                alt={orderDataById?.name}
                                            />
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1" sx={{ marginTop: 2, fontSize: { xs: 14, md: 18 }, fontWeight: 'bold', fontFamily: 'Raleway' }}>
                                            Total Cost:
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginTop: 2, fontSize: { xs: 14, md: 18 }, fontWeight: 'bold' }}>
                                            Free
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' fontWeight={'bold'}>Name :&nbsp;</Typography>
                                            <Typography variant='body1'>{orderDataById?.tracks?.[0]?.name}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' fontWeight={'bold'}>Copyright :&nbsp;</Typography>
                                            <Typography variant='body1'>{orderData?.declaration?.copyrighted ? 'Copyrighted' : 'N/A'}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' fontWeight={'bold'}>Production Right :&nbsp;</Typography>
                                            <Typography variant='body1'>{orderDataById?.copyright?.name} - {orderDataById?.productionRight?.name}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' fontWeight={'bold'}>Genre :&nbsp;</Typography>
                                            <Typography variant='body1'>{orderDataById?.genre}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' fontWeight={'bold'}>Main Artist :&nbsp;</Typography>
                                                <Typography variant='body1'>{mainArtist?.[0]?.name}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='body1' fontWeight={'bold'}>Digital Release Date :&nbsp;</Typography>
                                            <Typography variant='body1'>{new Date(orderDataById.releaseDate).toLocaleDateString().replace(/\//g, '-')}</Typography>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <RHFTextField name='songName' label="Song Name*" />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <RHFTextField name='isrc' label="ISRC*" />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <RHFTextField name='upc' label="UPC*" />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <RHFTextField name='artistName' label="Artist Name*" />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <RHFTextField name='labelName' label="Label Name*" />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box display="flex" alignItems="flex-start" mb={2} mt={2}>
                                                            <Checkbox
                                                                {...methods.register('agreeToTakeDown')}
                                                                style={{ padding: 0, marginRight: '8px', marginTop: '4px' }}
                                                            />
                                                            <Typography variant='body1' sx={{ fontSize: { sm: 19, xs: 15 } }}>
                                                                I agree that song will be taken down from all platforms.
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} display="flex" justifyContent="flex-end">
                                                    <LoadingButton type='submit' loading={loaderById} sx={{ color: 'white', background: "#FE8E0B", border: 1, borderColor: "white", "&:hover": { color: 'white', background: "#FE8E0B", Border: 1, borderColor: "white", }, ml: { md: 3, xs: 1, } }} >Submit Form</LoadingButton>
                                                </Grid>
                                            </FormProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </GlowCard>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingY: 5 }}>
                        <Button variant="contained" onClick={() => router.push('/dashboard/main')} sx={{ color: 'white', background: "#FE8E0B", borderRadius: 10, border: 1, borderColor: 'white', "&:hover": { color: 'white', background: "#FE8E0B", }, ml: { md: 3, xs: 1, } }}>
                            <ArrowLeftIcon />
                            Go To Dashboard
                        </Button>
                    </Box>
                </>
            )}
            {/* Success Dialog */}
            <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Take Down</DialogTitle>
                <DialogContent>
                    <Typography>
                        Please be aware that cancelling your music distribution service with us is an irreversible action. Once you decide to cancel, your music will be permanently removed from all platforms and cannot be reinstated under the same distribution agreement. We advise you to consider this decision carefully. If you have any questions or need further assistance, please contact our support team before proceeding.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        OK
                    </Button>
                    <Button onClick={() => setOpenSuccessDialog(false)} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default TakeDown;
