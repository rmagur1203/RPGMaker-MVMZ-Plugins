import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AddCircle,
  AddModerator,
  AddShoppingCart,
  AutoFixHigh,
  EmojiEvents,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import Panels from "@/panel/panels";

export function useMenu() {
  return React.useMemo(() => _menus, []);
}

var _menus: (Menu | CollapsableMenu)[][] = [
  [
    {
      name: "Items",
      icon: <AddShoppingCart />,
      items: [
        {
          name: "Item",
          icon: <AddCircle />,
        },
        {
          name: "Weapon",
          icon: <AutoFixHigh />,
        },
        {
          name: "Armor",
          icon: <AddModerator />,
        },
      ],
    },
    {
      name: "Events",
      icon: <AddShoppingCart />,
    },
    {
      name: "Plugins",
      items: [
        {
          name: "Torigoya",
          visible() {
            return !!Torigoya;
          },
          items: [
            {
              name: "Achievement",
              icon: <EmojiEvents />,
              visible() {
                return !!Torigoya.Achievement;
              },
              panel: <Panels.Torigoya.Achievement />,
            },
          ],
        },
      ],
    },
  ],
];

export type Menu = {
  name: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  panel?: React.ReactNode;
  visible?: () => boolean;
};

export type CollapsableMenu = {
  name: string;
  icon?: React.ReactNode;
  open: boolean;
  items: (Menu | CollapsableMenu)[];
  visible?: () => boolean;
};

export function isCollapsableMenu(
  menu: Menu | CollapsableMenu
): menu is CollapsableMenu {
  return (menu as CollapsableMenu).items !== undefined;
}

export function generateListItem(
  item: Menu | CollapsableMenu,
  onClick?: (item: Menu) => void
) {
  if (item.visible && !item.visible()) {
    return null;
  }
  if (isCollapsableMenu(item)) {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <ListItem key={item.name} disablePadding>
          <ListItemButton onClick={() => setOpen((open) => !open)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.name} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {item.items.map((subItem) => generateListItem(subItem, onClick))}
          </List>
        </Collapse>
      </>
    );
  } else {
    return (
      <ListItem key={item.name} disablePadding>
        <ListItemButton onClick={() => onClick?.(item)}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    );
  }
}
