import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './List.css';
import './table.css';
import './toastr.css';
import * as firebase from 'firebase';

class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
			clients: null,
			clientsArray: [{
	  		  cId: "",
		      nameEn: "",
		      nameCh: "",
		      birthDate: "",
		      createDate: "",
	  		}],
		};
		this.loadSummary = this.loadSummary.bind(this);
		this.onRemoveRecord = this.onRemoveRecord.bind(this);
		
	}

	onRemoveRecord(cId) {
		if (confirm("Are you sure to delete this record?")) {
			if(cId) {
				firebase.database().ref('/kiki/summary/' + cId).remove().then(()=>{
					this.loadSummary();
				});
				firebase.database().ref('/kiki/detail/' + cId).remove();
				
			}
		}		
	}

	cellButton(cell, row, enumObject, rowIndex) {
		return (
			<div className="form-group">

				<div className="col-md-6">
					<button className="btn btn-primary" data-toggle="tooltip" title="Edit Record"
			          type="button" 
			          onClick={()=>this.props.onEditRecord(row.cId)}
			       >
			       <span className="glyphicon glyphicon-edit"></span>
			       </button>
		       </div>
		       <div className="col-md-6">
			       <button className="btn btn-danger" data-toggle="tooltip" title="Delete Record"
			          type="button" 
			          onClick={()=>this.onRemoveRecord(row.cId)}
			       >
			       <span className="glyphicon glyphicon-trash"></span>
			       </button>
		       </div>

	       </div>
			)
	}

	
	priceFormatter(cell, row){
	  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
	}

	json2array(json){
	    var result = [];
	    var keys = Object.keys(json);
	    keys.forEach(function(key){
	        result.push(json[key]);
	    });
	    return result;
	}

	loadSummary() {
		firebase.database().ref('/kiki/summary').once('value').then(
				(client)=>{
					let list = Object.assign({}, client.val());
					this.setState({clients: list,
							clientsArray: this.json2array(list)
					});					
				}
			);
	}


	componentWillMount() {
      this.loadSummary();
      this.props.onLoadOptions();
   }

  render() {
	
  	
    return (    	

    	<div className="container">
    		<div className="client-list">
	    		<div className="form-group">
	    			<div className="col-md-10">
	    			</div>
					<div className="col-md-2">
						<button type="button" className="btn btn-primary" onClick={this.props.onNewRecord}>
					    	<span className="glyphicon glyphicon-plus"></span> New Record
					    </button>
					</div>
				</div>
		    	<div className="form-group">
		    		<div className="col-md-10">
				        <BootstrapTable data={this.state.clientsArray} striped={true} hover={true}>
				          <TableHeaderColumn dataField="cId" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
					      <TableHeaderColumn dataField="nameEn" dataAlign="center" dataSort={true}>Name (En)</TableHeaderColumn>
					      <TableHeaderColumn dataField="nameCh" dataAlign="center" dataSort={true}>Name (Ch)</TableHeaderColumn>
					      <TableHeaderColumn dataField="birthDate" dataAlign="center" dataSort={true}>Birth Date</TableHeaderColumn>
					      <TableHeaderColumn dataField="createDate" dataAlign="center" dataSort={true}>Modify Date</TableHeaderColumn>
					      <TableHeaderColumn dataField="operate" dataFormat={this.cellButton.bind(this)} ></TableHeaderColumn>
						</BootstrapTable>
					</div>
			    </div>
			</div>
	    </div>
    );
  }
}

export default List;