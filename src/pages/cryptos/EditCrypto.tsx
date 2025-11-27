import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit2, X, Check, Loader } from 'lucide-react';
import { updateCrypto, getCryptoById } from "@/services/cryptoService.ts";

interface Wallet {
    link: string;
    maxAmount: number;
    isActive: boolean;
}

interface FormData {
    method: string;
    currency: string;
    address: { [key: string]: Wallet[] };
    networks: string[];
}

const EditCrypto = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [formData, setFormData] = useState<FormData>({
        method: 'crypto',
        currency: '',
        address: {},
        networks: [],
    });

    const [activeTab, setActiveTab] = useState<string>('');
    const [newWallet, setNewWallet] = useState<Wallet>({ link: '', maxAmount: 10000, isActive: true });
    const [editingAddress, setEditingAddress] = useState<{
        network: string;
        index: number;
        data: Wallet;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Load crypto data
    useEffect(() => {
        if (id) {
            setLoading(true);
            getCryptoById(id)
                .then((response: any) => {
                    const data = response.data;
                    // Normalize address to always be arrays
                    const normalizedAddress: { [key: string]: Wallet[] } = {};
                    Object.keys(data.address || {}).forEach((network) => {
                        const addr = data.address[network];
                        normalizedAddress[network] = Array.isArray(addr) ? addr : [addr];
                    });

                    setFormData({
                        method: data.method || 'crypto',
                        currency: data.currency,
                        address: normalizedAddress,
                        networks: data.networks || [],
                    });
                    // Set first network as active tab
                    if (data.networks && data.networks.length > 0) {
                        setActiveTab(data.networks[0]);
                    }
                })
                .catch((error) => {
                    console.error('Error loading crypto:', error);
                    setError('Error loading cryptocurrency data');
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleWalletInputChange = (field: keyof Wallet, value: string | number | boolean) => {
        setNewWallet({
            ...newWallet,
            [field]: value,
        });
    };

    const addWallet = () => {
        if (!newWallet.link) {
            setError('Please enter a wallet address');
            return;
        }

        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [activeTab]: [...(formData.address[activeTab] || []), { ...newWallet }],
            },
        });
        setNewWallet({ link: '', maxAmount: 10000, isActive: true });
        setError('');
    };

    const removeWallet = (network: string, index: number) => {
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [network]: formData.address[network].filter((_, i) => i !== index),
            },
        });
    };

    const startEditAddress = (network: string, index: number) => {
        setEditingAddress({
            network,
            index,
            data: { ...formData.address[network][index] },
        });
    };

    const saveEditAddress = () => {
        if (!editingAddress) return;

        const updatedAddresses = [...formData.address[editingAddress.network]];
        updatedAddresses[editingAddress.index] = editingAddress.data;

        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [editingAddress.network]: updatedAddresses,
            },
        });
        setEditingAddress(null);
    };

    const cancelEditAddress = () => {
        setEditingAddress(null);
    };

    const updateEditingAddress = (field: keyof Wallet, value: string | number | boolean) => {
        if (!editingAddress) return;
        setEditingAddress({
            ...editingAddress,
            data: {
                ...editingAddress.data,
                [field]: value,
            },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if at least one network has addresses
        const hasAddresses = formData.networks.some(network => formData.address[network]?.length > 0);
        if (!hasAddresses) {
            setError('Please add at least one wallet address to any network');
            return;
        }

        try {
            setSaving(true);
            const payload = {
                method: formData.method,
                currency: formData.currency,
                address: formData.address,
                networks: formData.networks,
            };

            await updateCrypto(id!, payload);
            navigate('/cryptos');
        } catch (error) {
            console.error('Error saving crypto:', error);
            setError('An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    const getTotalAddresses = () => {
        return Object.values(formData.address).reduce((sum, addrs) => sum + addrs.length, 0);
    };

    const getActiveAddresses = () => {
        return Object.values(formData.address).reduce((sum, addrs) => sum + addrs.filter(a => a.isActive).length, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading cryptocurrency data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-6 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/cryptos')}
                                className="p-2 hover:bg-white/20 rounded-lg transition"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold mb-1">Edit {formData.currency}</h1>
                                <p className="text-purple-100 text-sm">Manage wallet addresses for each network</p>
                            </div>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <div className="bg-white/20 px-4 py-2 rounded-lg">
                                <p className="font-semibold">Total Addresses</p>
                                <p className="text-2xl font-bold">{getTotalAddresses()}</p>
                            </div>
                            <div className="bg-white/20 px-4 py-2 rounded-lg">
                                <p className="font-semibold">Active</p>
                                <p className="text-2xl font-bold">{getActiveAddresses()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Networks Tabs and Addresses */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Networks & Wallet Addresses</h2>

                        {/* Network Tabs */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {formData.networks.map((network) => {
                                const addressCount = formData.address[network]?.length || 0;
                                const activeCount = formData.address[network]?.filter(a => a.isActive).length || 0;

                                return (
                                    <button
                                        key={network}
                                        type="button"
                                        onClick={() => setActiveTab(network)}
                                        className={`px-6 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${activeTab === network
                                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-gray-800">{network}</p>
                                            {addressCount > 0 && (
                                                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                    {activeCount}/{addressCount}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Tab Content */}
                        {activeTab && (
                            <div className="space-y-6">
                                {/* Add New Wallet */}
                                <div className="border-2 border-purple-200 rounded-xl p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                                    <h3 className="font-bold text-lg text-purple-900 flex items-center gap-2 mb-4">
                                        <Plus className="w-5 h-5" />
                                        Add New Wallet to {activeTab}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet Address</label>
                                            <input
                                                type="text"
                                                value={newWallet.link}
                                                onChange={(e) => handleWalletInputChange('link', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                                placeholder={`Enter ${activeTab} wallet address`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Amount</label>
                                            <input
                                                type="number"
                                                value={newWallet.maxAmount}
                                                onChange={(e) => handleWalletInputChange('maxAmount', Number(e.target.value))}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                                placeholder="10000"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-gray-700">Active Status</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={newWallet.isActive}
                                                    onChange={(e) => handleWalletInputChange('isActive', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addWallet}
                                            className="bg-purple-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add Wallet
                                        </button>
                                    </div>
                                </div>

                                {/* Existing Wallets */}
                                {formData.address[activeTab]?.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-lg text-gray-800">
                                            Existing Wallets ({formData.address[activeTab].length})
                                        </h3>
                                        {formData.address[activeTab].map((wallet, index) => {
                                            const isEditing = editingAddress?.network === activeTab && editingAddress?.index === index;

                                            return (
                                                <div key={index} className={`border-2 rounded-xl p-4 transition ${isEditing ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                                    }`}>
                                                    {isEditing ? (
                                                        // Edit Mode
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet Address</label>
                                                                <input
                                                                    type="text"
                                                                    value={editingAddress.data.link}
                                                                    onChange={(e) => updateEditingAddress('link', e.target.value)}
                                                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Amount</label>
                                                                    <input
                                                                        type="number"
                                                                        value={editingAddress.data.maxAmount}
                                                                        onChange={(e) => updateEditingAddress('maxAmount', Number(e.target.value))}
                                                                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                                                                    />
                                                                </div>
                                                                <div className="flex items-end">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={editingAddress.data.isActive}
                                                                            onChange={(e) => updateEditingAddress('isActive', e.target.checked)}
                                                                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                                        />
                                                                        <span className="text-sm font-semibold text-gray-700">Active</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={saveEditAddress}
                                                                    className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                                                >
                                                                    <Check className="w-4 h-4" />
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={cancelEditAddress}
                                                                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // View Mode
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1 space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-sm font-semibold text-gray-700 break-all">{wallet.link}</p>
                                                                    {wallet.isActive ? (
                                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">Active</span>
                                                                    ) : (
                                                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-semibold">Inactive</span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-gray-600">Max Amount: <span className="font-semibold">{wallet.maxAmount.toLocaleString()}</span></p>
                                                            </div>
                                                            <div className="flex gap-2 ml-4">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => startEditAddress(activeTab, index)}
                                                                    className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                                                                >
                                                                    <Edit2 className="w-5 h-5 text-blue-600" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeWallet(activeTab, index)}
                                                                    className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
                                                                >
                                                                    <Trash2 className="w-5 h-5 text-red-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/cryptos')}
                            className="px-8 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCrypto;
