import React from 'react'
import { observer, inject } from "mobx-react";
import { Button } from 'antd-mobile';

import "./test.less"

@inject("HomeStore")
@observer
export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	addCount() {
		this.props.HomeStore.addCount()
	}

	lessCount() {
		this.props.HomeStore.lessCount()
	}
	render() {
		const { count } = this.props.HomeStore;
		return (
			<div className="test test2">
				<Button type="primary" onClick={this.addCount.bind(this)}>Count +</Button>
				<Button type="warning" onClick={this.lessCount.bind(this)}>Count -</Button>
				<p>hello world</p>
				<div>{count}</div>
			</div>
		)
	}
}