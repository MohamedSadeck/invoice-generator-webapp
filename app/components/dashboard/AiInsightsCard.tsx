import { Box, Typography } from "@mui/material";
import { Sparkles, Lightbulb, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import type { DashboardSummaryResponse } from "~/types";

const AiInsightsCard = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<DashboardSummaryResponse>(
          API_PATHS.AI.GET_DASHBOARD_SUMMARY
        );
        
        if (response.data.success && response.data.data.insights) {
          setInsights(response.data.data.insights);
        }
      } catch (error) {
        logger.error('Error fetching dashboard summary', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        // Set empty insights on error
        setInsights([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 3,
        border: '1px solid rgb(226, 232, 240)',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 100%)',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Sparkles className="h-5 w-5 text-white" />
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'white'
            }}
          >
            AI Insights
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            Personalized recommendations for your business
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 6
            }}
          >
            <Loader2 className="animate-spin h-8 w-8 text-indigo-500 mb-3" />
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'rgb(107, 114, 128)'
              }}
            >
              Generating insights...
            </Typography>
          </Box>
        ) : insights.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {insights.map((insight, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: 'rgb(249, 250, 251)',
                  border: '1px solid rgb(243, 244, 246)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgb(243, 244, 246)',
                    borderColor: 'rgb(226, 232, 240)'
                  }
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgb(226, 232, 240)'
                  }}
                >
                  <Lightbulb className="h-4 w-4 text-indigo-500" />
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'rgb(55, 65, 81)',
                    flex: 1
                  }}
                >
                  {insight}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 6,
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'rgb(243, 244, 246)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <Lightbulb className="h-6 w-6 text-gray-400" />
            </Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'rgb(107, 114, 128)',
                mb: 0.5
              }}
            >
              No insights available
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'rgb(156, 163, 175)',
                maxWidth: '280px'
              }}
            >
              Create more invoices to receive personalized insights about your business
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AiInsightsCard;
