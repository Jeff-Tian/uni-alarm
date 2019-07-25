import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Icon } from 'antd';
import './alarm.scss';

export default class UniAlarm extends Component {
  render() {
    return (
      <div className="bell-wrap">
        <Icon type="bell" />
        {
          this.props.dot ?
          <span className="bell-cycle"></span>
          : null
        }
      </div>
    )
  }
}
UniAlarm.defaultProps = {
  dot: false,
}
UniAlarm.propTypes = {
  dot: PropTypes.bool,
}