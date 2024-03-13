import React from 'react'

const Reward = () => {
  handleOption1 = () => {
    // Handle the logic for option 1 here
  }

  handleOption2 = () => {
    // Handle the logic for option 2 here
  }
  return (
    <div>
      <h2>Choose your reward:</h2>
      <button onClick={this.handleOption1}>Option 1</button>
      <button onClick={this.handleOption2}>Option 2</button>
    </div>
  )
}

export default Reward
