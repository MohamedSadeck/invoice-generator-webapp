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

const Header = () => {
    const navigate = useNavigate();

    const handleScrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <nav className='nav-custom'>
                        <Link 
                            onClick={(e) => { e.preventDefault(); handleScrollToSection('features'); }} 
                            href='#features' 
                            className='link-custom'
                            sx={{ 
                                cursor: 'pointer',
                                color: 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            Features
                        </Link>
                        <Link 
                            onClick={(e) => { e.preventDefault(); handleScrollToSection('testimonials'); }} 
                            href='#testimonials' 
                            className='link-custom'
                            sx={{ 
                                cursor: 'pointer',
                                color: 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            Testimonials
                        </Link>
                        <Link 
                            onClick={(e) => { e.preventDefault(); handleScrollToSection('FAQ'); }} 
                            href='#FAQ' 
                            className='link-custom'
                            sx={{ 
                                cursor: 'pointer',
                                color: 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            FAQ
                        </Link>
                    </nav>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="outlined"
                        size="medium"
                        sx={{
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: 2
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/signup"
                        variant="contained"
                        size="medium"
                        sx={{
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: 2
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            </Box>
        </header>
    )
}

export default Header
