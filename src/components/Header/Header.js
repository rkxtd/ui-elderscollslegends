import React, { useContext, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Context, SEARCH } from "../../stores/Cards";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  searchWrapper: {
    display: 'flex',
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 10,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "32ch",
      "&:focus": {
        width: "38ch",
      },
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const { dispatch } = useContext(Context);
  const inputRef = useRef(null);

  const handleEnter = (event) => {
    const { value } = event.target;
    let searchTerm = "";
    let creatureType = "";

    if (event.keyCode === 13) {

      if (value.indexOf(':') !== -1) {
        [searchTerm, creatureType] = value.split(':');
      } else {
        searchTerm = value;
      }

      dispatch({ type: SEARCH, searchTerm, creatureType });
    }
  };

  const handleClearButtonClick = () => {
    inputRef.current.value = '';
    dispatch({ type: SEARCH });
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar className={classes.appBar}>
          <Typography className={classes.title} variant="h6" noWrap>
            Elder Scrolls: Legends
          </Typography>
          <div className={classes.searchWrapper}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                inputRef={inputRef}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={handleEnter}
              />

            </div>
            <Button
              variant="contained"
              onClick={handleClearButtonClick}
            >Clear</Button>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
