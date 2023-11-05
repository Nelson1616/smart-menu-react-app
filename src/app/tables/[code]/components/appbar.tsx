import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function TableAppBar(props : any) {
    const title = props.title;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#FBEBEB' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ArrowBack style={{color: '#000000'}} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'SofiaProLight', color: '#000000'}}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}