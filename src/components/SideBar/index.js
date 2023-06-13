import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { createStyles } from '@mantine/core';
import { Person, Search, Cart, LineHorizontal3, ArrowEnter, SignOut, Pen, Star } from '@styled-icons/fluentui-system-regular'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';

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
    },
    subMenuCategoryItem:{
        textAlign:"center",
        background:"#CCCCCC"
    }
  }))

const SideBar = ({openMenu, setOpenMenu})=>{
    const { classes } = useStyles()
    const [firstCategory, setFirstCategory] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/types/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            const arrOfCat1 = [];
            data[0].categories.map(cat=>arrOfCat1.push(cat))
            setFirstCategory(arrOfCat1)
            console.log(firstCategory)
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories()
    }, []);
    return(
        <Sidebar className={classes.sideBar} rtl={false} width="100vw" backgroundColor="white">
            <Menu>
                <SubMenu label={"Categorías"} className={classes.menuItem}>
                    <SubMenu label={"Neones de diseño"} className={classes.subMenuItem}>
                        {firstCategory.map((cat,index)=><MenuItem key={index} component={<Link onClick={()=>setOpenMenu(false)} to={`categories/${cat.id}`} key={index}></Link>} className={classes.subMenuCategoryItem}>{cat.name}</MenuItem>)}
                    </SubMenu>
                    <SubMenu label={"Colecciones"} className={classes.subMenuItem}>

                    </SubMenu>
                </SubMenu>
                <SubMenu label={<div><Person size={20}/><span> Usuario</span></div>} className={classes.menuItem}>
                    <MenuItem className={classes.subMenuItem}> Productos Favoritos </MenuItem>
                    <MenuItem className={classes.subMenuItem}> Editar perfil </MenuItem>
                    <MenuItem className={classes.subMenuItem}> Cerrar sesión </MenuItem>
                </SubMenu>
                <MenuItem onClick={()=>setOpenMenu(false)} component={<Link to="/cart" />} className={classes.menuItem}> <Cart size={20}/> Mi carrito </MenuItem>
                <MenuItem onClick={()=>setOpenMenu(false)} component={<Link to="/contact" />} className={classes.menuItem}> Contactános </MenuItem>
                <MenuItem onClick={()=>setOpenMenu(false)} component={<Link to="/about" />} className={classes.menuItem}> Sobre nosotros </MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SideBar