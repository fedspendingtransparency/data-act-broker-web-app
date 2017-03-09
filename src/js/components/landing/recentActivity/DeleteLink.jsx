/**
  * DeleteLink.jsx
  * Created by Minahm Kim 02/09/17
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';



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
		ReviewHelper.deleteSubmission(this.props.submissionId)
			.then((data) =>{
				if(data.message == 'Success'){
					this.confirm();
					this.props.reload();
				}else{
					console.log('Delete Failed')
				}
			})
	}

	render() {
		let button = 'N/A';
		if(this.state.delete){
			button = 
			<div onClick={this.confirm.bind(this)} className='trash-icon'>
				<Icons.Trash alt="Delete" />
			</div>;
			if(this.state.active){
				button = 
					<div onClick={this.delete.bind(this)}>
						<a className='usa-da-button btn-danger trash-link'>Delete?</a>
					</div>;
			}	
		}
		

		return (
			<div className="usa-da-recent-activity-link" >
				{button}
			</div>
		);
	}
}