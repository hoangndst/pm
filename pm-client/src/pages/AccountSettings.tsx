import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ChangeInfo from 'src/components/Account/ChangeInfo';
import ChangePassrword from 'src/components/Account/ChangePassword';

export default function AccountSettings() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Change User Info" value="1" />
            <Tab label="Change Password" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ChangeInfo />
        </TabPanel>
        <TabPanel value="2">
          <ChangePassrword />
        </TabPanel>
      </TabContext>
    </Box>
  );
}