'use client';

import { trpc } from '@/app/_trpc/client';
import { absoluteUrl } from '@/lib/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { FC, ReactNode, useState } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: absoluteUrl('/api/trpc'),
                }),
            ],
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default Providers;
