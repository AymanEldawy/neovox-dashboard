export const Network = {
    TRC20: 'TRC20',
    ERC20: 'ERC20',
    BEP20: 'BEP20',
    SegWit: 'SegWit',
    Legacy: 'Legacy',
    Solana: 'Solana',
    Cardano: 'Cardano',
} as const;

export const Currency = {
    USDT: 'USDT',
    BTC: 'BTC',
    ETH: 'ETH',
    BNB: 'BNB',
    SOL: 'SOL',
    ADA: 'ADA (UI only)',
} as const;

export type NetworkType = typeof Network[keyof typeof Network];
export type CurrencyType = typeof Currency[keyof typeof Currency];

