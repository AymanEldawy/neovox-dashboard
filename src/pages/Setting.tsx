import {useState} from "react";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    DollarSign,
    Facebook,
    Gift,
    Globe,
    Instagram,
    Link as LinkIcon,
    Linkedin,
    Mail,
    MessageCircle,
    Percent,
    Phone,
    Plus,
    Save,
    Settings,
    Trash2,
    Twitter,
    Youtube,
} from "lucide-react";

const SettingsPage = () => {
    const [socialLinks, setSocialLinks] = useState([
        {id: 1, platform: "facebook", url: "https://facebook.com/example", icon: Facebook},
        {id: 2, platform: "twitter", url: "https://twitter.com/example", icon: Twitter},
        {id: 3, platform: "instagram", url: "https://instagram.com/example", icon: Instagram},
    ]);

    const [withdrawalFee, setWithdrawalFee] = useState({
        percentage: 2.5,
        minFee: 1,
        maxFee: 50,
    });

    const [initialGift, setInitialGift] = useState({
        amount: 10,
        currency: "USD",
        enabled: true,
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const platformOptions = [
        {value: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600"},
        {value: "twitter", label: "Twitter", icon: Twitter, color: "text-sky-500"},
        {value: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-600"},
        {value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-700"},
        {value: "youtube", label: "YouTube", icon: Youtube, color: "text-red-600"},
        {value: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "text-green-600"},
        {value: "telegram", label: "Telegram", icon: MessageCircle, color: "text-blue-500"},
        {value: "email", label: "Email", icon: Mail, color: "text-gray-600"},
        {value: "phone", label: "Phone", icon: Phone, color: "text-indigo-600"},
        {value: "website", label: "Website", icon: Globe, color: "text-purple-600"},
    ];

    const addSocialLink = () => {
        const newId = Math.max(...socialLinks.map((l) => l.id), 0) + 1;
        setSocialLinks([
            ...socialLinks,
            {id: newId, platform: "facebook", url: "", icon: Facebook},
        ]);
    };

    const removeSocialLink = (id) => {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
    };

    const updateSocialLink = (id, field, value) => {
        setSocialLinks(
            socialLinks.map((link) => {
                if (link.id === id) {
                    if (field === "platform") {
                        const platform = platformOptions.find((p) => p.value === value);
                        return {...link, platform: value, icon: platform.icon};
                    }
                    return {...link, [field]: value};
                }
                return link;
            })
        );
    };

    const handleSaveSettings = () => {
        console.log("Saving settings:", {
            socialLinks,
            withdrawalFee,
            initialGift,
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition">
                                <ArrowLeft className="w-6 h-6"/>
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">System Settings</h1>
                                <p className="text-indigo-100">
                                    Configure social links, fees, and welcome gifts
                                </p>
                            </div>
                        </div>
                        <Settings className="w-12 h-12 opacity-50"/>
                    </div>
                </div>

                {/* Success Alert */}
                {showSuccess && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600"/>
                        <span className="text-green-800 font-medium">
              Settings saved successfully!
            </span>
                    </div>
                )}

                <div className="space-y-8">
                    {/* Social Links Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <LinkIcon className="w-6 h-6 text-blue-600"/>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
                                    <p className="text-sm text-gray-500">
                                        Add your social media and contact links
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={addSocialLink}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
                            >
                                <Plus className="w-5 h-5"/>
                                Add Link
                            </button>
                        </div>

                        <div className="space-y-4">
                            {socialLinks.map((link, index) => {
                                const platform = platformOptions.find((p) => p.value === link.platform);
                                const Icon = platform?.icon || Globe;

                                return (
                                    <div
                                        key={link.id}
                                        className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition"
                                    >
                                        <div
                                            className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                                            <Icon className={`w-6 h-6 ${platform?.color || "text-gray-600"}`}/>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <select
                                                value={link.platform}
                                                onChange={(e) =>
                                                    updateSocialLink(link.id, "platform", e.target.value)
                                                }
                                                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                            >
                                                {platformOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="text"
                                                value={link.url}
                                                onChange={(e) =>
                                                    updateSocialLink(link.id, "url", e.target.value)
                                                }
                                                placeholder={`Enter ${platform?.label} URL`}
                                                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                            />
                                        </div>

                                        <button
                                            onClick={() => removeSocialLink(link.id)}
                                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                                            title="Remove"
                                        >
                                            <Trash2 className="w-5 h-5"/>
                                        </button>
                                    </div>
                                );
                            })}

                            {socialLinks.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                                    <LinkIcon className="w-12 h-12 text-gray-300 mx-auto mb-3"/>
                                    <p className="text-gray-500">No social links added yet</p>
                                    <button
                                        onClick={addSocialLink}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Add First Link
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Withdrawal Fee Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <Percent className="w-6 h-6 text-orange-600"/>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Withdrawal Fee</h2>
                                <p className="text-sm text-gray-500">
                                    Configure withdrawal fee percentage and limits
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <Percent className="w-5 h-5 text-orange-600"/>
                                    Fee Percentage
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={withdrawalFee.percentage}
                                        onChange={(e) =>
                                            setWithdrawalFee({
                                                ...withdrawalFee,
                                                percentage: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                                    />
                                    <span
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    %
                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Percentage charged on withdrawals
                                </p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <DollarSign className="w-5 h-5 text-green-600"/>
                                    Minimum Fee
                                </label>
                                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={withdrawalFee.minFee}
                                        onChange={(e) =>
                                            setWithdrawalFee({
                                                ...withdrawalFee,
                                                minFee: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum fee amount</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <DollarSign className="w-5 h-5 text-red-600"/>
                                    Maximum Fee
                                </label>
                                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={withdrawalFee.maxFee}
                                        onChange={(e) =>
                                            setWithdrawalFee({
                                                ...withdrawalFee,
                                                maxFee: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Maximum fee cap</p>
                            </div>
                        </div>

                        {/* Fee Preview */}
                        <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                            <p className="text-sm font-semibold text-orange-900 mb-2">
                                Fee Calculation Example:
                            </p>
                            <div className="text-sm text-orange-700 space-y-1">
                                <p>
                                    • For $100 withdrawal: $
                                    {Math.max(
                                        withdrawalFee.minFee,
                                        Math.min((100 * withdrawalFee.percentage) / 100, withdrawalFee.maxFee)
                                    ).toFixed(2)}{" "}
                                    fee
                                </p>
                                <p>
                                    • For $1000 withdrawal: $
                                    {Math.max(
                                        withdrawalFee.minFee,
                                        Math.min((1000 * withdrawalFee.percentage) / 100, withdrawalFee.maxFee)
                                    ).toFixed(2)}{" "}
                                    fee
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Initial Gift Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Gift className="w-6 h-6 text-purple-600"/>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Welcome Gift</h2>
                                <p className="text-sm text-gray-500">
                                    Initial balance gift for new users
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <Award className="w-5 h-5 text-purple-600"/>
                                    Gift Amount
                                </label>
                                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={initialGift.amount}
                                        onChange={(e) =>
                                            setInitialGift({
                                                ...initialGift,
                                                amount: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Amount given to new users
                                </p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <DollarSign className="w-5 h-5 text-green-600"/>
                                    Currency
                                </label>
                                <select
                                    value={initialGift.currency}
                                    onChange={(e) =>
                                        setInitialGift({...initialGift, currency: e.target.value})
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                >
                                    <option value="USD">USD</option>
                                    <option value="USDT">USDT</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">Gift currency type</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600"/>
                                    Status
                                </label>
                                <div
                                    className={`relative w-full h-[50px] rounded-xl cursor-pointer transition ${
                                        initialGift.enabled ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                    onClick={() =>
                                        setInitialGift({...initialGift, enabled: !initialGift.enabled})
                                    }
                                >
                                    <div
                                        className={`absolute top-1 left-1 h-[42px] bg-white rounded-lg transition-all duration-300 flex items-center justify-center font-bold ${
                                            initialGift.enabled
                                                ? "w-[calc(50%-4px)] translate-x-[calc(100%+8px)]"
                                                : "w-[calc(50%-4px)]"
                                        }`}
                                    >
                                        {initialGift.enabled ? (
                                            <span className="text-green-600">Enabled</span>
                                        ) : (
                                            <span className="text-gray-600">Disabled</span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {initialGift.enabled ? "Gift is active" : "Gift is inactive"}
                                </p>
                            </div>
                        </div>

                        {/* Gift Preview */}
                        {initialGift.enabled && (
                            <div
                                className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <Gift className="w-6 h-6 text-purple-700"/>
                                    <p className="text-lg font-bold text-purple-900">
                                        Welcome Gift Preview
                                    </p>
                                </div>
                                <p className="text-purple-700">
                                    New users will receive{" "}
                                    <span className="font-bold text-xl">
                    ${initialGift.amount} {initialGift.currency}
                  </span>{" "}
                                    as their initial balance when they sign up!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-4">
                        <button
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveSettings}
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            <Save className="w-5 h-5"/>
                            Save All Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;