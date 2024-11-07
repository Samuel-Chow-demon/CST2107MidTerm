import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const SearchBar = ({ searchHandle }) => {

    const [searchText, setSearchText] = useState('');

    return (
        <Box display="flex" alignItems="center" width="80%" gap={1} margin={5}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Key words or item name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ flex: 1 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={()=>{searchHandle(searchText)}}
            >
                Search
            </Button>
            <Button
                variant="contained"
                sx={{
                    color:grey[200],
                    backgroundColor: blue[800]
                }}
                onClick={()=>{searchHandle("")}}
            >
                ALL
            </Button>
        </Box>
    );
};

export default SearchBar;