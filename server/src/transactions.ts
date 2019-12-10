interface Transaction {
    id: string;        
    transactionHash: string;        
    timestamp: string;        
    from: string;        
    to: string;        
    currency: string;        
    additionalNotes: string;        
    block: number;        
    amountTransferred: number;        
    value: number;        
    fee: number;        
}
export const transactions: Transaction[] = [
    {
        id: "001",
        transactionHash: '',
        timestamp: '',
        from: '',
        to: '',
        currency: 'ETH',
        additionalNotes: '',
        block: 100,
        amountTransferred: 10,
        value: 100,
        fee: 0.01,
    },
    {
        id: "002",
        transactionHash: '',
        timestamp: '',
        from: '',
        to: '',
        currency: 'ETH',
        additionalNotes: '',
        block: 101,
        amountTransferred: 0,
        value: 20,
        fee: 0.01,
    },
    {
        id: "003",
        transactionHash: '',
        timestamp: '',
        from: '',
        to: '',
        currency: 'BTC',
        additionalNotes: '',
        block: 0,
        amountTransferred: 0,
        value: 100,
        fee: 0.01,
    }
  ];