import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function ImageSelector(props: any) {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                sx={{
                    color: 'white',
                }}
                aria-label="Imagens de Usuário"
                defaultValue={1}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={8}
                onChange={(event) => {
                    const value = (event.target as HTMLButtonElement)?.value;
                    if (props.handleChange) {
                        props.handleChange(value);
                    }
                }}
            />
        </Box>
    );
}