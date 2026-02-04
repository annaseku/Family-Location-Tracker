import { Home as HomeIcon, Users } from "lucide-react";

interface StatusOverviewProps {
  homeCount: number;
  totalCount: number;
}

export function StatusOverview({ homeCount, totalCount }: StatusOverviewProps) {
  const percentage = totalCount > 0 ? (homeCount / totalCount) * 100 : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
          <HomeIcon className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Home</h2>
          <p className="text-gray-500">Current status</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#10b981"
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900">{homeCount}</span>
            <span className="text-gray-500">of {totalCount} home</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl text-gray-900 mb-2">
            {homeCount} family member{homeCount !== 1 ? "s" : ""} at home
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Users className="w-5 h-5" />
            <span>{totalCount} family members</span>
          </div>
        </div>
      </div>
    </div>
  );
}
