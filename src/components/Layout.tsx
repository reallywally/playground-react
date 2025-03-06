import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/users">
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/props-test">
              <ListItemText primary="Props Test" />
            </ListItem>
            <ListItem button component={Link} to="/json-editor">
              <ListItemText primary="Json Editor" />
            </ListItem>
            <ListItem button component={Link} to="/data-table-test">
              <ListItemText primary="Data Table Test" />
            </ListItem>
            <ListItem button component={Link} to="/use-state-test">
              <ListItemText primary="UseStateTest" />
            </ListItem>
            <ListItem button component={Link} to="/use-effect-test">
              <ListItemText primary="UseStateTest" />
            </ListItem>
            <ListItem button component={Link} to="/mindmap-test">
              <ListItemText primary="MindmapTest" />
            </ListItem>
            <ListItem button component={Link} to="/gantt-chart-test">
              <ListItemText primary="GantCharTest" />
            </ListItem>
            <ListItem button component={Link} to="/use-memo-test">
              <ListItemText primary="UseMemoTest" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
