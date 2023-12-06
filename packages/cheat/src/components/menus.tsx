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
  Info,
} from "@mui/icons-material";
import Panels from "@/panel/panels";
import { Recollection } from "@/panel/panels/Plugins";
const { Event, Plugin } = Panels;

export function useMenu() {
  return React.useMemo(() => _menus, []);
}

var _menus: (Menu | CollapsableMenu)[][] = [
  [
    {
      name: "Info",
      icon: <Info />,
      panel: <Panels.Info />,
    },
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
      items: [
        {
          name: "Map Events",
          icon: <AddCircle />,
          panel: <Event.Events />,
        },
        {
          name: "Common Events",
          icon: <AddCircle />,
          panel: <Event.CommonEvents />,
        },
      ],
    },
    {
      name: "Plugins",
      items: [
        {
          name: "Torigoya",
          visible() {
            return typeof Torigoya !== "undefined";
          },
          items: [
            {
              name: "Achievement",
              icon: <EmojiEvents />,
              visible() {
                return !!Torigoya.Achievement;
              },
              panel: <Plugin.Torigoya.Achievement />,
            },
          ],
        },
        {
          name: "Recollection",
          visible() {
            return Recollection.IsVisible();
          },
          panel: <Plugin.Recollection.default />,
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
      <div key={item.name}>
        <ListItem disablePadding>
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
      </div>
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
