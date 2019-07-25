import React, { Component } from 'react'
import { render } from 'react-dom'

import UniAlarm from '../../src/alarm/alarm'

class Demo extends Component {
  render() {
    return <div>
      <UniAlarm dot={false} type="account" />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
