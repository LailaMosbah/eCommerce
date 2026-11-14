
import React from "react";
import { Button, Drawer, Dropdown, Menu } from "antd";
import {
    CloseOutlined,
    UserOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import type { MenuProps } from "antd";

import styles from "./appHeader.module.css";

type MenuItem = Required<MenuProps>["items"][number];

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
    menuItems: MenuItem[];
    selectedKey: string;
    accessToken: string | null | undefined;
    user: {
        firstName?: string;
        lastName?: string;
    } | null;
    userMenuItems: MenuProps["items"];
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
    open,
    onClose,
    menuItems,
    selectedKey,
    accessToken,
    user,
    userMenuItems,
}) => {
    return (
        <Drawer
            title={
                <div className={styles.header__drawerTitle}>
                    <Link to="/" className={styles.header__drawerLogo}>
                        MyStore
                    </Link>
                </div>
            }
            placement="right"
            onClose={onClose}
            open={open}
            size={320}
            className={styles.header__drawer}
            closeIcon={<CloseOutlined />}
        >
            <Menu
                mode="vertical"
                selectedKeys={[selectedKey]}
                items={menuItems}
                onClick={onClose}
                className={styles.header__navMobile}
            />

            <div className={styles.header__drawerFooter}>
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

                            <DownOutlined className={styles.header__userIcon} />
                        </Button>
                    </Dropdown>
                ) : (
                    <>
                        <Button
                            type="primary"
                            block
                            className={styles.header__drawerButton}
                        >
                            <NavLink
                                to="/signup"
                                className={styles.header__authLink}
                                onClick={onClose}
                            >
                                Sign Up
                            </NavLink>
                        </Button>

                        <Button
                            block
                            className={styles.header__drawerButton}
                        >
                            <NavLink
                                to="/login"
                                className={styles.header__authLink}
                                onClick={onClose}
                            >
                                Login
                            </NavLink>
                        </Button>
                    </>
                )}
            </div>
        </Drawer>
    );
};

export default MobileDrawer;
