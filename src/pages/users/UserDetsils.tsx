import React, { useState, useEffect } from 'react';
import {
    Award,
    Calendar,
    CheckCircle,
    ChevronRight,
    Clock,
    DollarSign,
    Gift,
    Mail,
    Phone,
    Shield,
    Star,
    Target,
    TrendingUp,
    Zap,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '@/services/userService';

interface Investment {
    id: string;
    investmentAmount: string;
    currentValue: string;
    state: string;
    progress: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isCompleted: boolean;
    accelerationDays: number;
    boostsUsed: number;
    createdAt: string;
}

interface User {
    id: string;
    verified: boolean;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    profileImageUrl: string | null;
    profileCompleted: boolean;
    creditBalance: number;
    availableBalance: number;
    lockedBalance: number;
    balance: number;
    totalEarnings: number;
    dailyEarning: number;
    currentTier: string;
    taskAccuracy: number | null;
    currentStreak: number;
    tasksCompleted: number;
    points: number;
    level: number;
    badges: any[];
    dailyTasksCompleted: number;
    lastDailyReset: string | null;
    referralCode: string;
    createdAt: string;
    updatedAt: string;
    userInvestments: Investment[];
}

const UserDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getUserById(id)
                .then((data) => {
                    setUser(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to fetch user details.');
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
                return 'bg-green-100 text-green-800 border-green-300';
            case 'pro':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'enterprise':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const handleBack = () => {
        navigate('/users');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <span className="text-red-800 font-medium">{error || 'User not found'}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Profile Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
                    <div className={`h-48 bg-gradient-to-r ${getTierColor(user.currentTier)} relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        {user.verified && (
                            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-white" />
                                <span className="text-white font-semibold">Verified</span>
                            </div>
                        )}
                    </div>

                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-10">
                            <div className="relative">
                                {user.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="w-40 h-40 rounded-3xl shadow-2xl border-8 border-white object-cover"
                                    />
                                ) : (
                                    <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center text-white text-5xl font-bold border-8 border-white">
                                        {user.firstName?.[0]}
                                        {user.lastName?.[0]}
                                    </div>
                                )}

                                <div
                                    className={`absolute -bottom-2 -right-2 px-4 py-2 rounded-xl border-2 ${getTierBadge(
                                        user.currentTier
                                    )} font-bold uppercase text-sm shadow-lg`}
                                >
                                    {user.currentTier}
                                </div>
                            </div>

                            <div className="flex-1 relative  z-10">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2 relative z-10">
                                    {user.firstName} {user.lastName}
                                </h1>

                                <div className="flex flex-wrap gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm">{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Shield className="w-4 h-4" />
                                        <span className="text-sm capitalize">{user.role}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="w-10 h-10 opacity-80" />
                            <div className="text-right">
                                <p className="text-blue-100 text-sm mb-1">Total Balance</p>
                                <p className="text-4xl font-bold">${user.balance}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-blue-400/30">
                            <div>
                                <p className="text-blue-100 text-xs">Available</p>
                                <p className="font-bold text-lg">${user.availableBalance}</p>
                            </div>
                            <div>
                                <p className="text-blue-100 text-xs">Locked</p>
                                <p className="font-bold text-lg">${user.lockedBalance}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <TrendingUp className="w-10 h-10 opacity-80" />
                            <div className="text-right">
                                <p className="text-green-100 text-sm mb-1">Total Earnings</p>
                                <p className="text-4xl font-bold">${user.totalEarnings}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-green-400/30">
                            <p className="text-green-100 text-xs">Today</p>
                            <p className="font-bold text-lg">${user.dailyEarning}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <Star className="w-10 h-10 opacity-80" />
                            <div className="text-right">
                                <p className="text-purple-100 text-sm mb-1">Points</p>
                                <p className="text-4xl font-bold">{user.points}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-purple-400/30">
                            <p className="text-purple-100 text-xs">Level</p>
                            <p className="font-bold text-lg">Level {user.level}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <Target className="w-10 h-10 opacity-80" />
                            <div className="text-right">
                                <p className="text-orange-100 text-sm mb-1">Tasks Completed</p>
                                <p className="text-4xl font-bold">{user.tasksCompleted}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-orange-400/30">
                            <p className="text-orange-100 text-xs">Today</p>
                            <p className="font-bold text-lg">{user.dailyTasksCompleted}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Performance & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Activity Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-yellow-500" />
                                Activity Stats
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                    <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-blue-600">{user.currentStreak}</p>
                                    <p className="text-sm text-gray-600 mt-1">Streak Days</p>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-green-600">{user.taskAccuracy || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 mt-1">Task Accuracy</p>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-purple-600">{user.badges?.length || 0}</p>
                                    <p className="text-sm text-gray-600 mt-1">Badges</p>
                                </div>
                            </div>
                        </div>

                        {/* Credit Balance Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Gift className="w-8 h-8" />
                                    <div>
                                        <h3 className="text-xl font-bold">Credit Balance</h3>
                                        <p className="text-indigo-100 text-sm">Available for use</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-5xl font-bold">{user.creditBalance}</p>
                                    <p className="text-indigo-100 text-sm">Points</p>
                                </div>
                            </div>
                        </div>

                        {/* Investments Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <TrendingUp className="w-6 h-6 text-green-500" />
                                Investments
                            </h2>

                            {user.userInvestments && user.userInvestments.length > 0 ? (
                                <div className="space-y-4">
                                    {user.userInvestments.map((investment) => (
                                        <div
                                            key={investment.id}
                                            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    investment.isCompleted
                                        ? 'bg-green-100 text-green-800'
                                        : investment.isActive
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                              {investment.state}
                            </span>
                                                        {investment.isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                                        <div>
                                                            <p className="text-xs text-gray-500">Investment Amount</p>
                                                            <p className="text-lg font-bold text-gray-900">${investment.investmentAmount}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Current Value</p>
                                                            <p className="text-lg font-bold text-green-600">${investment.currentValue}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-green-600">
                                                        +
                                                        {(
                                                            ((parseFloat(investment.currentValue) - parseFloat(investment.investmentAmount)) /
                                                                parseFloat(investment.investmentAmount)) *
                                                            100
                                                        ).toFixed(1)}
                                                        %
                                                    </p>
                                                    <p className="text-xs text-gray-500">Profit</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{new Date(investment.startDate).toLocaleDateString()}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4" />
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{new Date(investment.endDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                                    <span>Progress</span>
                                                    <span>{investment.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${investment.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No investments currently</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Account Status */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Status</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Profile Completed</span>
                                    {user.profileCompleted ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <Clock className="w-5 h-5 text-orange-600" />
                                    )}
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Account Verified</span>
                                    {user.verified ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <Clock className="w-5 h-5 text-orange-600" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Referral Code */}
                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">Referral Code</h3>
                            <p className="text-pink-100 text-sm mb-4">Share this code with your friends</p>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                                <p className="text-3xl font-bold tracking-wider">{user.referralCode}</p>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b">
                                    <span className="text-gray-600 text-sm">Last Updated</span>
                                    <span className="font-semibold text-gray-900 text-sm">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                                </div>

                                <div className="flex justify-between items-center pb-3 border-b">
                                    <span className="text-gray-600 text-sm">Last Daily Reset</span>
                                    <span className="font-semibold text-gray-900 text-sm">
                    {user.lastDailyReset ? new Date(user.lastDailyReset).toLocaleDateString() : 'N/A'}
                  </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">User ID</span>
                                    <span className="font-mono text-xs text-gray-500">{user.id.slice(0, 8)}...</span>
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
                        <ArrowLeft className="w-5 h-5" />
                        Back to Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;