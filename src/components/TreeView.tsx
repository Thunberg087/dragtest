import { FC, Fragment, useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  Position,
} from 'react-flow-renderer'
import useArray from '../hooks/useArray'
import Line from './Line'
import TreeItem from './TreeItem'
import ConnectionLine from './ConnectionLine'

interface TreeProps {}

export interface ITreeItem {
  id: string
  title: string
  x: number
  y: number
  relations?: string[]
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },

  {
    id: '2',
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#333' },
    style: {
      stroke: '#333',
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#333' },
    style: {
      stroke: '#333',
    },
  },
]

const TreeView: FC<TreeProps> = () => {
  const { array: items, updateElement: updateTreeItem } = useArray<ITreeItem>([
    { id: 'ergergerg', title: 'ERG', x: 100, y: 10, relations: ['test'] },
    { id: 'test', title: 'Test', x: 500, y: 10, relations: ['hej'] },
    { id: 'hej', title: 'Hej', x: 300, y: 400 },
  ])

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <svg style={{ width: '100%', height: '100%' }}>
        <defs>
          <marker id='arrowstart' markerWidth='15' markerHeight='15' refX='5' refY='7' orient='auto'>
            <circle cx='7' cy='7' r='5' stroke='black' strokeWidth='1' fill='#555' />
          </marker>
          <marker id='arrowhead' markerWidth='5' markerHeight='7' refX='0' refY='3.5' orient='auto'>
            <polygon points='0 0, 5 3.5, 0 7' />
          </marker>
        </defs>
        {items.map((item) => {
          return (
            <Fragment key={item.id}>
              {item.relations?.map((relation) => {
                const endItem = items.find((el) => el.id === relation)

                if (!endItem) return <div key={relation}>No end item</div>
                return <Line key={relation} startPos={{ x: item.x, y: item.y }} endPos={{ x: endItem.x, y: endItem.y }} />
              })}
            </Fragment>
          )
        })}
      </svg>
      {items.map((item) => {
        return (
          <Fragment key={item.id}>
            <TreeItem
              item={item}
              setPos={(x, y) => {
                updateTreeItem(items.findIndex((el) => el.id === item.id))({ ...item, x, y })
              }}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

export default TreeView
