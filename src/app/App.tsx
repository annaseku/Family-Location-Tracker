import { useState, useEffect } from "react";
import { FamilyMemberCard, FamilyMember } from "./components/family-member-card";
import { StatusOverview } from "./components/status-overview";
import { AddMemberForm } from "./components/add-member-form";
import supabase from "./server/supabase-client";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Load members from Supabase on mount
  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("FamilyMembers")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading members:", error);
      } else if (data) {
        // Convert database format to app format
        const formattedMembers: FamilyMember[] = data.map((member) => ({
          id: member.id,
          name: member.name,
          role: member.role,
          isHome: member.is_home,
          lastUpdated: member.last_updated ? new Date(member.last_updated) : undefined,
          color: member.color,
        }));
        setMembers(formattedMembers);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (name: string, role: string, color: string) => {
    console.log("Adding member:", { name, role, color });
    try {
      const { data, error } = await supabase
        .from("FamilyMembers")
        .insert([{
          name,
          role,
          color,
          is_home: false,
          last_updated: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        console.error("Error adding member:", error);
        alert(`Error adding member: ${error.message}`);
      } else if (data) {
        console.log("Member added successfully:", data);
        const newMember: FamilyMember = {
          id: data.id,
          name: data.name,
          role: data.role,
          isHome: data.is_home,
          color: data.color,
        };
        setMembers((prev) => [...prev, newMember]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error}`);
    }
  };

  const handleToggleStatus = async (id: string) => {
    console.log("Toggling status for member:", id);
    const member = members.find((m) => m.id === id);
    if (!member) {
      console.log("Member not found");
      return;
    }

    const newIsHome = !member.isHome;
    const newLastUpdated = new Date();

    console.log("New status:", { newIsHome, newLastUpdated });

    try {
      const { error } = await supabase
        .from("FamilyMembers")
        .update({
          is_home: newIsHome,
          last_updated: newLastUpdated.toISOString(),
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating member:", error);
        alert(`Error updating status: ${error.message}`);
      } else {
          console.log("Update successful");
        // Update local state after successful database update
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === id
              ? {
                  ...member,
                  isHome: newIsHome,
                  lastUpdated: newLastUpdated,
                }
              : member
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from("FamilyMembers")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting member:", error);
        alert(`Error deleting member: ${error.message}`);
      } else {
        setMembers((prev) => prev.filter((member) => member.id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error}`);
    }
  };

  const homeCount = members.filter((m) => m.isHome).length;
  const totalCount = members.length;

  // Format current time
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Family Home</h1>
            <p className="text-gray-500">Who's at home right now</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">{timeString}</p>
            <p className="text-sm text-gray-500">{dateString}</p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="mb-8">
          <StatusOverview homeCount={homeCount} totalCount={totalCount} />
        </div>

        {/* Family Status Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Family Status</h2>
            <button className="text-green-600 font-medium hover:text-green-700">
              See all
            </button>
          </div>
          
          <div className="space-y-4">
            {members.map((member) => (
              <FamilyMemberCard
                key={member.id}
                member={member}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteMember}
              />
            ))}
          </div>
        </div>

        {/* Add Member Form */}
        <div className="mb-6">
          <AddMemberForm onAddMember={handleAddMember} />
        </div>
      </div>
    </div>
  );
}

export default App;