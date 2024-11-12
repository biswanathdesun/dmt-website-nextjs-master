// validations/formSchema.ts
import * as yup from 'yup';

export const formSchema = yup.object().shape({
    songName: yup.string().required('Song name is required'),
    labelName: yup.string().required('Label name is required'),
    language: yup.string().required('Language is required'),
    songGenre: yup.string().required('Song genre is required'),
    previewStartTime: yup.string().required('Preview start time is required'),
    releaseDate: yup.date().required('Release date is required'),
    copyrightName: yup.string().required('Copyright name is required'),
    productionRightsName: yup.string().required('Production rights name is required'),
    artistName: yup.string().required('Artist name is required'),
    fbProfileLink: yup.string().url('Invalid URL').required('Facebook profile/page link is required'),
    instagramProfileLink: yup.string().url('Invalid URL').required('Instagram profile/page link is required'),
    spotifyArtistLink: yup.string().url('Invalid URL').required('Spotify artist profile link is required'),
    youtubeChannelLink: yup.string().url('Invalid URL').required('YouTube channel link is required'),
    composerFullName: yup.string().required('Composer full name is required'),
    lyricistFullName: yup.string().required('Lyricist full name is required'),
    cleanOrExplicit: yup.string().required('This field is required'),
    originalComposition: yup.string().required('This field is required'),
    isrc: yup.string(),
});
