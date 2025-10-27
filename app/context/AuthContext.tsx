import { createContext, useContext, useState, useEffect } from "react";
import { createLogger } from "~/utils/logger";
import type { User, AuthContextType } from "~/types";

const logger = createLogger('Auth');

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);
        setIsAuthenticated(true);
        logger.info('User session restored', { user: user });
      } else {
        logger.debug('No stored user session found');
      }
    } catch (error) {
      logger.error('Failed to restore user session', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      logout();
    } finally {
      setIsLoading(false);
    }
  }

  const register = ({ user, token }: { user: User; token: string }) => {
    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      logger.info('User registered successfully', { userId: user._id, email: user.email });
    } catch (error) {
      logger.error('Failed to persist user registration', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const login = ({ user, token }: { user: User; token: string }) => {
    
    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      logger.info('User logged in successfully', { userId: user._id, email: user.email });
    } catch (error) {
      logger.error('Failed to persist user login', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const updateUser = (updatedUser: User) => {
    try{
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      logger.info('User information updated', { userId: updatedUser._id });
    }catch(error){
      logger.error('Failed to update user information', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  const logout = () => {
    try {
      const userId = user?._id;
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      logger.info('User logged out successfully', { userId });
    } catch (error) {
      logger.error('Failed to complete logout', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
