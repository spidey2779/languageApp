import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
  const styles={
    color: "white",
    textDecoration: "none",
    margin:"0.5rem",
    fontWeight: "bold",
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h5' mr='auto' textTransform={"uppercase"} fontWeight={'bold'}>LanGo</Typography>
        <Link to={"/"} style={styles}>Home</Link>
        <Link to={"/login"} style={styles}>login</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
