import React, { Component } from 'react'
import { render } from 'react-dom'

import UniAlarm from '../../src/alarm/alarm'

class Demo extends Component {
  render() {
    return <div>
      <h1>uni-alarm Demo</h1>
      <UniAlarm dot />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
