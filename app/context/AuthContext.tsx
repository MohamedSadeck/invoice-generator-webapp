import { createContext, useContext, useState, useEffect } from "react";
import { createLogger } from "~/utils/logger";

const logger = createLogger('Auth');

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { user: User; token: string }) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        logger.info('User session restored', { userId: user.id });
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

  const login = ({ user, token }: { user: User; token: string }) => {
    
    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      logger.info('User logged in successfully', { userId: user.id, email: user.email });
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
      logger.info('User information updated', { userId: updatedUser.id });
    }catch(error){
      logger.error('Failed to update user information', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  const logout = () => {
    try {
      const userId = user?.id;
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
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
