import { css, StyleSheet } from 'aphrodite'
import { FC, useState } from 'react'
import { QuestionType, QuestionTypesObjects } from '../App'
import { v4 as uuidv4 } from 'uuid'
import Select from 'react-select'

interface CreateQuestionProps {
  addQuestion: (question: QuestionTypesObjects) => void
}

const CreateQuestion: FC<CreateQuestionProps> = ({ addQuestion }) => {
  const [contentInput, setContentInput] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('Dropdown')

  const createQuestion = () => {
    if (!(contentInput.length > 0)) {
      return alert('Please fill all fields')
    }

    if (questionType === 'Dropdown') {
      addQuestion({
        id: uuidv4(),
        content: contentInput,
        type: questionType,
        position: {
          x: 200,
          y: 200,
        },
        alternatives: [],
      })
    } else if (questionType === 'YesNo') {
      addQuestion({
        id: uuidv4(),
        content: contentInput,
        type: questionType,
        position: {
          x: 200,
          y: 200,
        },
      })
    }
  }

  const options: { value: QuestionType; label: string }[] = [
    { value: 'Dropdown', label: 'Dropdown' },
    { value: 'YesNo', label: 'Yes or no question' },
  ]

  return (
    <div>
      {/* TODO replace with existing inputs */}
      <input type='text' name='content' placeholder='Question content' onChange={(e) => setContentInput(e.target.value)} value={contentInput} />

      <Select options={options} onChange={(val) => val?.value && setQuestionType(val?.value)} />

      <button onClick={createQuestion}>Add question</button>
    </div>
  )
}

const styles = StyleSheet.create({})

export default CreateQuestion
