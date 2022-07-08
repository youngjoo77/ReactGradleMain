import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { removeAccesstoken, removeExpiresAccesstoken, isAuthenticated } from "@modules/auth/authModule"
import { BasicButton } from "@components/button/button"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const navItems = ['logout'];

const Header = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const deleteAccesstoken = React.useCallback(() => dispatch(removeAccesstoken()),
		[dispatch]
	);

	const deleteExpiresAccesstoken = React.useCallback(() => dispatch(removeExpiresAccesstoken()),
		[dispatch]
	);

	const saveIsAuthenticated = React.useCallback(
		(authenticated: string) => dispatch(isAuthenticated({ isAuthenticated: authenticated })),
		[dispatch]
	);

	console.log("Header !!!!");

const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        HEADER
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;

	const LogoutHandler = () => {
		console.log("logout  버튼 클릭 !!!!");

		localStorage.removeItem('token');

		deleteAccesstoken();
		deleteExpiresAccesstoken();
		saveIsAuthenticated("false");

		navigate("/login"); // 로그인 페이지로 이동
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar component="nav">
			<Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            HEADER
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
             <BasicButton
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={LogoutHandler}
				>
					logout
				</BasicButton>
          </Box>
        </Toolbar>
      </AppBar>
		</Box>
		
		
	)
}
export default Header;