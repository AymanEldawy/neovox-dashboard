import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Users,
    Award,
    TrendingUp,
    Calendar,
    Shield,
    Target,
    Crown,
    Mail,
    Phone,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import { getTeamById } from '@/services/teamService';

interface TeamMember {
    id: string;
    role: string;
    joinedAt: string;
    contribution: string;
    taskCount: number;
    isActive: boolean;
}

interface Leader {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    balance: number;
    points: number;
    level: number;
    tasksCompleted: number;
    currentTier: string;
}

interface Team {
    id: string;
    name: string;
    tier: string;
    maxMembers: number;
    currentMembers: number;
    description: string;
    isActive: boolean;
    createdAt: string;
    teamMembers: TeamMember[];
    teamMissions: any[];
    teamRewards: any[];
    leader: Leader;
}

const TeamDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getTeamById(id)
                .then((data) => {
                    setTeam(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to fetch team details.');
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [id]);

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'starter':
                return 'from-green-500 to-emerald-600';
            case 'pro':
                return 'from-blue-500 to-indigo-600';
            case 'enterprise':
                return 'from-purple-500 to-pink-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getTierBadge = (tier: string) => {
        switch (tier) {
            case 'starter':
                return 'bg-green-100 text-green-800';
            case 'pro':
                return 'bg-blue-100 text-blue-800';
            case 'enterprise':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleBack = () => {
        navigate('/teams');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error || !team) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <span className="text-red-800 font-medium">{error || 'Team not found'}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className={`bg-gradient-to-r ${getTierColor(team.tier)} rounded-2xl shadow-2xl p-8 mb-8 text-white`}>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <Crown className="w-8 h-8" />
                                <h1 className="text-4xl font-bold">{team.name}</h1>
                            </div>
                            <p className="text-white/90 text-lg mb-4">{team.description || 'No description'}</p>
                            <div className="flex items-center gap-4">
                <span
                    className={`px-4 py-2 rounded-full ${getTierBadge(team.tier)} font-semibold uppercase text-sm`}
                >
                  {team.tier}
                </span>
                                <span
                                    className={`px-4 py-2 rounded-full ${
                                        team.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    } font-semibold`}
                                >
                  {team.isActive ? 'Active' : 'Inactive'}
                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <Calendar className="w-6 h-6 inline-block mb-2" />
                            <p className="text-sm text-white/80">Created At</p>
                            <p className="font-semibold">{new Date(team.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Current Members</p>
                                <p className="text-3xl font-bold text-gray-800">{team.currentMembers}</p>
                            </div>
                            <Users className="w-12 h-12 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Max Members</p>
                                <p className="text-3xl font-bold text-gray-800">{team.maxMembers}</p>
                            </div>
                            <Shield className="w-12 h-12 text-purple-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Missions</p>
                                <p className="text-3xl font-bold text-gray-800">{team.teamMissions?.length || 0}</p>
                            </div>
                            <Target className="w-12 h-12 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Rewards</p>
                                <p className="text-3xl font-bold text-gray-800">{team.teamRewards?.length || 0}</p>
                            </div>
                            <Award className="w-12 h-12 text-yellow-500" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Team Members Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-6 h-6 text-blue-500" />
                                <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
                            </div>

                            {team.teamMembers && team.teamMembers.length > 0 ? (
                                <div className="space-y-4">
                                    {team.teamMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {member.role[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{member.role}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Joined: {new Date(member.joinedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Contribution</p>
                                                        <p className="font-bold text-green-600">${member.contribution}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Tasks</p>
                                                        <p className="font-bold text-blue-600">{member.taskCount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No team members currently</p>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Occupancy Rate</h3>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${getTierColor(team.tier)} transition-all duration-500`}
                                        style={{ width: `${(team.currentMembers / team.maxMembers) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-center mt-2 text-sm font-semibold text-gray-600">
                                    {team.currentMembers} of {team.maxMembers} (
                                    {Math.round((team.currentMembers / team.maxMembers) * 100)}%)
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Team Leader Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Crown className="w-6 h-6 text-yellow-500" />
                                <h2 className="text-2xl font-bold text-gray-800">Team Leader</h2>
                            </div>

                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                                    {team.leader.firstName[0]}{team.leader.lastName[0]}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {team.leader.firstName} {team.leader.lastName}
                                </h3>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getTierBadge(
                                        team.leader.currentTier
                                    )}`}
                                >
                  {team.leader.currentTier}
                </span>
                            </div>

                            <div className="space-y-3 border-t pt-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">{team.leader.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">{team.leader.phone}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">{team.leader.balance}</p>
                                    <p className="text-xs text-gray-500">Balance</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">{team.leader.points}</p>
                                    <p className="text-xs text-gray-500">Points</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-purple-600">{team.leader.level}</p>
                                    <p className="text-xs text-gray-500">Level</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-orange-600">{team.leader.tasksCompleted}</p>
                                    <p className="text-xs text-gray-500">Tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <button
                        onClick={handleBack}
                        className="w-full max-w-xs mx-auto bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" /> Back to Teams
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamDetailsPage;