import { Box, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";

export interface StatData {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: "blue" | "green" | "red";
}

interface StatsCardsProps {
  stats: StatData[];
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const colorClasses = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    red: { bg: "bg-red-100", text: "text-red-600" },
  } as const;

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 3
    }}>
      {stats.map((stat, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: 'white',
            p: 2,
            borderRadius: 3,
            border: '1px solid rgb(226, 232, 240)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              flexShrink: 0,
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: stat.color === 'blue' ? 'rgb(219, 234, 254)' :
                stat.color === 'green' ? 'rgb(220, 252, 231)' :
                  'rgb(254, 226, 226)'
            }}>
              <stat.icon className={`h-6 w-6 ${colorClasses[stat.color].text}`} />
            </Box>
            <Box sx={{ ml: 2, minWidth: 0, flex: 1 }}>
              <Typography variant="body1" sx={{ fontSize: '0.875rem', color: 'rgb(71, 85, 105)' }}>
                {stat.label}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'rgb(15, 23, 42)' }}>
                {stat.value}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsCards;
