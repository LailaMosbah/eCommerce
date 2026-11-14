
import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";

import styles from "./appHeader.module.css";

type MenuItem = Required<MenuProps>["items"][number];

interface DesktopNavigationProps {
    menuItems: MenuItem[];
    selectedKey: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    menuItems,
    selectedKey,
}) => {
    return (
        <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems}
            className={styles.header__nav}
            triggerSubMenuAction="click"
        />
    );
};

export default DesktopNavigation;
