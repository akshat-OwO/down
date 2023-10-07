export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        pagesPerPdf: 5,
        price: {
            amount: 0,
            priceIds: {
                test: '',
                production: '',
            },
        },
    },
    {
        name: 'Pro',
        slug: 'pro',
        quota: 50,
        pagesPerPdf: 25,
        price: {
            amount: 500,
            priceIds: {
                test: 'price_1NyWuYSDjnbsb0Wah430mAyP',
                production: '',
            },
        },
    },
];
