import React, { memo } from 'react'

import { Handle, NodeProps, Position, Box } from 'react-flow-renderer'
import { NodeData } from './TreeView'

export default memo(({ data, isConnectable }: NodeProps<NodeData>) => {
  return (
    <>
      <Handle
        type='target'
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
        style={{ background: '#222', padding: 1 }}
      />
      <div style={{ top: 10, border: '1px solid #222', padding: '10px 15px', borderRadius: 5, fontSize: 12 }}>
        {data.label}
        <p>{data.type}</p>
      </div>
      <Handle
        type='source'
        position={Position.Right}
        id='a'
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#222', padding: 2, transform: 'translateX(2px) translateY(-50%)' }}
        isConnectable={isConnectable}
      />
    </>
  )
})
