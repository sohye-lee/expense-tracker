type NavLink = {
    href: string;
    label: string;
    target?: string;
    access: 'public' | 'user' | 'admin';
}

export const links: NavLink[] = [
    { href: '/', label: 'home', access: 'public' },
    { href: '/dashboard', label: 'dashboard', access: 'user' },
    { href: '/new', label: 'add new', access: 'user' },
    { href: '/transactions', label: 'transactions', access: 'user' },
    { href: '/reports', label: 'reports', access: 'user' },
    { href: '/categories', label: 'categories', access: 'user' },
    { href: '/profile', label: 'profile', access: 'user' },
    { href: '/admin', label: 'admin', access: 'admin' },
]