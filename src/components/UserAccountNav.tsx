import { getUserSubscriptionPlan } from '@/lib/stripe';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { Gem } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Icons } from './Icons';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface UserAccountNavProps {
    email: string | undefined;
    imageUrl: string;
    name: string;
}

const UserAccountNav: FC<UserAccountNavProps> = async ({
    email,
    imageUrl,
    name,
}) => {
    const subscriptionPlan = await getUserSubscriptionPlan();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
                    <Avatar className="h-8 w-8 relative">
                        {imageUrl ? (
                            <div className="relateive aspect-square h-full w-full">
                                <Image
                                    fill
                                    src={imageUrl}
                                    alt="profile picture"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className="sr-only">{name}</span>
                                <Icons.user className="h-4 w-4 text-zinc-900" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        {name && (
                            <p className="font-medium text-sm text-black">
                                {name}
                            </p>
                        )}
                        {email && (
                            <p className="w-[200px] truncate text-xs text-zinc-700">
                                {email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    {subscriptionPlan?.isSubscribed ? (
                        <Link href="/dashboard/billing">
                            Manage Subscription
                        </Link>
                    ) : (
                        <Link href="/pricing">
                            Upgrade{' '}
                            <Gem className="text-rose-600 h-4 w-4 ml-1.5" />
                        </Link>
                    )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                    <LogoutLink className='w-full'>Log out</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;
