
import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Award,
    CheckCircle,
    DollarSign,
    Gift,
    Globe,
    Link as LinkIcon,
    Percent,
    Phone,
    Plus,
    Save,
    Settings,
    Trash2,
} from "lucide-react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaMailBulk,
    FaTelegram,
    FaTwitter,
    FaWhatsappSquare,
    FaYoutube,
} from "react-icons/fa";
import {
    getSocialLinks,
    getInitialGift,
    saveSocialLinks,
    saveWithdrawalFee,
    saveInitialGift,
    getWithdrawalSettings
} from "@/services/settingsService.ts";

// Define TypeScript interfaces
interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface WithdrawalFee {
    withdrawalTax: number;
    minWithdrawalAmount: number;
}

interface InitialGift {
    amount: number;
    currency: string;
    enabled: boolean;
}

interface PlatformOption {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const SettingsPage = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [withdrawalFee, setWithdrawalFee] = useState<WithdrawalFee>({ withdrawalTax: 0, minWithdrawalAmount: 0 });
    const [initialGift, setInitialGift] = useState<InitialGift>({ amount: 0, currency: "USD", enabled: false });
    const [showSuccess, setShowSuccess] = useState<{
        socialLinks: boolean;
        withdrawalFee: boolean;
        initialGift: boolean;
    }>({
        socialLinks: false,
        withdrawalFee: false,
        initialGift: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    const platformOptions: PlatformOption[] = [
        { value: "facebook", label: "Facebook", icon: FaFacebook, color: "text-blue-600" },
        { value: "twitter", label: "Twitter", icon: FaTwitter, color: "text-sky-500" },
        { value: "instagram", label: "Instagram", icon: FaInstagram, color: "text-pink-600" },
        { value: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "text-blue-700" },
        { value: "youtube", label: "YouTube", icon: FaYoutube, color: "text-red-600" },
        { value: "whatsapp", label: "WhatsApp", icon: FaWhatsappSquare, color: "text-green-600" },
        { value: "telegram", label: "Telegram", icon: FaTelegram, color: "text-blue-500" },
        { value: "email", label: "Email", icon: FaMailBulk, color: "text-gray-600" },
        { value: "phone", label: "Phone", icon: Phone, color: "text-indigo-600" },
        { value: "website", label: "Website", icon: Globe, color: "text-purple-600" },
    ];

    // Fetch settings for each section
    useEffect(() => {
        const loadSettings = async () => {
            try {
                setIsLoading(true);
                const [socialLinksData, withdrawalFeeData, initialGiftData] = await Promise.all([
                    getSocialLinks().then(res=> res.data ),
                    getWithdrawalSettings().then(res => res.data ),
                    getInitialGift().then(res => res.data ),
                ]);
                // Map social links to include icon from platformOptions
                const mappedSocialLinks = Array.isArray(socialLinksData) ? socialLinksData.map(link => {
                    const platform = platformOptions.find(p => p.value === link.platform) || platformOptions[9]; // Fallback to "website"
                    return {
                        id: link.id,
                        platform: link.platform,
                        url: link.url,
                        icon: platform.icon
                    };
                }) : [];
                setSocialLinks(mappedSocialLinks);
                setWithdrawalFee(withdrawalFeeData);
                setInitialGift(initialGiftData);
            } catch (error) {
                console.error("Failed to load settings:", error);
                setSocialLinks([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadSettings();
    }, []);

    const addSocialLink = () => {
        const newId = Math.max(...socialLinks.map((l) => l.id), 0) + 1;
        setSocialLinks([
            ...socialLinks,
            { id: newId, platform: "facebook", url: "", icon: FaFacebook },
        ]);
    };

    const removeSocialLink = (id: number) => {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
    };

    const updateSocialLink = (id: number, field: keyof SocialLink, value: string) => {
        setSocialLinks(
            socialLinks.map((link) => {
                if (link.id === id) {
                    if (field === "platform") {
                        const platform = platformOptions.find((p) => p.value === value) || platformOptions[9]; // Fallback to "website"
                        return { ...link, platform: value, icon: platform.icon };
                    }
                    return { ...link, [field]: value };
                }
                return link;
            })
        );
    };

    const handleSaveSocialLinks = async () => {
        try {
            await saveSocialLinks(socialLinks);
            setShowSuccess((prev) => ({ ...prev, socialLinks: true }));
        } catch (error) {
            console.error("Failed to save social links:", error);
        }
    };

    const handleSaveWithdrawalFee = async () => {
        try {
            await saveWithdrawalFee(withdrawalFee);
            setShowSuccess((prev) => ({ ...prev, withdrawalFee: true }));
        } catch (error) {
            console.error("Failed to save withdrawal fee:", error);
        }
    };

    const handleSaveInitialGift = async () => {
        try {
            await saveInitialGift(initialGift);
            setShowSuccess((prev) => ({ ...prev, initialGift: true }));
        } catch (error) {
            console.error("Failed to save initial gift:", error);
        }
    };

    const handleCloseSuccessDialog = (section: keyof typeof showSuccess) => {
        setShowSuccess((prev) => ({ ...prev, [section]: false }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
                <div className="text-indigo-600 text-xl font-semibold">Loading settings...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">System Settings</h1>
                                <p className="text-indigo-100">Configure social links, fees, and welcome gifts</p>
                            </div>
                        </div>
                        <Settings className="w-12 h-12 opacity-50" />
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Social Links Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <LinkIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
                                    <p className="text-sm text-gray-500">Add your social media and contact links</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={addSocialLink}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Link
                                </button>
                                <button
                                    onClick={handleSaveSocialLinks}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Social Links
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {Array.isArray(socialLinks) && socialLinks.length > 0 ? (
                                socialLinks.map((link) => {
                                    const platform = platformOptions.find((p) => p.value === link.platform) || platformOptions[9]; // Fallback to "website"
                                    const Icon = link.icon;

                                    return (
                                        <div
                                            key={link.id}
                                            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition"
                                        >
                                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                                                <Icon className={`w-6 h-6 ${platform.color}`} />
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <select
                                                    value={link.platform}
                                                    onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)}
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
                                                    onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                                                    placeholder={`Enter ${platform.label} URL`}
                                                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                                                />
                                            </div>

                                            <button
                                                onClick={() => removeSocialLink(link.id)}
                                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                                                title="Remove"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                                    <LinkIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
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
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <Percent className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Withdrawal Fee</h2>
                                    <p className="text-sm text-gray-500">Configure withdrawal fee percentage and limits</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSaveWithdrawalFee}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                            >
                                <Save className="w-5 h-5" />
                                Save Withdrawal Fee
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <Percent className="w-5 h-5 text-orange-600" />
                                    Fee Percentage
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={withdrawalFee.withdrawalTax}
                                        onChange={(e) =>
                                            setWithdrawalFee({
                                                ...withdrawalFee,
                                                withdrawalTax: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                        %
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Percentage charged on withdrawals</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    Minimum Withdrawal Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={withdrawalFee.minWithdrawalAmount}
                                        onChange={(e) =>
                                            setWithdrawalFee({
                                                ...withdrawalFee,
                                                minWithdrawalAmount: parseFloat(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum withdrawal amount</p>
                            </div>
                        </div>

                        {/* Fee Preview */}
                        <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                            <p className="text-sm font-semibold text-orange-900 mb-2">Fee Calculation Example:</p>
                            <div className="text-sm text-orange-700 space-y-1">
                                <p>
                                    • For $100 withdrawal: $
                                    {Math.max(
                                        withdrawalFee.minWithdrawalAmount,
                                        (100 * withdrawalFee.withdrawalTax) / 100
                                    ).toFixed(2)}{" "}
                                    fee
                                </p>
                                <p>
                                    • For $1000 withdrawal: $
                                    {Math.max(
                                        withdrawalFee.minWithdrawalAmount,
                                        (1000 * withdrawalFee.withdrawalTax) / 100
                                    ).toFixed(2)}{" "}
                                    fee
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Initial Gift Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Gift className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Welcome Gift</h2>
                                    <p className="text-sm text-gray-500">Initial balance gift for new users</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSaveInitialGift}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
                            >
                                <Save className="w-5 h-5" />
                                Save Welcome Gift
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <Award className="w-5 h-5 text-purple-600" />
                                    Gift Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
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
                                <p className="text-xs text-gray-500 mt-1">Amount given to new users</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    Currency
                                </label>
                                <select
                                    value={initialGift.currency}
                                    onChange={(e) => setInitialGift({ ...initialGift, currency: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                >
                                    <option value="USD">USD</option>
                                    {/*<option value="USDT">USDT</option>*/}
                                    {/*<option value="EUR">EUR</option>*/}
                                    {/*<option value="GBP">GBP</option>*/}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">Gift currency type</p>
                            </div>
                        </div>

                        {/* Gift Preview */}
                        {initialGift.enabled && (
                            <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <Gift className="w-6 h-6 text-purple-700" />
                                    <p className="text-lg font-bold text-purple-900">Welcome Gift Preview</p>
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
                </div>

                {/* Success Dialogs */}
                {showSuccess.socialLinks && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <h2 className="text-xl font-bold text-gray-900">Success</h2>
                            </div>
                            <p className="text-gray-600 mb-6">Social links saved successfully!</p>
                            <button
                                onClick={() => handleCloseSuccessDialog("socialLinks")}
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                {showSuccess.withdrawalFee && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <h2 className="text-xl font-bold text-gray-900">Success</h2>
                            </div>
                            <p className="text-gray-600 mb-6">Withdrawal fee saved successfully!</p>
                            <button
                                onClick={() => handleCloseSuccessDialog("withdrawalFee")}
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                {showSuccess.initialGift && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <h2 className="text-xl font-bold text-gray-900">Success</h2>
                            </div>
                            <p className="text-gray-600 mb-6">Initial gift saved successfully!</p>
                            <button
                                onClick={() => handleCloseSuccessDialog("initialGift")}
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;