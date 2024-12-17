import { AppBar, Box } from '@mui/material';
import Nav from './Nav';


const Header = () => {

    return (
        <>
        <AppBar
            position="sticky"
            elevation={0}
            sx={{top: 0,
                borderTop: '8px solid white',
            }}>
            <Nav/>
        </AppBar>
        </>
    )

}

export default Header
