import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import React from 'react';
import { useSelector } from 'react-redux';

function ToolbarLayout1(props) {
	const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className="flex relative z-10"
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.default }}
			>
				<Toolbar className="p-0 justify-end">
					<div className="flex">
						<UserMenu />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default ToolbarLayout1;
