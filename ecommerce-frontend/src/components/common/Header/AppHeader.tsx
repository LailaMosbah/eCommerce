// React and Router
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// Redux 
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getCartItemsCount } from "../../../features/cart/cartSelector";
import { authLogout } from "@features/auth/authSlice";
import { getWishlistProducts } from "@features/wishlist/wishlistThunks";

// Ant Design
import { Layout, Button, Badge, Dropdown, } from "antd";

import {
    ShoppingCartOutlined,
    HeartOutlined,
    UserOutlined,
    DownOutlined,
    HomeOutlined,
    ShopOutlined,
    InfoCircleOutlined,
    PhoneOutlined,
    MenuOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";

// Components 
import DesktopNavigation from "./DesktopNavigation";
import MobileDrawer from "./MobileDrawer";

//Styles
import styles from "./appHeader.module.css";





const { Header } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const HeaderApp: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    const cartItemsCount = useAppSelector(getCartItemsCount);

    const { user, accessToken } = useAppSelector(
        (state) => state.auth
    );

    const wishlistItemsCount = useAppSelector(
        (state) => state.wishlist.productsId.length
    );

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fetch wishlist
    useEffect(() => {
        if (accessToken) {
            dispatch(getWishlistProducts("productIds"));
        }
    }, [dispatch, accessToken]);



    // Shared navigation items
    const menuItems: MenuItem[] = [
        {
            label: (
                <Link to="/">
                    <HomeOutlined /> Home
                </Link>
            ),
            key: "/",
        },
        {
            label: <Link to="/categories">
                <ShopOutlined /> Categories
            </Link>,
            key: "/categories",
        },
        {
            label: (
                <Link to="/about">
                    <InfoCircleOutlined /> About
                </Link>
            ),
            key: "/about",
        },
        {
            label: (
                <Link to="/contact">
                    <PhoneOutlined /> Contact
                </Link>
            ),
            key: "/contact",
        },
    ];

    // User dropdown items
    const userMenuItems: MenuProps["items"] = [
        {
            label: <Link to="/profile">My Profile</Link>,
            key: "profile",
        },
        {
            label: <Link to="/profile/orders">My Orders</Link>,
            key: "orders",
        },
        {
            label: <Link to="/wishlist">Wishlist</Link>,
            key: "wishlist",
        },
        {
            type: "divider",
        },
        {
            label: (
                <Link
                    to="/"
                    onClick={() => dispatch(authLogout())}
                >
                    Logout
                </Link>
            ),
            key: "logout",
        },
    ];

    return (
        <Header
            className={`${styles.header} ${scrolled ? styles["header--scrolled"] : ""
                }`}
        >
            <div className={styles.header__container}>
                {/* Logo */}
                <div className={styles.header__logo}>
                    <Link to="/" className={styles.header__logoLink}>
                        <span className={styles.header__logoIcon}>🛍️</span>
                        <span className={styles.header__logoText}>
                            MyStore
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <DesktopNavigation
                    menuItems={menuItems}
                    selectedKey={location.pathname}
                />

                {/* Right Side Actions */}
                <div className={styles.header__actions}>
                    {/* Wishlist */}
                    <Badge
                        count={wishlistItemsCount}
                        offset={[-5, 5]}
                        className={styles.header__badge}
                    >
                        <Button
                            type="text"
                            icon={<HeartOutlined />}
                            className={styles.header__iconButton}
                            aria-label="Wishlist"
                            onClick={() => navigate("/wishlist")}
                        />
                    </Badge>

                    {/* Cart */}
                    <Badge
                        count={cartItemsCount}
                        offset={[-5, 5]}
                        className={styles.header__badge}
                    >
                        <Button
                            type="text"
                            icon={<ShoppingCartOutlined />}
                            className={styles.header__iconButton}
                            aria-label="Cart"
                            onClick={() => navigate("/cart")}
                        />
                    </Badge>

                    {/* Authentication */}
                    {accessToken ? (
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                            trigger={["click"]}
                        >
                            <Button
                                type="text"
                                icon={<UserOutlined />}
                                className={styles.header__userButton}
                            >
                                <span className={styles.header__userText}>
                                    Welcome {user?.firstName} {user?.lastName}
                                </span>

                                <DownOutlined
                                    className={styles.header__userIcon}
                                />
                            </Button>
                        </Dropdown>
                    ) : (
                        <div className={styles.header__auth}>
                            <Button
                                className={styles.header__authButton}
                            >
                                <NavLink
                                    to="/signup"
                                    className={styles.header__authLink}
                                >
                                    Sign Up
                                </NavLink>
                            </Button>

                            <Button className={styles.header__authButton}>
                                <NavLink
                                    to="/login"
                                    className={styles.header__authLink}
                                >
                                    Login
                                </NavLink>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Hamburger */}
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
            <MobileDrawer
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                menuItems={menuItems}
                selectedKey={location.pathname}
                accessToken={accessToken}
                user={user}
                userMenuItems={userMenuItems}
            />
        </Header>
    );
};

export default HeaderApp;
