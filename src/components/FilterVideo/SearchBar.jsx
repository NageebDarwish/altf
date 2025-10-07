import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createApiUrl, API_ENDPOINTS } from "../../config/api";

const SearchBar = ({ suggestions, setShowSearchBar }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const handleCloseSearch = () => {
    setShowSearchBar(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    setSearchLoading(true);
    const body = {
      title: searchValue,
    };
    await axios
      .post(createApiUrl(API_ENDPOINTS.search.videos), body)
      .then((result) => {
        navigate(`/dashboard/search-results?query=${searchValue}`, {
          state: result?.data?.payload,
        });
        setSearchLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setSearchLoading(false);
      });
  };

  const filteredSuggestions = suggestions.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOutsideClick = (e) => {
    // Check if the click was outside the dialog box
    if (e.target.closest("#search-dialog") === null) {
      handleCloseSearch();
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: {xs:"120px",md:"70px"},
        zIndex: 1000,
      }}
      onClick={handleOutsideClick}
    >
      <Box
        id="search-dialog"
        sx={{
          width: "100%",
          maxWidth: "1000px",
          padding: "12px",
          backgroundColor: "white",
          borderRadius: "16px",
          marginTop: "23px",
          boxShadow: 3,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Search..."
            autoFocus
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              width: "100%",
              padding: "10px",
              borderRadius: "16px",
              backgroundColor: "white",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleCloseSearch}
                  sx={{ color: "text.primary" }}
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            disabled={!searchValue || searchLoading}
            variant="contained"
            onClick={handleSearch}
            sx={{ ml: 1, textTransform: "none" }}
          >
            {searchLoading ? <CircularProgress size={20} /> : "Search"}
          </Button>
        </Box>
        {searchValue && (
          <List
            sx={{
              marginTop: "10px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item, index) => {
                const parts = item.title.split(
                  new RegExp(`(${searchValue})`, "gi")
                );
                return (
                  <ListItem
                    key={index}
                    sx={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                    }}
                    onClick={() => setSearchValue(item.title)}
                  >
                    {parts.map((part, i) => (
                      <Typography
                        key={i}
                        component="span"
                        sx={{
                          fontWeight:
                            part?.toLowerCase() === searchValue?.toLowerCase()
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {part}
                      </Typography>
                    ))}
                  </ListItem>
                );
              })
            ) : (
              <ListItem
                sx={{
                  padding: "8px 16px",
                  justifyContent: "center",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                No videos found
              </ListItem>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
