import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Plus,
    Save,
    Trash2,
    CheckCircle,
    AlertCircle,
    Wallet,
    Network,
    Coins,
    Eye,
    EyeOff,
} from 'lucide-react';
import { createCrypto, getCryptoById, updateCrypto } from '@/services/cryptoService';

const CryptoManagementForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const isEditMode = !!id;

    const initialFormData = {
        name: '',
        symbol: '',
        method: 'crypto',
        networks: [{ name: '', wallets: [{ address: '', isActive: true, maxAmount: 1000 }] }],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [customMethod, setCustomMethod] = useState('');
    const [customCrypto, setCustomCrypto] = useState('');
    const [customNetwork, setCustomNetwork] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newWallet, setNewWallet] = useState({
        cryptoId: id || '',
        networkId: '',
        address: '',
        isActive: true,
        maxAmount: 1000,
    });

    useEffect(() => {
        if (id && isEditMode) {
            setLoading(true);
            getCryptoById(id)
                .then((crypto) => {
                    setFormData({
                        name: crypto.name,
                        symbol: crypto.symbol,
                        method: crypto.method,
                        networks: crypto.networks.map((n) => ({
                            name: n.name,
                            wallets: n.wallets.map((w) => ({
                                address: w.address,
                                isActive: w.isActive,
                                maxAmount: w.maxAmount,
                            })),
                        })),
                    });
                    setCustomCrypto(crypto.name);
                    setCustomMethod(crypto.method);
                    setCustomNetwork(crypto.networks[0]?.name || '');
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch crypto:', error);
                    setLoading(false);
                });
        }
    }, [id, isEditMode]);

    const handleCancel = () => {
        navigate('/cryptos');
    };

    const addNetworkField = () => {
        setFormData({
            ...formData,
            networks: [...formData.networks, { name: '', wallets: [{ address: '', isActive: true, maxAmount: 1000 }] }],
        });
    };

    const addWalletToNetwork = (networkIndex) => {
        const networks = [...formData.networks];
        networks[networkIndex].wallets.push({ address: '', isActive: true, maxAmount: 1000 });
        setFormData({ ...formData, networks });
    };

    const removeNetwork = (index) => {
        const networks = formData.networks.filter((_, i) => i !== index);
        setFormData({ ...formData, networks });
    };

    const removeWalletFromNetwork = (networkIndex, walletIndex) => {
        const networks = [...formData.networks];
        networks[networkIndex].wallets = networks[networkIndex].wallets.filter((_, i) => i !== walletIndex);
        setFormData({ ...formData, networks });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.symbol || !formData.networks.some((n) => n.name)) {
            setShowSuccessDialog(true);
            return;
        }
        try {
            setLoading(true);
            const cryptoData = {
                name: customCrypto || formData.name,
                symbol: formData.symbol,
                method: customMethod || formData.method,
                networks: formData.networks.map((n) => ({
                    name: n.name || customNetwork,
                    wallets: n.wallets.map((w) => ({
                        address: w.address,
                        isActive: w.isActive,
                        maxAmount: w.maxAmount,
                    })),
                })),
            };
            if (isEditMode) {
                await updateCrypto(id!, cryptoData);
            } else {
                await createCrypto(cryptoData);
            }
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Failed to save crypto:', error);
            setShowSuccessDialog(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogConfirm = () => {
        setShowSuccessDialog(false);
        if (!isEditMode) {
            setFormData(initialFormData);
            setCustomCrypto('');
            setCustomMethod('');
            setCustomNetwork('');
        }
        navigate('/cryptos');
    };

    const handleAddWallet = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWallet.cryptoId || !newWallet.networkId || !newWallet.address) {
            setShowSuccessDialog(true);
            return;
        }
        try {
            setLoading(true);
            const crypto = await getCryptoById(newWallet.cryptoId);
            const updatedNetworks = crypto.networks.map((network) => {
                if (network.id === newWallet.networkId) {
                    return {
                        ...network,
                        wallets: [
                            ...network.wallets,
                            {
                                address: newWallet.address,
                                isActive: newWallet.isActive,
                                maxAmount: newWallet.maxAmount,
                                currentAmount: 0,
                            },
                        ],
                    };
                }
                return network;
            });
            await updateCrypto(newWallet.cryptoId, { ...crypto, networks: updatedNetworks });
            setNewWallet({
                cryptoId: id || '',
                networkId: '',
                address: '',
                isActive: true,
                maxAmount: 1000,
            });
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Failed to add wallet:', error);
            setShowSuccessDialog(true);
        } finally {
            setLoading(false);
        }
    };

    const cryptoTypes = [
        {
            value: 'crypto',
            label: 'Crypto',
            icon: Coins,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
        },
        {
            value: 'fiat',
            label: 'Fiat',
            icon: Wallet,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
        },
    ];

    const selectedType = cryptoTypes.find((t) => t.value === formData.method);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition" onClick={handleCancel}>
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{isEditMode ? 'Edit Crypto' : 'Create New Crypto'}</h1>
                                <p className="text-purple-100">
                                    {isEditMode ? 'Update the cryptocurrency details below' : 'Add a new cryptocurrency with networks and wallets'}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`px-4 py-2 rounded-full font-semibold ${
                                formData.networks.some((n) => n.wallets.some((w) => w.isActive))
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 text-gray-700'
                            }`}
                        >
                            {formData.networks.some((n) => n.wallets.some((w) => w.isActive)) ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </div>

                {showSuccessDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <h3 className="text-lg font-bold text-gray-800">
                                    {isEditMode ? 'Crypto Updated Successfully!' : 'Crypto Created Successfully!'}
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Your cryptocurrency has been {isEditMode ? 'updated' : 'created'}. Click OK to continue.
                            </p>
                            <button
                                onClick={handleDialogConfirm}
                                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-2 rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {!loading && (
                    <>
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Coins className="text-purple-600" /> Select Crypto Type
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cryptoTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = formData.method === type.value;
                                    return (
                                        <button
                                            key={type.value}
                                            onClick={() => setFormData({ ...formData, method: type.value })}
                                            className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                                isSelected ? 'border-purple-500 shadow-lg' : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                        >
                                            <div
                                                className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                                                    isSelected ? 'bg-purple-500' : 'bg-gray-200'
                                                }`}
                                            >
                                                {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                            </div>
                                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 mx-auto`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-800">{type.label}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {type.value === 'crypto' && 'Cryptocurrency transactions'}
                                                {type.value === 'fiat' && 'Fiat currency transactions'}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl shadow-xl p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-100 rounded-xl">
                                            <Coins className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                                    <Coins className="w-5 h-5 text-purple-600" /> Crypto Name
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={customCrypto}
                                                        onChange={(e) => setCustomCrypto(e.target.value)}
                                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                                        placeholder="e.g., Bitcoin"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                                    <Coins className="w-5 h-5 text-purple-600" /> Symbol
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.symbol}
                                                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                                    placeholder="e.g., BTC"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-xl p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <Network className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">Networks and Wallets</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600">Add networks and their wallets</p>
                                            <button
                                                onClick={addNetworkField}
                                                type="button"
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-semibold"
                                            >
                                                <Plus className="w-4 h-4" /> Add Network
                                            </button>
                                        </div>
                                        {formData.networks.map((network, networkIndex) => (
                                            <div key={networkIndex} className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-bold text-purple-800">Network {networkIndex + 1}</h3>
                                                    {formData.networks.length > 1 && (
                                                        <button
                                                            onClick={() => removeNetwork(networkIndex)}
                                                            type="button"
                                                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={network.name || customNetwork}
                                                    onChange={(e) => {
                                                        const networks = [...formData.networks];
                                                        networks[networkIndex].name = e.target.value;
                                                        setFormData({ ...formData, networks });
                                                        setCustomNetwork(e.target.value);
                                                    }}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition mb-4"
                                                    placeholder="e.g., TRC20, ERC20"
                                                />
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold text-gray-700 mb-2">Wallets:</p>
                                                    {network.wallets.map((wallet, walletIndex) => (
                                                        <div key={walletIndex} className="flex items-center gap-2">
                              <span className="w-8 h-8 flex items-center justify-center bg-purple-200 text-purple-700 rounded-lg font-bold text-sm flex-shrink-0">
                                {walletIndex + 1}
                              </span>
                                                            <input
                                                                type="text"
                                                                value={wallet.address}
                                                                onChange={(e) => {
                                                                    const networks = [...formData.networks];
                                                                    networks[networkIndex].wallets[walletIndex].address = e.target.value;
                                                                    setFormData({ ...formData, networks });
                                                                }}
                                                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                                                                placeholder="Wallet Address"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={wallet.maxAmount}
                                                                onChange={(e) => {
                                                                    const networks = [...formData.networks];
                                                                    networks[networkIndex].wallets[walletIndex].maxAmount = Number(e.target.value);
                                                                    setFormData({ ...formData, networks });
                                                                }}
                                                                className="w-24 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                                                                placeholder="Max Amount"
                                                            />
                                                            <label className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={wallet.isActive}
                                                                    onChange={(e) => {
                                                                        const networks = [...formData.networks];
                                                                        networks[networkIndex].wallets[walletIndex].isActive = e.target.checked;
                                                                        setFormData({ ...formData, networks });
                                                                    }}
                                                                    className="w-4 h-4 text-purple-600 rounded"
                                                                />
                                                                <span className="text-sm">Active</span>
                                                            </label>
                                                            {network.wallets.length > 1 && (
                                                                <button
                                                                    onClick={() => removeWalletFromNetwork(networkIndex, walletIndex)}
                                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => addWalletToNetwork(networkIndex)}
                                                    className="mt-3 flex items-center gap-2 px-3 py-1.5 text-purple-700 hover:bg-purple-100 rounded-lg text-sm w-full justify-center border border-dashed border-purple-300 transition-all"
                                                >
                                                    <Plus className="w-4 h-4" /> Add Wallet to Network
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Crypto Settings</h2>
                                    <div className="mb-6">
                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div>
                                                <p className="font-semibold text-gray-800">Crypto Status</p>
                                                <p className="text-sm text-gray-500">
                                                    {formData.networks.some((n) => n.wallets.some((w) => w.isActive))
                                                        ? 'Crypto is active'
                                                        : 'Crypto is inactive'}
                                                </p>
                                            </div>
                                            <div
                                                className={`relative w-14 h-8 rounded-full transition ${
                                                    formData.networks.some((n) => n.wallets.some((w) => w.isActive))
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-300'
                                                }`}
                                                onClick={() => {
                                                    const networks = formData.networks.map((n) => ({
                                                        ...n,
                                                        wallets: n.wallets.map((w) => ({ ...w, isActive: !w.isActive })),
                                                    }));
                                                    setFormData({ ...formData, networks });
                                                }}
                                            >
                                                <div
                                                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${
                                                        formData.networks.some((n) => n.wallets.some((w) => w.isActive)) ? 'translate-x-6' : ''
                                                    }`}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="border-t border-gray-200 my-6" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 mb-4">Summary</p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Type:</span>
                                                <div
                                                    className={`px-3 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-2 ${selectedType?.bgColor} ${selectedType?.textColor}`}
                                                >
                                                    {selectedType && <selectedType.icon className="w-4 h-4" />}
                                                    {selectedType?.label}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Networks:</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm">
                          {formData.networks.length}
                        </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Wallets:</span>
                                                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">
                          {formData.networks.reduce((sum, n) => sum + n.wallets.length, 0)}
                        </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Status:</span>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        formData.networks.some((n) => n.wallets.some((w) => w.isActive))
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                          {formData.networks.some((n) => n.wallets.some((w) => w.isActive)) ? 'Active' : 'Inactive'}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        disabled={loading}
                                        className={`w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                                            loading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <Save className="w-5 h-5" /> {isEditMode ? 'Update Crypto' : 'Create Crypto'}
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-purple-900 mb-1">Pro Tip 💡</p>
                                            <p className="text-xs text-purple-700">
                                                Ensure wallet addresses are valid and networks are correctly configured to avoid transaction issues.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Wallet className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Add Wallet</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <Network className="w-5 h-5 text-blue-600" /> Select Network
                                    </label>
                                    <select
                                        value={newWallet.networkId}
                                        onChange={(e) => setNewWallet({ ...newWallet, networkId: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                    >
                                        <option value="">Select Network</option>
                                        {formData.networks.map((network, index) => (
                                            <option key={index} value={index}>
                                                {network.name || `Network ${index + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <Wallet className="w-5 h-5 text-green-600" /> Wallet Address
                                    </label>
                                    <input
                                        type="text"
                                        value={newWallet.address}
                                        onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                                        placeholder="Enter wallet address"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <Coins className="w-5 h-5 text-yellow-600" /> Max Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={newWallet.maxAmount}
                                        onChange={(e) => setNewWallet({ ...newWallet, maxAmount: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition"
                                        placeholder="Enter max amount"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={newWallet.isActive}
                                        onChange={(e) => setNewWallet({ ...newWallet, isActive: e.target.checked })}
                                        className="w-4 h-4 text-purple-600 rounded"
                                    />
                                    <label className="text-sm font-semibold text-gray-700">Wallet Active</label>
                                </div>
                                <button
                                    onClick={handleAddWallet}
                                    type="button"
                                    disabled={loading}
                                    className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    <Plus className="w-5 h-5" /> Add Wallet
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CryptoManagementForm;