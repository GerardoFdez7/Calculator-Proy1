import React from 'react'
import Button from '../components/Button'
import '../App.css'

export default {
  title: 'Calculator/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    className: { control: 'text' },
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Button {...args} />

export const Digit = Template.bind({})
Digit.args = {
  label: '7',
  onClick: (label) => console.log(`Button ${label} clicked`),
}

export const Operator = Template.bind({})
Operator.args = {
  label: '+',
  onClick: (label) => console.log(`Button ${label} clicked`),
  className: 'operator',
}

export const Function = Template.bind({})
Function.args = {
  label: 'AC',
  onClick: (label) => console.log(`Button ${label} clicked`),
  className: 'ac',
}

export const SpanTwo = Template.bind({})
SpanTwo.args = {
  label: '0',
  onClick: (label) => console.log(`Button ${label} clicked`),
  className: 'span-two',
}