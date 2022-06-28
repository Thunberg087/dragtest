import { css, StyleSheet } from 'aphrodite'
import { FC } from 'react'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return <div className={css(styles.sidebar)}>
    awd
  </div>
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'relative',
    zIndex: 9,
    backgroundColor: 'white',
    border: '1px solid #d3d3d3',
    textAlign: 'center',
    width: '200px',
    height: '100vh',
    overflow: 'hidden',
    cursor: 'pointer',
  },
})

export default Sidebar
