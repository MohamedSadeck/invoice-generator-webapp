import React from 'react'
import { useAuth } from '~/context/AuthContext';
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
    Box,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FileText, Menu as MenuIcon, Home, FileText as InvoiceIcon, User, LogOut, Plus } from 'lucide-react';
import logger from '~/utils/logger';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    logger.debug(`Rendering Header component for user: ${user}`);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleProfile = () => { handleClose(); navigate('/profile'); };
    const handleLogout = () => { handleClose(); logout(); };

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const navigationItems = [
        { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { label: 'All Invoices', icon: <InvoiceIcon size={20} />, path: '/invoices/all' },
        { label: 'Create Invoice', icon: <Plus size={20} />, path: '/invoices/create' },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        closeMobileMenu();
    };

    return (
        <Box className='header-custom'>
            <Box sx={{ maxWidth: '1152px', mx: 'auto', py: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Mobile Menu Button - Only visible on small screens */}
                <IconButton
                    onClick={toggleMobileMenu}
                    sx={{ 
                        display: { xs: 'flex', md: 'none' },
                        color: 'text.primary'
                    }}
                    aria-label="Open navigation menu"
                >
                    <MenuIcon size={24} />
                </IconButton>

                {/* Logo and Title */}
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
                    <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                        AI Invoice Generator
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, display: { xs: 'block', sm: 'none' } }}>
                        AI Invoice
                    </Typography>
                </Box>

                {/* Desktop Navigation - Only visible on large screens */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                    {navigationItems.map((item) => (
                        <Button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                textTransform: 'none',
                                color: 'text.primary',
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>

                {/* User Profile Button */}
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

                {/* Profile Menu */}
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

            {/* Mobile Drawer Menu */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={closeMobileMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <Box sx={{ width: 280, pt: 2 }} role="presentation">
                    {/* User Info in Drawer */}
                    <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.300' }}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {user?.name ?? 'User'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user?.email ?? 'user@example.com'}
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Divider />

                    {/* Navigation Items */}
                    <List>
                        {navigationItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton onClick={() => handleNavigation(item.path)}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider />

                    {/* Profile & Logout */}
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { handleProfile(); closeMobileMenu(); }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <User size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { handleLogout(); closeMobileMenu(); }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <LogOut size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Signout" sx={{ color: 'error.main' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}

export default Header
