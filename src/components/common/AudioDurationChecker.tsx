import React, { useState, ChangeEvent } from 'react';
import { Box, Typography, Button, Input, Avatar, Grid, IconButton } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DeleteIcon from '@mui/icons-material/Delete';

interface AudioFile {
    uploadedFileData: string;
    audioURL: string;
    duration: number;
}
interface AudioDurationProps {
    uploadedFileData: any;
    setUploadedFileData?: React.Dispatch<React.SetStateAction<any>>;
    audioURL: string;
    setAudioURL?: React.Dispatch<React.SetStateAction<string>>;
}


const AudioDurationChecker: React.FC<AudioDurationProps> = ({ setUploadedFileData }) => {
    const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                if (file.type === 'audio/wav') {
                    const url = URL.createObjectURL(file);
                    const audio = new Audio(url);

                    audio.addEventListener('loadedmetadata', () => {
                        const duration = audio.duration;
                        setAudioFiles(prevFiles => [
                            ...prevFiles,
                            { uploadedFileData: file.name, audioURL: url, duration },
                        ]);
                        if (setUploadedFileData) {
                            setUploadedFileData((prevFiles: any) => [
                                ...prevFiles,
                                { uploadedFileData: file.name, audioURL: url, duration },
                            ]);
                        }
                    });

                    audio.load();
                }
            });
        }
    };

    const handleRemoveAudioFile = (index: number) => {
        setAudioFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <>
            <Box alignItems="center">
                <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    sx={{ color: 'white', textTransform: 'capitalize', minWidth: 'max-content' }}
                >
                    Upload Audio
                    <Input
                        type="file"
                        inputProps={{ accept: 'audio/wav', multiple: true, 'aria-label': 'Upload audio file' }}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </Button>

                {audioFiles.length > 0 && (
                    <Grid container spacing={2} mt={2}>
                        {audioFiles.map((audioFile, index) => (
                            <Grid item xs={12} key={index}>
                                <Box display="flex" alignItems="center">
                                    <Avatar>
                                        <AudiotrackIcon />
                                    </Avatar>
                                    <Box ml={2} flexGrow={1}>
                                        <Typography sx={{ fontSize: '14px' }}>
                                            {audioFile.uploadedFileData}
                                        </Typography>
                                        {audioFile.duration > 0 && (
                                            <Typography sx={{ fontSize: '14px' }}>
                                                Duration: {Math.floor(audioFile.duration / 60)}:
                                                {Math.floor(audioFile.duration % 60).toString().padStart(2, '0')} minutes
                                            </Typography>
                                        )}
                                    </Box>
                                    <IconButton onClick={() => handleRemoveAudioFile(index)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default AudioDurationChecker;
