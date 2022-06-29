import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import TreeView from './components/TreeView'
import useArray from './hooks/useArray'

export type QuestionTypesObjects = DropdownQuestion | YesNoQuestion | EndScreenQuestion

export type QuestionType = 'Dropdown' | 'YesNo' | 'EndScreen'

export interface Position {
  x: number
  y: number
}

export interface BaseQuestion {
  id: string
  content: string
  position: Position
}

export interface Alternative {
  content: string
  nextQuestionId: string
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'Dropdown'
  alternatives: Alternative[]
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'YesNo'
  yesAlternative?: Alternative
  noAlternative?: Alternative
}

export interface EndScreenQuestion extends BaseQuestion {
  type: 'EndScreen'
}

function App() {
  const {
    array: questions,
    setArray: setQuestions,
    push: pushQuestion,
    update: updateQuestion,
  } = useArray<QuestionTypesObjects>([
    {
      id: 'fransk123',
      content: 'Är du fransk?',
      type: 'YesNo',
      position: { x: 0, y: 100 },
      noAlternative: { content: 'Nej', nextQuestionId: 'pass123' },
      yesAlternative: { content: 'Ja', nextQuestionId: 'complete123' },
    },
    {
      id: 'pass123',
      content: 'Har du pass?',
      type: 'Dropdown',
      position: { x: 250, y: 100 },
      alternatives: [
        {
          content: 'Test',
          nextQuestionId: 'complete123',
        },
      ],
    },
    {
      id: 'complete123',
      content: 'Complete :)',
      type: 'EndScreen',
      position: { x: 250, y: 200 },
    },
  ])

  const addQuestion = (question: QuestionTypesObjects) => {
    pushQuestion(question)
  }

  return (
    <div className='App'>
      <Sidebar items={questions} addQuestion={addQuestion} />

      <TreeView items={questions} updateQuestion={updateQuestion} />
    </div>
  )
}

export default App
