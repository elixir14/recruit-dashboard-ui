export const SET_SETTINGS = '[SETTINGS] SET SETTINGS';
export const SET_DEFAULT_SETTINGS = '[SETTINGS] SET DEFAULT SETTINGS';
export const SET_INITIAL_SETTINGS = '[SETTINGS] SET INITIAL SETTINGS';
export const RESET_DEFAULT_SETTINGS = '[SETTINGS] RESET DEFAULT SETTINGS';

export function setSettings(value) {
	return {
		type: SET_SETTINGS,
		value
	};
}

export function setDefaultSettings(value) {
	let value1
	value1 = {layout:
		{style:'layout1',
		config:
				{
					scroll:"content",
					navbar:
						{
							display:true,
							folded:true,
							position:"left"
						},
						toolbar:
							{
								display:true,
								style:"fixed",
								position:"below"
						},
						footer:
							{
								display:true,
								style:"fixed",
								position:"below"
						},
						mode:"fullwidth"
					}
				},
				customScrollbars:true,
				theme:
				{
					main:"defaultDark",
					navbar:"defaultDark",
					toolbar:"defaultDark",
					footer:"defaultDark"
				}
			}
	return {
		type: SET_DEFAULT_SETTINGS,
		value1
		
	};
}

export function setInitialSettings() {
	return {
		type: SET_INITIAL_SETTINGS
	};
}

export function resetSettings(value) {
	return {
		type: RESET_DEFAULT_SETTINGS,
		value
	};
}
