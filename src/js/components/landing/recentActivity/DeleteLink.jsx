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
					console.log('Delete Success')
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
			<div onClick={this.confirm.bind(this)}>
				<Icons.Trash alt="Delete" />
			</div>;
			if(this.state.active){
				button = 
					<div onClick={this.delete.bind(this)}>
						<a className='usa-da-button btn-danger'>Delete?</a>
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