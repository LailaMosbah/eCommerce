// components/Header/AppHeader.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu, Drawer, Badge, Dropdown } from 'antd';
import {
    MenuOutlined,
    ShoppingCartOutlined,
    HeartOutlined,
    UserOutlined,
    SearchOutlined,
    CloseOutlined,
    DownOutlined,
    HomeOutlined,
    ShopOutlined,
    TagOutlined,
    InfoCircleOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

import styles from './appHeader.module.css';

import { useAppSelector } from '../../../app/hooks';
import { getCartItemsCount } from '../../../features/cart/cartSelector';

const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const AppHeader: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const cartItemsCount = useAppSelector(getCartItemsCount);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle search submit
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchActive(false);
            setSearchQuery('');
        }
    };

    const menuItems: MenuItem[] = [
        {
            label: <Link to="/"><HomeOutlined /> Home</Link>,
            key: '/'
        },
        {
            label: <Link to="/shop"><ShopOutlined /> Shop</Link>,
            key: '/shop'
        },
        {
            label: <Link to="/categories">Categories</Link>,
            key: '/categories',
            children: [
                { label: <Link to="/categories/electronics">Electronics</Link>, key: '/categories/electronics' },
                { label: <Link to="/categories/fashion">Fashion</Link>, key: '/categories/fashion' },
                { label: <Link to="/categories/home">Home & Living</Link>, key: '/categories/home' },
                { label: <Link to="/categories/sports">Sports</Link>, key: '/categories/sports' },
            ]
        },
        {
            label: <Link to="/deals"><TagOutlined /> Deals</Link>,
            key: '/deals'
        },
        {
            label: <Link to="/about"><InfoCircleOutlined /> About</Link>,
            key: '/about'
        },
        {
            label: <Link to="/contact"><PhoneOutlined /> Contact</Link>,
            key: '/contact'
        },
    ];

    const userMenuItems: MenuProps['items'] = [
        { label: <Link to="/profile">My Profile</Link>, key: 'profile' },
        { label: <Link to="/orders">My Orders</Link>, key: 'orders' },
        { label: <Link to="/wishlist">Wishlist</Link>, key: 'wishlist' },
        { type: 'divider' },
        { label: <Link to="/logout">Logout</Link>, key: 'logout' },
    ];

    const wishlistItemsCount = 0; // This would come from your wishlist state

    return (
        <Header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
            <div className={styles.header__container}>
                {/* Logo Section */}
                <div className={styles.header__logo}>
                    <Link to="/" className={styles.header__logoLink}>
                        <span className={styles.header__logoIcon}>🛍️</span>
                        <span className={styles.header__logoText}>MyStore</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <Menu
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    className={styles.header__nav}
                    triggerSubMenuAction="click"
                />

                {/* Right Side Actions */}
                <div className={styles.header__actions}>
                    {/* Search Bar */}
                    <div className={`${styles.header__search} ${searchActive ? styles['header__search--active'] : ''}`}>
                        {searchActive ? (
                            <form onSubmit={handleSearch} className={styles.header__searchForm}>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={styles.header__searchInput}
                                    autoFocus
                                />
                                <Button
                                    type="text"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                    className={styles.header__searchButton}
                                />
                                <Button
                                    type="text"
                                    icon={<CloseOutlined />}
                                    onClick={() => setSearchActive(false)}
                                    className={styles.header__searchClose}
                                />
                            </form>
                        ) : (
                            <Button
                                type="text"
                                icon={<SearchOutlined />}
                                onClick={() => setSearchActive(true)}
                                className={styles.header__iconButton}
                                aria-label="Search"
                            />
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <Badge count={wishlistItemsCount} offset={[-5, 5]} className={styles.header__badge}>
                        <Button
                            type="text"
                            icon={<HeartOutlined />}
                            className={styles.header__iconButton}
                            aria-label="Wishlist"
                        />
                    </Badge>

                    {/* Cart Button */}
                    <Badge count={cartItemsCount} offset={[-5, 5]} className={styles.header__badge}>
                        <Button
                            type="text"
                            icon={<ShoppingCartOutlined />}
                            className={styles.header__iconButton}
                            aria-label="Cart"
                            onClick={() => navigate('/cart')}
                        />
                    </Badge>

                    {/* User Dropdown */}
                    <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                        <Button
                            type="text"
                            icon={<UserOutlined />}
                            className={styles.header__userButton}
                        >
                            <span className={styles.header__userText}>Account</span>
                            <DownOutlined className={styles.header__userIcon} />
                        </Button>
                    </Dropdown>

                    {/* Auth Buttons - Mobile */}
                    <div className={styles.header__auth}>
                        <Button type="primary" className={styles.header__authButton}>
                            <NavLink to="/signup" className={styles.header__authLink}>
                                Sign Up
                            </NavLink>
                        </Button>
                        <Button className={styles.header__authButton}>
                            <NavLink to="/login" className={styles.header__authLink}>
                                Login
                            </NavLink>
                        </Button>
                    </div>

                    {/* Hamburger Menu - Mobile Only */}
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setMobileMenuOpen(true)}
                        className={styles.header__hamburger}
                        aria-label="Menu"
                    />
                </div>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <div className={styles.header__drawerTitle}>
                        <span className={styles.header__drawerLogo}>MyStore</span>
                    </div>
                }
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                size={320}
                className={styles.header__drawer}
                closeIcon={<CloseOutlined />}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.header__navMobile}
                />
                <div className={styles.header__drawerFooter}>
                    <Button type="primary" block className={styles.header__drawerButton}>
                        Sign Up
                    </Button>
                    <Button block className={styles.header__drawerButton}>
                        Login
                    </Button>
                </div>
            </Drawer>
        </Header>
    );
};

export default AppHeader;