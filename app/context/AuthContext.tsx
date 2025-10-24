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
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token/user on mount
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);
        logger.info('User session restored', { userId: user.id });
      } else {
        logger.debug('No stored user session found');
      }
    } catch (error) {
      logger.error('Failed to restore user session', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (user: User) => {
    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      logger.info('User logged in successfully', { userId: user.id, email: user.email });
    } catch (error) {
      logger.error('Failed to persist user login', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const logout = () => {
    try {
      const userId = user?.id;
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
