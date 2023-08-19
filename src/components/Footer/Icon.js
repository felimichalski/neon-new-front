import { createStyles } from '@mantine/core'
import { Instagram, Whatsapp, Tiktok } from '@styled-icons/boxicons-logos'

const useStyles = createStyles((theme, {name}) => ({
  root: {
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: (name.toLowerCase() === 'instagram') ? 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' : ((name.toLowerCase() === 'whatsapp')) ? '#25d366' : theme.black,
    margin: '0 1rem',
    padding: '.5rem',
    boxShadow: '0 1px 10px 1px rgba(255, 255, 255, 0.25)',
    transition: '.2s ease-out',

    '&:hover': {
      transform: 'scale(1.1) translateY(-.1rem)'
    }
  },

  icon: {
    color: theme.white,
    fontSize: (name.toLowerCase() === 'instagram') ? '23px' : '20px'
  }
}))

const Icon = ({data}) => {

  const { url, name } = data;

  const { classes } = useStyles({name})

  return (
    <a className={classes.root} target='_blank' href={url} rel="noreferrer">
      {(name.toLowerCase() === 'instagram') ? 
      <Instagram className={classes.icon}/>
      :
      (name.toLowerCase() === 'whatsapp') ?
      <Whatsapp className={classes.icon}/> :
      <Tiktok className={classes.icon}/>
      }
    </a>
  )
}
// 
export default Icon;