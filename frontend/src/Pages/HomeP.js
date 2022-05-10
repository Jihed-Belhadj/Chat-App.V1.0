import React from 'react'
import { Box, Container, Paper, Tab, Tabs, Typography} from '@mui/material';
import Login from '../Components/Authentification/Login';
import Register from '../Components/Authentification/Register';


function HomeP() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, NewValue) => {
    setSelectedTab(NewValue)
  }
  function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
  }

  const paperStyle={width:700, margin:'20px auto',opacity:1}
  
  return (
    <Container maxWidth='xl'  >
      <Box sx={{
        display: 'flex',
        fontFamily: 'Roboto',
        color:'grey', 
        fontSize:50,
        justifyContent: 'center',
        padding: 4,
        bgcolor: 'white',
        width: 635,
        opacity:1,
        marginTop: '10px',
        marginLeft:49,
        borderRadius: 3,
        border:'20px'
      }}>
       Chat-App
      </Box>
      {/* <Box sx={{
        display: 'flex',
        fontFamily: 'Roboto',
        color:'grey', 
        fontSize:30,
        justifyContent: 'center',
        padding: 4,
        bgcolor: 'white',
        width: '100%',
        opacity:0.8,
        marginTop: '10px',
        borderRadius: 3,
        border:'20px'
      }}> */}
        <Paper style={paperStyle}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab style={{width:350}} label='Login' />
          <Tab style={{width:350}} label='Register'  />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <Login handleTabChange={handleTabChange}></Login>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <Register></Register>
        </TabPanel>
          </Paper>
       


      {/* </Box> */}
    </Container>
  )
}

export default HomeP