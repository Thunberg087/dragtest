import { css, StyleSheet } from 'aphrodite'
import { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { ITreeItem } from './TreeView'

interface TreeItemProps {
  item: ITreeItem
  setPos: (x: number, y: number) => void
}

const TreeItem: FC<TreeItemProps> = ({ item, setPos }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef.current) return
    itemRef.current.style.top = item.y + 'px'
    itemRef.current.style.left = item.x + 'px'
  }, [item])

  useLayoutEffect(() => {
    if (itemRef.current) {
      dragElement(itemRef.current, setPos)
    }
  }, [])

  return (
    <div ref={itemRef} className={css(styles.mydiv)}>
      <p>{item.title}</p>
    </div>
  )
}

const styles = StyleSheet.create({
  mydiv: {
    position: 'absolute',
    zIndex: 5,
    backgroundColor: '#f1f1f1',
    border: '1px solid #d3d3d3',
    textAlign: 'center',
    width: 200,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    cursor: 'pointer',
  },
})

function dragElement(elmnt: any, onDrag: (x: number, y: number) => void) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0

  if (document.getElementById(elmnt.id + 'header')) {
    /* if present, the header is where you move the DIV from:*/
    const header = document.getElementById(elmnt.id + 'header')
    if (header) {
      header.onmousedown = dragMouseDown
    }
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown(e: any) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    const target = e.target as Node

    const parent = target.parentNode as HTMLDivElement

    onDrag(elmnt.offsetLeft - pos1, elmnt.offsetTop - pos2)

    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null
    document.onmousemove = null
  }
}

export default TreeItem
