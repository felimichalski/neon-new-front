import { Navbar, Group, ScrollArea, createStyles, Title, Button } from '@mantine/core';
import LinksGroup from '../LinksGroup';

import { Gauge } from '@styled-icons/entypo'
import { Sitemap } from '@styled-icons/fa-solid'
import { Discount } from '@styled-icons/boxicons-solid'
import { Link } from 'react-router-dom';

const items = [
  { label: 'Menu', icon: Gauge, link: '' },
  {
    label: 'Productos',
    icon: Sitemap,
    links: [
      { label: 'Cargar', url: 'products/create' },
      { label: 'Editar / Eliminar', url: 'products/update' },
    ],
  },
  {
    label: 'Códigos de descuento',
    icon: Discount,
    links: [
      { label: 'Cargar', url: 'discounts/create' },
      { label: 'Editar / Eliminar', url: 'discounts/update' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.white,
    padding: 0,
    position: 'sticky',
    height: '100vh',
    top: 0,
  },

  header: {
    padding: '1rem',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    padding: '1rem',
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center'
  },
}));

const Sidebar = () => {
  const { classes } = useStyles();
  const links = items.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
            <Title align='center' order={3}>Panel de Administrador</Title>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Button><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Volver</Link></Button>
      </Navbar.Section>
    </Navbar>
  );
}

export default Sidebar;