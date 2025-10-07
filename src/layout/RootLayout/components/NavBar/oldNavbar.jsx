import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import useResponsive from "@components/hooks/useResponsive";

const NAV_WIDTH = 280;

export default function Nav({ openNav, onCloseNav }) {
  const location = useLocation();
  const [dOpen, setDopen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [openSubItems, setOpenSubItems] = React.useState(false);
  const isDesktop = useResponsive("up", "lg");
  const theme = useTheme();
  const { palette } = theme;

  const ListData = [
    {
      id: 1,
      title: "Watch Videos",
      icon: <PlayCircleIcon />,
      to: "/",
    },
    {
      id: 11,
      title: "Watch Series",
      icon: <SmartDisplayIcon />,
      to: "/watch-series",
    },
    {
      id: 22,
      title: "Watch Library",
      icon: <LibraryBooksIcon />,
      to: "/watch-library",
    },
    {
      id: 23,
      title: "Progress",
      icon: <LegendToggleIcon />,
      to: "/progress",
    },
    {
      id: 24,
      title: "Resources",
      icon: <AssessmentIcon />,
      to: "/resources",
      subItems: [
        {
          id: 241,
          title: "FAQ",
          to: "/resources/faq",
        },
        {
          id: 242,
          title: "About Us",
          to: "/resources/about-us",
        },
        {
          id: 242,
          title: "Teaching Method",
          to: "/resources/teaching-method",
        },
      ],
    },
    {
      id: 2,
      title: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  React.useEffect(() => {
    const matchingItem = ListData.find((item) => item.to === location.pathname);
    if (matchingItem) {
      setSelectedIndex(matchingItem.id);
      if (matchingItem.id === 24) {
        setOpenSubItems(true);
      }
    }
  }, [location.pathname]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setDopen(false);
  };

  const handleSubItemClick = (event, id) => {
    setSelectedIndex(id);
    setOpenSubItems(false);
  };

  const handleResourcesClick = () => {
    setOpenSubItems(!openSubItems);
  };

  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          py: "3px",
          display: "inline-flex",
          bgcolor: palette.typography.allVariants.color,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Box sx={{ display: "flex" }}>
          <img src={"/Logo.webp"} />
        </Box> */}
      </Box>
      <Box>
        <List component="nav">
          {ListData.map((val) => (
            <div key={val.id}>
              <ListItem
                disablePadding
                component={val.subItems ? "div" : Link}
                to={val.subItems ? undefined : val.to}
                sx={{
                  mb: 2,
                  backgroundColor:
                    selectedIndex === val.id ? "#FFFFFF59" : "transparent",
                }}
              >
                <ListItemButton
                  selected={selectedIndex === val.id}
                  onClick={(event) =>
                    val.subItems
                      ? handleResourcesClick()
                      : handleListItemClick(event, val.id)
                  }
                  sx={{
                    color: palette.typography.allVariants,
                    p: 2,
                    "&:hover": {
                      borderRadius: "10px",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: 2,
                      color: palette.typography.allVariants,
                    }}
                  >
                    {val.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: selectedIndex === val.id ? 700 : 500,
                      fontSize: "16px",
                    }}
                    primary={val.title}
                  />
                  {val.subItems ? (
                    openSubItems ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItemButton>
              </ListItem>
              {val.subItems && (
                <Collapse in={openSubItems} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {val.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.id}
                        disablePadding
                        component={Link}
                        to={subItem.to}
                      >
                        <ListItemButton
                          sx={{
                            pl: 4,
                            display: "flex",
                            justifyContent: "center",
                            color: palette.typography.allVariants,
                            "&:hover": {
                              borderRadius: "10px",
                            },
                          }}
                          onClick={(event) =>
                            handleSubItemClick(event, subItem.id)
                          }
                        >
                          <ListItemText
                            sx={{
                              textAlign: "left",
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              marginLeft: "54px",
                            }}
                            primary={subItem.title}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: theme.palette.primary.main,
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
