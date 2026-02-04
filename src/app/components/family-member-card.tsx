import { Home as HomeIcon, MapPin, Trash2 } from "lucide-react";

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  isHome: boolean;
  lastUpdated?: Date;
  color: string;
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FamilyMemberCard({ member, onToggleStatus, onDelete }: FamilyMemberCardProps) {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const formatLastUpdated = (date?: Date, isHome?: boolean) => {
    if (!date) return "";
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes
    
    const action = isHome ? "Arrived" : "Left";
    if (diff < 1) return `${action} just now`;
    if (diff < 60) return `${action} ${diff}m ago`;
    if (diff < 120) return `${action} 1h ago`;
    return `${action} ${Math.floor(diff / 60)}h ago`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
        style={{ backgroundColor: member.color }}
      >
        {getInitial(member.name)}
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-gray-500">{member.role}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onToggleStatus(member.id)}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
            member.isHome
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {member.isHome ? (
            <>
              <HomeIcon className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Away</span>
            </>
          )}
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="px-3 py-1.5 rounded-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          aria-label={`Delete ${member.name}`}
        >
          <Trash2 className="w-4 h-4" />
          <span className="font-medium">Delete</span>
        </button>
        {member.lastUpdated && (
          <span className="text-sm text-gray-400">
            {formatLastUpdated(member.lastUpdated, member.isHome)}
          </span>
        )}
      </div>
    </div>
  );
}