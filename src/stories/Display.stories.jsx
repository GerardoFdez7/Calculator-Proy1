import React from 'react'
import Display from '../components/Display'
import '../App.css'

export default {
  title: 'Calculator/Display',
  component: Display,
  argTypes: {
    previousOperand: { control: 'text' },
    currentOperand: { control: 'text' },
    operation: { control: 'text' },
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ width: '300px', margin: '20px auto', backgroundColor: '#3a3a3a', padding: '10px', borderRadius: '10px' }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Display {...args} />

export const Empty = Template.bind({})
Empty.args = {
  previousOperand: '',
  currentOperand: '0', // Typically starts with 0 or empty
  operation: null,
}

export const WithPreviousOperand = Template.bind({})
WithPreviousOperand.args = {
  previousOperand: '123',
  currentOperand: '456',
  operation: '+',
}

export const ShowingResult = Template.bind({})
ShowingResult.args = {
  previousOperand: '',
  currentOperand: '579',
  operation: null,
}

export const ErrorDisplay = Template.bind({})
ErrorDisplay.args = {
  previousOperand: '10 ÷',
  currentOperand: 'ERROR',
  operation: null,
}

export const LongNumbers = Template.bind({})
LongNumbers.args = {
  previousOperand: '123456789',
  currentOperand: '987654321',
  operation: '*',
}