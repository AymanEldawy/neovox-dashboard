import { useState } from "react";
import {
  Award,
  Star,
  Trophy,
  Medal,
  Crown,
  Zap,
  Target,
  TrendingUp,
  Heart,
  Gift,
  Sparkles,
  Plus,
  X,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
} from "lucide-react";

const BadgesManagement = () => {
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first task",
      icon: "star",
      category: "Beginner",
      requiredPoints: 10,
      requiredAction: "Complete 1 task",
      rarity: "common",
    },
    {
      id: 2,
      name: "Task Master",
      description: "Complete 50 tasks successfully",
      icon: "trophy",
      category: "Task Completion",
      requiredPoints: 500,
      requiredAction: "Complete 50 tasks",
      rarity: "rare",
    },
    {
      id: 3,
      name: "Investment Pro",
      description: "Make your first investment",
      icon: "trending-up",
      category: "Investment",
      requiredPoints: 100,
      requiredAction: "Make 1 investment",
      rarity: "uncommon",
    },
    {
      id: 4,
      name: "Loyalty Champion",
      description: "Active for 30 consecutive days",
      icon: "heart",
      category: "Engagement",
      requiredPoints: 300,
      requiredAction: "30 day streak",
      rarity: "epic",
    },
    {
      id: 5,
      name: "Golden Achiever",
      description: "Reach gold tier status",
      icon: "crown",
      category: "Status",
      requiredPoints: 1000,
      requiredAction: "Reach Gold tier",
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Speed Demon",
      description: "Complete 10 tasks in one day",
      icon: "zap",
      category: "Speed",
      requiredPoints: 200,
      requiredAction: "10 tasks in 24h",
      rarity: "rare",
    },
    {
      id: 7,
      name: "Perfect Score",
      description: "Achieve 100% accuracy in 20 tasks",
      icon: "target",
      category: "Accuracy",
      requiredPoints: 400,
      requiredAction: "100% accuracy 20 times",
      rarity: "epic",
    },
    {
      id: 8,
      name: "Generous Soul",
      description: "Refer 5 friends successfully",
      icon: "gift",
      category: "Referral",
      requiredPoints: 250,
      requiredAction: "Refer 5 users",
      rarity: "uncommon",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "star",
    category: "",
    requiredPoints: 0,
    requiredAction: "",
    rarity: "common",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRarity, setFilterRarity] = useState("all");

  const iconOptions = [
    { value: "star", icon: Star, label: "Star" },
    { value: "trophy", icon: Trophy, label: "Trophy" },
    { value: "medal", icon: Medal, label: "Medal" },
    { value: "crown", icon: Crown, label: "Crown" },
    { value: "zap", icon: Zap, label: "Lightning" },
    { value: "target", icon: Target, label: "Target" },
    { value: "trending-up", icon: TrendingUp, label: "Growth" },
    { value: "heart", icon: Heart, label: "Heart" },
    { value: "gift", icon: Gift, label: "Gift" },
    { value: "sparkles", icon: Sparkles, label: "Sparkles" },
  ];

  const rarityConfig = {
    common: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", glow: "" },
    uncommon: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", glow: "shadow-green-200" },
    rare: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", glow: "shadow-blue-200" },
    epic: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", glow: "shadow-purple-200" },
    legendary: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", glow: "shadow-yellow-200" },
  };

  const getIcon = (iconName) => {
    const iconObj = iconOptions.find((i) => i.value === iconName);
    return iconObj ? iconObj.icon : Star;
  };

  const handleOpenModal = (badge = null) => {
    if (badge) {
      setEditingBadge(badge);
      setFormData(badge);
    } else {
      setEditingBadge(null);
      setFormData({
        name: "",
        description: "",
        icon: "star",
        category: "",
        requiredPoints: 0,
        requiredAction: "",
        rarity: "common",
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingBadge) {
      setBadges(badges.map((b) => (b.id === editingBadge.id ? { ...formData, id: b.id } : b)));
    } else {
      setBadges([...badges, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this badge?")) {
      setBadges(badges.filter((b) => b.id !== id));
    }
  };

  const filteredBadges = badges.filter((badge) => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = filterRarity === "all" || badge.rarity === filterRarity;
    return matchesSearch && matchesRarity;
  });

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Badges Management</h1>
                  <p className="text-purple-100">Create and manage achievement badges</p>
                </div>
              </div>
              <button
                  onClick={() => handleOpenModal()}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Create Badge
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-purple-100 text-sm mb-1">Total Badges</p>
                <p className="text-3xl font-bold">{badges.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-purple-100 text-sm mb-1">Common</p>
                <p className="text-3xl font-bold">{badges.filter((b) => b.rarity === "common").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-purple-100 text-sm mb-1">Rare</p>
                <p className="text-3xl font-bold">{badges.filter((b) => b.rarity === "rare").length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-purple-100 text-sm mb-1">Legendary</p>
                <p className="text-3xl font-bold">{badges.filter((b) => b.rarity === "legendary").length}</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search badges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition appearance-none"
                >
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBadges.map((badge) => {
              const Icon = getIcon(badge.icon);
              const rarity = rarityConfig[badge.rarity] || rarityConfig.common;

              return (
                  <div
                      key={badge.id}
                      className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${rarity.border} ${rarity.glow} hover:shadow-2xl transition-all transform hover:-translate-y-1`}
                  >
                    {/* Badge Header */}
                    <div className={`${rarity.bg} p-6 flex flex-col items-center relative`}>
                  <span className={`absolute top-2 right-2 px-3 py-1 ${rarity.bg} ${rarity.text} rounded-full text-xs font-bold uppercase border ${rarity.border}`}>
                    {badge.rarity}
                  </span>
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3">
                        <Icon className={`w-10 h-10 ${rarity.text}`} />
                      </div>
                      <h3 className={`text-xl font-bold text-center ${rarity.text}`}>
                        {badge.name}
                      </h3>
                    </div>

                    {/* Badge Body */}
                    <div className="p-6 space-y-3">
                      <p className="text-sm text-gray-600 text-center min-h-10">
                        {badge.description}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Category:</span>
                          <span className="text-xs font-semibold text-gray-700 px-2 py-1 bg-gray-100 rounded">
                        {badge.category}
                      </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Points:</span>
                          <span className="text-xs font-bold text-purple-600">{badge.requiredPoints}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Action:</span>
                          <span className="text-xs font-medium text-gray-700">{badge.requiredAction}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4">
                        <button
                            onClick={() => handleOpenModal(badge)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                            onClick={() => handleDelete(badge.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredBadges.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">No badges found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
              </div>
          )}

          {/* Modal */}
          {showModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">
                        {editingBadge ? "Edit Badge" : "Create New Badge"}
                      </h2>
                      <button
                          onClick={() => setShowModal(false)}
                          className="p-2 hover:bg-white/20 rounded-lg transition"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Badge Name
                      </label>
                      <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          placeholder="e.g., First Steps"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition resize-none"
                          placeholder="Describe the badge achievement..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Icon
                      </label>
                      <div className="grid grid-cols-5 gap-3">
                        {iconOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                              <button
                                  key={option.value}
                                  onClick={() => setFormData({ ...formData, icon: option.value })}
                                  className={`p-4 border-2 rounded-xl transition ${
                                      formData.icon === option.value
                                          ? "border-purple-500 bg-purple-50"
                                          : "border-gray-200 hover:border-purple-300"
                                  }`}
                              >
                                <Icon className="w-6 h-6 mx-auto text-purple-600" />
                              </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                            placeholder="e.g., Beginner"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Required Points
                        </label>
                        <input
                            type="number"
                            value={formData.requiredPoints}
                            onChange={(e) =>
                                setFormData({ ...formData, requiredPoints: parseInt(e.target.value) || 0 })
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Required Action
                      </label>
                      <input
                          type="text"
                          value={formData.requiredAction}
                          onChange={(e) => setFormData({ ...formData, requiredAction: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          placeholder="e.g., Complete 10 tasks"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rarity
                      </label>
                      <select
                          value={formData.rarity}
                          onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      >
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                      </select>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {editingBadge ? "Update Badge" : "Create Badge"}
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default BadgesManagement;