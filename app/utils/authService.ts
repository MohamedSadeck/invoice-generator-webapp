/**
 * Authentication Service
 * 
 * Service layer for authentication-related API operations
 * Demonstrates proper logger usage with auth flows
 */

import axiosInstance from './axiosInstance';
import { API_PATHS } from './apiPaths';
import { createLogger } from './logger';
import toast from 'react-hot-toast';

const logger = createLogger('AuthService');

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  try {
    logger.info('Attempting user registration', { 
      email: data.email,
      name: data.name 
    });
    
    const response = await axiosInstance.post<AuthResponse>(
      API_PATHS.AUTH.REGISTER,
      data
    );
    
    // Store token
    localStorage.setItem('token', response.data.token);
    
    logger.info('User registered successfully', { 
      userId: response.data.user.id,
      email: response.data.user.email 
    });
    
    toast.success('Registration successful');
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Registration failed. Please try again.';
    logger.error('Registration failed', {
      email: data.email,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    logger.info('Attempting user login', { email: data.email });
    
    const response = await axiosInstance.post<AuthResponse>(
      API_PATHS.AUTH.LOGIN,
      data
    );
    
    // Store token
    localStorage.setItem('token', response.data.token);
    
    logger.info('User logged in successfully', { 
      userId: response.data.user.id,
      email: response.data.user.email 
    });
    
    toast.success('Login successful');
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Login failed. Please check your credentials.';
    logger.error('Login failed', {
      email: data.email,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    logger.debug('Fetching current user profile');
    
    const response = await axiosInstance.get<User>(API_PATHS.AUTH.GET_ME);
    
    logger.info('User profile fetched successfully', { 
      userId: response.data.id 
    });
    
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to fetch user profile';
    logger.error('Failed to fetch user profile', {
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    // Don't show toast for silent profile fetch failures
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  try {
    logger.info('Updating user profile', { 
      fields: Object.keys(data) 
    });
    
    const response = await axiosInstance.put<User>(
      API_PATHS.AUTH.UPDATE_PROFILE,
      data
    );
    
    logger.info('User profile updated successfully', { 
      userId: response.data.id 
    });
    
    toast.success('Profile updated successfully');
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to update profile';
    logger.error('Failed to update profile', {
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = (): void => {
  try {
    logger.info('User logging out');
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    logger.info('User logged out successfully');
    
    toast.success('Logged out successfully');
  } catch (error) {
    logger.error('Logout encountered an error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    // Still clear storage even if error occurs
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const hasToken = !!token;
  
  logger.debug('Authentication check', { hasToken });
  
  return hasToken;
};

export default {
  register,
  login,
  getCurrentUser,
  updateProfile,
  logout,
  isAuthenticated,
};
