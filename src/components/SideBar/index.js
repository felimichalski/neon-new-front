import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { createStyles } from '@mantine/core';
import { Person, Search, Cart, LineHorizontal3, ArrowEnter, SignOut, Pen, Star } from '@styled-icons/fluentui-system-regular'
import { Link } from "react-router-dom"

const useStyles = createStyles((theme) => ({
    container:{
      position:"relative",
    },
    sideBar:{
      position:"absolute",
      zIndex:"10000",
      height:"100vh",
      opacity:"0.95"
    },
    menuItem:{
        textAlign:"center",
        paddingRight:"1rem"
    },
    subMenuItem:{
        textAlign:"center",
        background:"#F9F9F9"
    }
  }))

const SideBar = ({openMenu, setOpenMenu})=>{
    const { classes } = useStyles()
    return(
        <Sidebar className={classes.sideBar} rtl={false} width="100vw" backgroundColor="white">
            <Menu>
                <MenuItem className={classes.menuItem}> Categorías </MenuItem>
                <SubMenu label={<div><Person size={20}/><span> Usuario</span></div>} className={classes.menuItem}>
                    <MenuItem className={classes.subMenuItem}> Productos Favoritos </MenuItem>
                    <MenuItem className={classes.subMenuItem}> Editar perfil </MenuItem>
                    <MenuItem className={classes.subMenuItem}> Cerrar sesión </MenuItem>
                </SubMenu>
                <MenuItem onClick={()=>setOpenMenu(false)} component={<Link to="/cart" />} className={classes.menuItem}> <Cart size={20}/> Mi carrito </MenuItem>
                <MenuItem className={classes.menuItem}> Contactános </MenuItem>
                <MenuItem className={classes.menuItem}> Sobre nosotros </MenuItem>
                <MenuItem className={classes.menuItem}> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SideBar