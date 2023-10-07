'use client';

import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface MobileNavProps {
    isAuth: boolean;
}

const MobileNav: FC<MobileNavProps> = ({ isAuth }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const toggleOpen = () => setOpen(!isOpen);

    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            toggleOpen();
        }
    };

    return (
        <div className="sm:hidden">
            <Menu
                onClick={toggleOpen}
                className="relative z-50 h-5 w-5 text-zinc-700"
            />
            {isOpen ? (
                <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
                    <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
                        {!isAuth ? (
                            <>
                                <li>
                                    <RegisterLink
                                        className="flex items-center w-full font-semibold text-green-600"
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </RegisterLink>
                                </li>
                                <li className="my-3 h-px w-full bg-gray-300" />
                                <li>
                                    <LoginLink
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Sign in
                                    </LoginLink>
                                </li>
                                <li className="my-3 h-px w-full bg-gray-300" />
                                <li>
                                    <Link
                                        onClick={() =>
                                            closeOnCurrent('/pricing')
                                        }
                                        href="/pricing"
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        onClick={() =>
                                            closeOnCurrent('/dashboard')
                                        }
                                        href="/dashboard"
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="my-3 h-px w-full bg-gray-300" />
                                <li>
                                    <LogoutLink
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Sign out
                                    </LogoutLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default MobileNav;
