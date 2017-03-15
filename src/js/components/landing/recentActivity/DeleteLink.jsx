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
			delete: false,
			errorMessage: ''
		}
	}

	componentDidMount() {
		this.didUnmount = false;
		this.canDelete();
	}

	componentWillUnmount() {
		this.didUnmount = true;
	}

	confirm(){
		this.setState({active: !this.state.active});
	}

	canDelete(){
		if(this.props.account.website_admin==true){
			this.setState({delete: true});
			return;
		}else if(this.props.account.helpOnly==true){
			this.setState({delete: false});
			return;
		}
		this.props.account.affiliations.forEach((aff)=>{
			if(aff.agency_name == this.props.item.agency && (aff.permission == "writer" || aff.permission == 'submitter')){
				this.setState({delete:true});
				return;
			}
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
			}).catch((error) => {
				console.log('CATCH', error);
				let errorMessage = "";
					errorMessage = error.message

				this.setState({errorMessage: errorMessage});
				setTimeout( ()=>{
					this.setState({errorMessage: '', delete: true, active: false });
				}, 5000)
			});
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
				{this.state.errorMessage ? this.state.errorMessage : button }
			</div>
		);
	}
}