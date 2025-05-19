import React from 'react'
import ButtonPanel from '../components/ButtonPanel'
import '../App.css'

export default {
  title: 'Calculator/ButtonPanel',
  component: ButtonPanel,
  argTypes: {
    onButtonClick: { action: 'buttonClicked' },
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 80px)',
        gridTemplateRows: 'repeat(5, 60px)',
        gap: '2px',
        padding: '10px',
        backgroundColor: '#3a3a3a',
        borderRadius: '10px',
        width: 'fit-content',
        margin: '20px auto'
      }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <ButtonPanel {...args} />

export const Default = Template.bind({})
Default.args = {
  onButtonClick: (label) => console.log(`Button ${label} clicked from ButtonPanel`),
}