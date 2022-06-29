import { css, StyleSheet } from 'aphrodite'
import { FC, useState } from 'react'
import { QuestionTypesObjects } from '../App'
import { v4 as uuidv4 } from 'uuid'
import CreateQuestion from './CreateQuestion'

interface SidebarProps {
  addQuestion: (question: QuestionTypesObjects) => void
  items: QuestionTypesObjects[]
}

const Sidebar: FC<SidebarProps> = ({ items, addQuestion }) => {
  return (
    <div className={css(styles.sidebar)}>
      {items.map((item) => {
        return <div key={item.content}>{item.content}</div>
      })}
      {/* TODO replace with existing inputs */}
      <CreateQuestion addQuestion={addQuestion} />
    </div>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'relative',
    zIndex: 9,
    backgroundColor: 'white',
    border: '1px solid #d3d3d3',
    textAlign: 'center',
    width: '300px',
    height: '100vh',
    overflow: 'hidden',
    padding: '15px'
  },
})

export default Sidebar
