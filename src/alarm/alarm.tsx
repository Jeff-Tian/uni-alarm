import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Icon } from 'antd';
import './alarm.scss';

export interface AlermProps {
  dot?: boolean,
}

export default class UniAlarm extends Component<AlermProps, any> {
  static defaultProps = {
    dot: false,
  }
  static propTypes = {
    dot: PropTypes.bool,
  }
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