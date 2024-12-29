import { AppBar } from '@mui/material';
import Nav from './Nav';


const Header = ({ onThemeToggle, isDarkMode }) => {

    return (
        <>
        <AppBar
            position="sticky"
            //elevation={0}
            color='primary'
            sx={{top: 0,
                borderTop: (theme) => `8px solid $(theme.palette.primary.main)`,
            }}>     
            <Nav onThemeToggle={onThemeToggle} isDarkMode={isDarkMode}/>
        </AppBar>
        </>
    )

}

export default Header
