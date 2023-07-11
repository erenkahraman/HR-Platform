import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const DrawerFunc = ({ DrawerOpen }) => {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const theme = useTheme();

  return (
    <DrawerHeader>
      <Toolbar>
        {isOpen ? (
          <IconButton
            aria-label="close drawer"
            edge="start"
            sx={{
              color: "#fff",
              marginRight: 10,
            }}
            onClick={handler}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        ) : (
          <IconButton
            aria-label="open drawer"
            onClick={handler}
            edge="start"
            sx={{
              color: "#fff",
              marginRight: 0,
              ...(isOpen && { display: "none" }),
            }}
          >
            {theme.direction === "rtl" ? <ChevronLefIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Toolbar>
    </DrawerHeader>
  );
};
