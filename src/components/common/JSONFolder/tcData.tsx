// tcData.ts

export interface DummyJSONData {
    label: string;
    data: {
        lable: string;
        data: {
            title: string;
            content: string;
        }[];
    }[];
}

export const tcData: { [key: string]: DummyJSONData } = {
    'Audio': {
        label: 'Audio',
        data: [
            {
                lable: 'Do&apos;s :',
                data: [
                    {
                        title: '1. Ensure High Quality :',
                        content: 'Submit high-quality audio files in lossless formats like WAV or FLAC.'
                    },
                    {
                        title: '2. Check Levels :',
                        content: 'Maintain consistent audio levels; avoid tracks that are excessively loud or quiet.'
                    },
                    {
                        title: '3. Professional Mastering :',
                        content: 'Ensure your tracks are professionally mastered.'
                    },
                    {
                        title: '4. Label Explicit Content :',
                        content: 'Clearly label any explicit content.'
                    },
                ]
            },
            {
                lable: 'Don&apos;ts :',
                data: [
                    {
                        title: '1. Avoid Distortion :',
                        content: 'Do not submit tracks with audio clipping or distortion.'
                    },
                    {
                        title: '2. No Low-Quality Formats :',
                        content: ' Avoid low-bitrate MP3s or other compressed formats'
                    },
                    {
                        title: '3. No Background Noise :',
                        content: 'Ensure there is no unintended background noise.'
                    },
                    {
                        title: '4. Avoid Watermarks :',
                        content: 'Do not include audio watermarks or tags.'
                    },
                ]
            },
        ]
    },
    'Artwork or Cover Art': {
        label: 'Artwork or Cover Art',
        data: [
            {
                lable: 'Do&apos;s :',
                data: [
                    {
                        title: '1. High Resolution :',
                        content: ' Ensure cover art is at least 3000 x 3000 pixels.'
                    },
                    {
                        title: '2. Proper Formatting :',
                        content: 'Use JPEG or PNG formats with high quality.'
                    },
                    {
                        title: '3. Original Art :',
                        content: 'Use original or properly licensed artwork.'
                    },
                    {
                        title: '4. Relevant Imagery :',
                        content: 'Ensure the artwork is relevant and appropriate.'
                    },
                ]
            },
            {
                lable: 'Don&apos;ts :',
                data: [
                    {
                        title: '1. Avoid Blurriness :',
                        content: 'Do not submit blurry or pixelated images.'
                    },
                    {
                        title: '2. No Text Overload :',
                        content: 'Avoid excessive or hard-to-read text.'
                    },
                    {
                        title: '3. No Copyright Issues :',
                        content: 'Avoid using copyrighted images without permission.'
                    },
                    {
                        title: '4. Avoid Watermarks :',
                        content: 'Do not include audio watermarks or tags.'
                    },
                ]
            },
        ]
    },
    'Metadata': {
        label: 'Metadata',
        data: [
            {
                lable: 'Do&apos;s :',
                data: [
                    {
                        title: '1. Accurate Information :',
                        content: 'Ensure all metadata is accurate and correctly formatted.'
                    },
                    {
                        title: '2. Proper Language :',
                        content: 'Use proper capitalization and grammar.'
                    },
                    {
                        title: '3. Consistent Naming :',
                        content: 'Ensure consistency in names and titles across tracks.'
                    },
                    {
                        title: '4. Complete Data :',
                        content: 'Fill out all required metadata fields.'
                    },
                ]
            },
            {
                lable: 'Don&apos;ts :',
                data: [
                    {
                        title: '1. No Typographical Errors :',
                        content: 'Avoid spelling errors and typos.'
                    },
                    {
                        title: '2. No Irrelevant Information :',
                        content: ' Keep metadata relevant and concise.'
                    },
                    {
                        title: '3. Avoid Incomplete Fields :',
                        content: 'Do not leave required fields empty.'
                    },
                    {
                        title: '4. No Promotional Text :',
                        content: 'Avoid promotional messages in metadata.'
                    },
                ]
            },
        ]
    }
}
