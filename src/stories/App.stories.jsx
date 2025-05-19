import React from 'react'
import App from '../App'
import '../App.css'

export default {
  title: 'Calculator/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f0f0f0'
      }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <App {...args} />

export const DefaultCalculator = Template.bind({})
DefaultCalculator.args = {}