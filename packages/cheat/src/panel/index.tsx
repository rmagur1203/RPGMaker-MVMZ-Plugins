import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect } from "react";
import {
  Menu,
  generateListItem,
  isCollapsableMenu,
  useMenu,
} from "../components/menus";

const drawerWidth = 240;

function freeEvent(element: HTMLElement) {
  element.oncontextmenu = (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
  };

  element.childNodes.forEach((child) => {
    if (child instanceof HTMLElement) {
      freeEvent(child);
    }
  });
}

export default function Panel() {
  const theme = useTheme();
  const menus = useMenu();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<Menu>(menus[0][0]);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (ref.current) freeEvent(ref.current);
  }, [ref.current]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {item.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "relative",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {menus.map((menu, i) => (
            <List key={i}>
              {menu.map((item) =>
                generateListItem(item, (item) => {
                  if (isCollapsableMenu(item)) {
                    return;
                  }
                  setItem(item);
                  handleDrawerClose();
                })
              )}
            </List>
          ))}
        </Drawer>
        <Main open={open} sx={{ mt: "64px" }} ref={ref}>
          {item.panel}
        </Main>
      </Box>
    </>
  );
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => !["open", "sx"].includes(prop.toString()),
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: "100%",
  height: "height: calc(100% - 64px);",
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
