type NavLink = {
    href: string;
    label: string;
    target?: string;
}

export const links: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/categories', label: 'categories' },
    { href: '/new', label: 'new' },
    { href: '/profile', label: 'profile' },
    { href: '/transactions', label: 'transactions' },
    { href: '/reviews', label: 'reviews' },
    { href: '/mybookings', label: 'my bookings' },
    { href: '/mydashboard', label: 'my dashboard' },
    { href: '/myreviews', label: 'my reviews' },
    { href: '/myshops', label: 'my shops' },
    { href: '/admin', label: 'admin' },
]