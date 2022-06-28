import { FC, useEffect, useRef } from 'react'
import { parsePath, roundCommands } from 'svg-round-corners'

export interface Position {
  x: number
  y: number
}

interface LineProps {
  startPos: Position
  endPos: Position
}

const Line: FC<LineProps> = ({ startPos, endPos }) => {
  // const arrowLeft = useRef<SVGPathElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return
    drawLine(pathRef.current, startPos, endPos)
  }, [])

  useEffect(() => {
    if (!pathRef.current) return
    drawLine(pathRef.current, startPos, endPos)
  }, [startPos, endPos])

  return (
    <path
      id='curve'
      strokeLinejoin='round'
      strokeWidth='2'
      ref={pathRef}
      d='M0 0'
      markerStart='url(#arrowstart)'
      markerEnd='url(#arrowhead)'
      stroke='#888'
      strokeLinecap='round'
      fill='transparent'
    />
  )
}

export default Line

function drawLine(element: SVGPathElement, startPos: Position, endPos: Position) {
  if (!startPos || !endPos) return

  const boxHeight = 120
  const boxWidth = 200

  const p1x = startPos.x + boxWidth
  const p1y = startPos.y + boxHeight / 2
  const p2x = endPos.x - 10
  const p2y = endPos.y + boxHeight / 2

  let curve

  if (p1x > p2x - 115) {
    curve = roundCommands(
      parsePath(
        `M ${p1x} ${p1y} L ${p1x + 60} ${p1y} L ${p1x + 60}  ${(p2y - p1y) / 2 + p1y} L ${p2x - 60} ${(p2y - p1y) / 2 + p1y} L ${
          p2x - 60
        } ${p2y} L ${p2x} ${p2y} `
      ),
      50
    )
  } else {
    curve = roundCommands(parsePath(`M ${p1x} ${p1y} L ${(p2x - p1x) / 2 + p1x} ${p1y} L ${(p2x - p1x) / 2 + p1x} ${p2y} L ${p2x} ${p2y} `), 50)
  }

  element.setAttribute('d', curve.path)
}
