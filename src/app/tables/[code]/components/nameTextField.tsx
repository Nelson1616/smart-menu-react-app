import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
        fontSize: '16px',
    },
    '& label': {
        color: 'white',
        fontSize: '16px',
    },
    '& input': {
        color: 'white',
        fontSize: '32px',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

export default function NameTextField(props: any) {
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <CssTextField
                fullWidth id="profileName"
                onChange={(event) => {
                    const value = (event.target as HTMLButtonElement)?.value;
                    if (props.handleChange) {
                        props.handleChange(value);
                    }
                }} />
        </Box>
    );
}