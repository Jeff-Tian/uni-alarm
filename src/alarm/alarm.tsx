import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Icon } from 'antd';
import './alarm.scss';

export interface AlermProps {
  dot?: boolean,
  type?: string,
}

export default class UniAlarm extends Component<AlermProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      dot: this.props.dot,
    }
  }
  static defaultProps = {
    dot: false,
    type: '',
  }
  static propTypes = {
    dot: PropTypes.bool,
    type: PropTypes.string,
  }

  componentDidMount() {
    if (this.props.type === 'account') this.requestData();
  }

  // 获取新数据
  requestData() {
    fetch('https://dev.unicareer.com/account/uni-account-bff/v2/message/has-new', {
      method: 'GET',
      credentials: 'include',
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.success) {
        this.requestData();
        this.setState({ dot: res.data });
      }
    })
  }

  componentWillUnmount() {
    this.setState({ timer: null });
  }

  render() {
    return (
      <div className="uni-bell-wrap">
        <Icon type="bell" />
        {
          this.state.dot ?
          <span className="uni-bell-cycle"></span>
          : null
        }
      </div>
    )
  }
}