/**
  * DeleteLink.jsx
  * Created by Minahm Kim 02/09/17
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

import DeleteModal from './DeleteModal.jsx';



export default class DeleteLink extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			active: false,
			delete: false
		}
	}

	componentDidMount() {
		this.didUnmount = false;
		this.canDelete();
	}

	componentWillUnmount() {
		this.didUnmount = true;
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.confirm !== this.props.confirm){
			this.props.reload();
		}
		this.canDelete();
	}

	confirm(){
		this.props.warning(this.props.index);
	}

	canDelete(){
		let deletable = (this.props.account.website_admin || !this.props.account.helpOnly);

		if(!deletable){
			this.props.account.affiliations.forEach((aff)=>{
				if(aff.agency_name == this.props.item.agency && (aff.permission == "writer" || aff.permission == 'submitter')){
					deletable = true;
					return;
				}
			})
		}

		this.setState({
			delete: deletable,
			active: this.props.confirm
		})
	}

	delete(){
		this.confirm();
		this.props.reload();
	}

	reset(){
		this.setState({
			active: false
		})
	}

	render() {
		let button = 'N/A';
		let modal = null;
		if(this.state.delete){
			button = <div onClick={this.confirm.bind(this)} className='trash-icon'>
						<Icons.Trash alt="Delete" />
					</div>;
			modal = <DeleteModal isOpen={this.state.active} closeModal={this.reset.bind(this)} delete={this.delete.bind(this)} id={this.props.submissionId} />

		}
		

		return (
			<div>
				<div className="usa-da-recent-activity-link" >
					{button}
				</div>
				{modal}
			</div>
		);
	}
}