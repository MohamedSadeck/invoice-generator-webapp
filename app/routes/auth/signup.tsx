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
import axiosInstance from "~/utils/axiosInstance";
import { API_PATHS } from "~/utils/apiPaths";

const logger = createLogger('Signup');

const Signup = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  
  const [showPassword, setShowPassword]= useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword]= useState<boolean>(false);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldsError, setFieldsError] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  }>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return "Name is required";
    }
    return "";
  };

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

  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword) {
      return "Confirm Password is required";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const { name, email, password, confirmPassword } = formData;

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name as keyof typeof touched]) {
      let error = "";
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "password":
          error = validatePassword(value);
          break;
        case "confirmPassword":
          error = validateConfirmPassword(value, formData.password);
          break;
      }
      setFieldsError((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    let error = "";
    switch (field) {
      case "name":
        error = validateName(formData.name);
        break;
      case "email":
        error = validateEmail(formData.email);
        break;
      case "password":
        error = validatePassword(formData.password);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(formData.confirmPassword, formData.password);
        break;
    }
    setFieldsError((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    setFieldsError({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // If there are any errors, don't submit
    if (nameError || emailError || passwordError || confirmPasswordError) {
      setError("Please fix all errors before submitting");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      logger.info('Signup attempt', { email, name });
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name,
        email,
        password,
      });

      const data = response.data.data;
      register({ user: { id: data.id, name: data.name, email: data.email }, token: data.token });

      logger.info('Signup successful', { email, name });
      setSuccess("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to create account. Please try again.";
      logger.error('Signup failed', { 
        email, 
        name,
        error: error instanceof Error ? error.message : 'Unknown error',
        backendMessage: errorMessage
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">
          Sign Up
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
            id="name"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={handleInputChange}
            onBlur={() => handleBlur("name")}
            error={touched.name && !!fieldsError.name}
            helperText={touched.name && fieldsError.name}
            margin="normal"
            required
          />

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

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={handleInputChange}
            onBlur={() => handleBlur("confirmPassword")}
            error={touched.confirmPassword && !!fieldsError.confirmPassword}
            helperText={touched.confirmPassword && fieldsError.confirmPassword}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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

          {success && (
            <Typography color="success.main" variant="body2" sx={{ mt: 2 }}>
              {success}
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <Typography variant="body2" align="center" color="text.secondary">
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/login"
              sx={{
                color: "grey.900",
                fontWeight: "medium",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;

