/**
 * Custom React Hooks with Logging
 * 
 * Examples of how to integrate the logger with React hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { createLogger } from './logger';

const logger = createLogger('Hooks');

/**
 * Custom hook for API calls with logging
 */
export function useApiCall<T>(
  apiFunc: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        logger.debug('API call initiated', { 
          functionName: apiFunc.name || 'anonymous'
        });
        
        setLoading(true);
        setError(null);
        
        const result = await apiFunc();
        
        if (isMounted) {
          setData(result);
          logger.info('API call successful', { 
            functionName: apiFunc.name || 'anonymous',
            hasData: !!result
          });
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setError(error);
          logger.error('API call failed', { 
            functionName: apiFunc.name || 'anonymous',
            error: error.message 
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

/**
 * Custom hook for local storage with logging
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const hookLogger = createLogger(`LocalStorage:${key}`);

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      
      if (item) {
        hookLogger.debug('Retrieved from localStorage', { key });
        return JSON.parse(item);
      } else {
        hookLogger.debug('Using initial value', { key });
        return initialValue;
      }
    } catch (error) {
      hookLogger.error('Failed to read from localStorage', { 
        key,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        hookLogger.debug('Saved to localStorage', { key });
      } catch (error) {
        hookLogger.error('Failed to save to localStorage', { 
          key,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    },
    [key, storedValue, hookLogger]
  );

  return [storedValue, setValue];
}

/**
 * Custom hook for form handling with logging
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>
) {
  const hookLogger = createLogger('Form');
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((
    name: keyof T,
    value: any
  ) => {
    setValues(prev => {
      hookLogger.debug('Form field changed', { 
        field: String(name),
        hasValue: !!value 
      });
      return { ...prev, [name]: value };
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors, hookLogger]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    try {
      hookLogger.info('Form submission started');
      setIsSubmitting(true);
      setErrors({});
      
      await onSubmit(values);
      
      hookLogger.info('Form submission successful');
    } catch (error) {
      hookLogger.error('Form submission failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // You can set errors here if your API returns validation errors
      if (error instanceof Error) {
        throw error;
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, hookLogger]);

  const resetForm = useCallback(() => {
    hookLogger.debug('Form reset');
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues, hookLogger]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors,
  };
}

/**
 * Custom hook for debouncing with logging
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    logger.debug('Debounce timer started', { delay });
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      logger.debug('Debounced value updated');
    }, delay);

    return () => {
      logger.debug('Debounce timer cleared');
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for tracking component lifecycle with logging
 */
export function useLifecycleLogger(componentName: string) {
  const hookLogger = createLogger(componentName);

  useEffect(() => {
    hookLogger.debug('Component mounted');

    return () => {
      hookLogger.debug('Component unmounted');
    };
  }, [hookLogger]);

  useEffect(() => {
    hookLogger.debug('Component updated');
  });
}

export default {
  useApiCall,
  useLocalStorage,
  useForm,
  useDebounce,
  useLifecycleLogger,
};
