import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, CheckCircle, AlertCircle, Coins, Network as NetworkIcon } from 'lucide-react';
import { currencyOptions } from './currencyOptions';
import {updateCrypto} from "@/services/cryptoService.ts"; // Adjust the import path as needed

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

const CryptoManagementForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        method: 'crypto',
        currency: '',
        address: {},
        networks: [],
    });

    const [selectedNetwork, setSelectedNetwork] = useState<string>('');
    const [newWallet, setNewWallet] = useState<Wallet>({ link: '', maxAmount: 10000, isActive: true });
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleCurrencyChange = (currency: string) => {
        const selected = currencyOptions.find(opt => opt.value === currency);
        if (selected) {
            setFormData({
                ...formData,
                currency,
                networks: selected.networks,
                address: {},
            });
            setSelectedNetwork('');
        }
    };

    const handleNetworkChange = (network: string) => {
        setSelectedNetwork(network);
        if (!formData.address[network]) {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [network]: [],
                },
            });
        }
    };

    const handleWalletInputChange = (field: keyof Wallet, value: string | number | boolean) => {
        setNewWallet({
            ...newWallet,
            [field]: value,
        });
    };

    const addWallet = () => {
        if (!newWallet.link) {
            setDialogMessage('Please enter a wallet address');
            setShowDialog(true);
            return;
        }

        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [selectedNetwork]: [...(formData.address[selectedNetwork] || []), { ...newWallet }],
            },
        });
        setNewWallet({ link: '', maxAmount: 10000, isActive: true });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.currency) {
            setDialogMessage('Please select a currency');
            setShowDialog(true);
            return;
        }

        if (!selectedNetwork) {
            setDialogMessage('Please select a network');
            setShowDialog(true);
            return;
        }

        if (!formData.address[selectedNetwork]?.length) {
            setDialogMessage('Please add at least one wallet address');
            setShowDialog(true);
            return;
        }

        try {
            setLoading(true);
            const payload = {
                method: formData.method,
                currency: formData.currency,
                address: formData.address,
                networks: formData.networks,
            };

            await updateCrypto(payload);

            setDialogMessage('Crypto created successfully');
            setShowDialog(true);

            setTimeout(() => {
                navigate('/cryptos');
            }, 1500);
        } catch (error) {
            console.error('Error saving crypto:', error);
            setDialogMessage('An error occurred while saving');
            setShowDialog(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-6 mb-8 text-white">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/cryptos')}
                            className="p-2 hover:bg-white/20 rounded-lg transition"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Add New Cryptocurrency</h1>
                            <p className="text-purple-100 text-sm">Configure the currency, network, and wallet addresses</p>
                        </div>
                    </div>
                </div>

                {/* Success/Error Dialog */}
                {showDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <h3 className="text-lg font-bold text-gray-800">Notification</h3>
                            </div>
                            <p className="text-gray-600 mb-6">{dialogMessage}</p>
                            <button
                                onClick={() => setShowDialog(false)}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Currency Selection */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Coins className="w-6 h-6 text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Select Cryptocurrency</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {currencyOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleCurrencyChange(option.value)}
                                        className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                            formData.currency === option.value
                                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                                : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div
                                                className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                                                    formData.currency === option.value ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                <Coins className="w-6 h-6" />
                                            </div>
                                            <p className="font-bold text-gray-800">{option.value}</p>
                                            <p className="text-xs text-gray-500">{option.label}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Network Selection */}
                        {formData.currency && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <NetworkIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Select Network</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {formData.networks.map((network) => (
                                        <button
                                            key={network}
                                            type="button"
                                            onClick={() => handleNetworkChange(network)}
                                            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                                selectedNetwork === network
                                                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                                                    : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                        >
                                            <div className="text-center">
                                                <p className="font-bold text-gray-800">{network}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Wallet Address Configuration */}
                        {selectedNetwork && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <NetworkIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Configure Wallets for {selectedNetwork}</h2>
                                </div>

                                {/* Add New Wallet */}
                                <div className="border-2 border-purple-200 rounded-xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 mb-6">
                                    <h3 className="font-bold text-lg text-purple-900 flex items-center gap-2 mb-4">
                                        <NetworkIcon className="w-5 h-5" />
                                        Add New Wallet
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet Address</label>
                                            <input
                                                type="text"
                                                value={newWallet.link}
                                                onChange={(e) => handleWalletInputChange('link', e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                                placeholder={`Enter ${selectedNetwork} wallet address`}
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
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-700">Wallet Status</span>
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
                                            className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add Wallet
                                        </button>
                                    </div>
                                </div>

                                {/* Existing Wallets */}
                                {formData.address[selectedNetwork]?.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-lg text-purple-900">Existing Wallets</h3>
                                        {formData.address[selectedNetwork].map((wallet, index) => (
                                            <div key={index} className="border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between">
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold text-gray-700">Address: {wallet.link}</p>
                                                    <p className="text-sm text-gray-600">Max Amount: {wallet.maxAmount}</p>
                                                    <p className="text-sm text-gray-600">Status: {wallet.isActive ? 'Active' : 'Inactive'}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeWallet(selectedNetwork, index)}
                                                    className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
                                                >
                                                    <Trash2 className="w-5 h-5 text-red-600" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        {formData.currency && selectedNetwork && (
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/cryptos')}
                                    className="px-8 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        {/* Info Box */}
                        {formData.currency && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-blue-900 mb-1">Important Note</p>
                                        <p className="text-xs text-blue-700">
                                            Ensure wallet addresses are correct before saving. Incorrect addresses may lead to loss of funds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default CryptoManagementForm;