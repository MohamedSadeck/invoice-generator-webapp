import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { createLogger } from "~/utils/logger";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";

const logger = createLogger('Login');

const Login = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldsError, setFieldsError] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: ""
  });

  const [touched, setTouched] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false
  });

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const { email, password } = formData;
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name as keyof typeof touched]) {
      let error = "";
      switch (name) {
        case "email":
          error = validateEmail(value);
          break;
        case "password":
          error = validatePassword(value);
          break;
      }
      setFieldsError((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    let error = "";
    switch (field) {
      case "email":
        error = validateEmail(formData.email);
        break;
      case "password":
        error = validatePassword(formData.password);
        break;
    }
    setFieldsError((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setFieldsError({
      email: emailError,
      password: passwordError,
    });

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    // If there are any errors, don't submit
    if (emailError || passwordError) {
      setError("Please fix all errors before submitting");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      logger.info('Login attempt', { email });
      
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const data = response.data;

      login({ user: { id: data.id, name: data.name, email: data.email }, token: data.token });
      
      logger.info('Login successful', { email });
      navigate("/dashboard");
    } catch (error) {
      logger.error('Login failed', { 
        email, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ 
          mt: 3,
          "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
            WebkitBoxShadow: "0 0 0 100px white inset !important",
            boxShadow: "0 0 0 100px white inset !important",
            WebkitTextFillColor: "black !important",
            color: "black !important",
            transition: "background-color 5000s ease-in-out 0s",
          },
        }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleInputChange}
            onBlur={() => handleBlur("email")}
            error={touched.email && !!fieldsError.email}
            helperText={touched.email && fieldsError.email}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={handleInputChange}
            onBlur={() => handleBlur("password")}
            error={touched.password && !!fieldsError.password}
            helperText={touched.password && fieldsError.password}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              bgcolor: "grey.900",
              "&:hover": {
                bgcolor: "grey.800",
              },
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <Typography variant="body2" align="center" color="text.secondary">
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/signup"
              sx={{
                color: "grey.900",
                fontWeight: "medium",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

