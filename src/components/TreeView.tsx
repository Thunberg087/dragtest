import { FC, useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  Position,
} from 'react-flow-renderer'
import { QuestionType, QuestionTypesObjects } from '../App'
import useArray from '../hooks/useArray'
import ConnectionLine from './ConnectionLine'
import TreeItem from './TreeItem'
import { v4 as uuidv4 } from 'uuid'

interface TreeViewProps {
  items: QuestionTypesObjects[]
  updateQuestion: (index: number) => (newItem: QuestionTypesObjects) => void
}

export interface ITreeItem {
  id: string
  title: string
  x: number
  y: number
  relations?: string[]
}

const nodeTypes = {
  customNode: TreeItem,
}

export interface NodeData {
  label: string
  type: QuestionType
}

const TreeView: FC<TreeViewProps> = ({ items, updateQuestion }) => {
  const { array: nodes, push: pushNode, setArrayDispatch: setNodes } = useArray<Node<NodeData>>([])
  const { array: edges, push: pushEdge, setArrayDispatch: setEdges } = useArray<Edge>([])

  const onNodesChange = (changes: NodeChange[]) => {
    changes.forEach((change) => {
      if (change.type === 'position' && change.position) {
        const index = items.findIndex((el) => el.id === change.id)
        updateQuestion(index)({ ...items[index], position: change.position })
      }
    })
  }

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges])
  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  useEffect(() => {
    setNodes(items.map(createNodeFromItem))

    const edges: Edge[] = []
    items.forEach((item) => {
      if (item.type === 'Dropdown') {
        item.alternatives.forEach((alt) => {
          const edge: Edge = {
            id: uuidv4(),
            source: item.id,
            target: alt.nextQuestionId,
          }
          edges.push(edge)
        })
      } else if (item.type === 'YesNo') {
        if (item.yesAlternative?.nextQuestionId) {
          const edge: Edge = {
            id: uuidv4(),
            source: item.id,
            target: item.yesAlternative?.nextQuestionId,
          }
          edges.push(edge)
        }
        if (item.noAlternative?.nextQuestionId) {
          const edge: Edge = {
            id: uuidv4(),
            source: item.id,
            target: item.noAlternative?.nextQuestionId,
          }
          edges.push(edge)
        }
      }
    })
    setEdges(edges)
  }, [items])

  const createNodeFromItem = (item: QuestionTypesObjects): Node => ({
    id: item.id,
    type: 'customNode',
    data: { label: item.content, type: item.type },
    position: { x: item.position.x, y: item.position.y },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  })

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* <pre>{JSON.stringify(items)}</pre> */}

      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        fitView
        connectionLineComponent={ConnectionLine}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesConnectable={true}
        nodeTypes={nodeTypes}
        maxZoom={1.2}
      ></ReactFlow>
    </div>
  )
}

export default TreeView
