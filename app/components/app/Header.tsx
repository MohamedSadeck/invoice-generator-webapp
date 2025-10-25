import React from 'react'
import { useAuth } from '~/context/AuthContext';
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
    Box,
    Typography,
    Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { FileText } from 'lucide-react';
import logger from '~/utils/logger';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    logger.debug(`Rendering Header component for user: ${user}`);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleProfile = () => { handleClose(); navigate('/profile'); };
    const handleLogout = () => { handleClose(); logout(); };

    return (
        <header className='header-custom'>
            <Box sx={{ maxWidth: '1152px', mx: 'auto', py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5, 
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.8 }
                    }}
                    onClick={() => navigate('/')}
                >
                    <FileText size={28} color="#1976d2" />
                    <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                        AI Invoice Generator
                    </Typography>
                </Box>
                <Button
                    onClick={handleClick}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textTransform: 'none',
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'grey.100' }
                    }}
                    aria-label='Open profile menu'
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300', fontSize: '0.875rem' }}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        {user?.name ?? 'Account'}
                    </Typography>
                </Button>

                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    slotProps={{ paper: { sx: { mt: 1, minWidth: 160 } } }}
                >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Signout</MenuItem>
                </Menu>
            </Box>
        </header>
    )
}

export default Header
