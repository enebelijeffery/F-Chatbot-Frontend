import { Box, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from 'react';
import { Link } from "react-router-dom";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { colorTokens, useChangeMode, useColorModecontext } from "../../theme";
import { useUiStore } from "../../store/uiStore";

const Slide = ({ menuOpen, toggleMenu }) => {
    const changeMode= useColorModecontext()
    const theme = useTheme()
    const colors = colorTokens(theme.palette.mode)
    const mode = theme.palette.mode
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/signin'; // Redirect to login page
      };
      
    return (
        <Box
            bgcolor={colors.primary[300]}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh', // Full height
                width: '20vw', // 20% width
                boxShadow: 3,
                zIndex: 1201, // Ensure it's above other elements
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                <IconButton onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <Box sx={{ marginBottom: 2 }}>
                    <Link to={'/'}><Typography>F-Chatbot</Typography></Link>
                </Box>
                <Box sx={{ marginBottom: 2, cursor: 'pointer' }}>
                    <Link to={'/forum'}><Typography>Forum</Typography></Link>
                </Box>
                <Box 
                onClick={handleLogout}
                sx={{ marginBottom: 2, cursor: 'pointer' }}>
                    <Link to={'/signin'}><Typography>Signout</Typography></Link>
                </Box>
                <Box onClick={changeMode} sx={{ marginBottom: 2, cursor: 'pointer' }}>
                    <IconButton>
                        {mode == 'dark' ? <ModeNightIcon /> : <LightModeIcon />}
                    </IconButton>
                </Box>
            </Box>

        </Box>
    )
}

const TopBar = () => {
    // const [openMenu, setOpenMenu] = useState(false);
    const {openMenu,setOpenMenu}=useUiStore()


    // Open Menu function
    const toggleMenu = () => {
        setOpenMenu((prev) => prev == false ? true : false)
    }
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            p={4}
        >
            <Box
                onClick={()=>setOpenMenu(!openMenu)}
            >
                <IconButton size='small'>
                    {openMenu ? <MenuIcon  /> : <MenuOpenIcon />}
                </IconButton>
            </Box>
            <Box>
                <Typography
                variant="h3"
                sx={{
                    background: "linear-gradient(90deg, #ff7eb3, #ff758c, #ff7eb3)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                >F-ChatBot</Typography>
            </Box>
            {/* {openMenu && <Slide menuOpen={openMenu} toggleMenu={toggleMenu} />} */}
        </Box>
    )
}

export default TopBar



