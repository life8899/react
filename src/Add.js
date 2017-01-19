import React, { Component } from 'react';
import './Add.css';
import './Calendar.css';
import './TimePicker.css';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as firebase from 'firebase';

const clientIni = {
				firstNameCh: "",
				lastNameCh: "",
				middleNameEn: "",
				firstNameEn: "",
				lastNameEn: "",
				gender:"",
				genderCh:" ",
				birthDate:"",
				birthTime:"00:00:00",
				countyNameCh:"",
				countyAddressCh:"",
				hospitalId:"H_0",
				hospitalName:"",
				hospitalAddress:"",
				hospitalCity:"",
				hospitalCounty:"CT_0",
				countyClerk:"",
				doctorId:"D_0",
				doctorNameCh:"",
				doctorNameEn:"",
				doctorTitleCh:"",
				doctorAddressCh:"",
				clerkId:"CK_0",
				clerkNameCh:"",
				clerkNameEn:"",
				clerkTitleCh:"",
				clerkNumber:"",
				clerkSignDate:"",
				fatherFirstNameCh:"",
				fatherLastNameCh:"",
				fatherBirthDate:"",
				motherFirstNameCh:"",
				motherLastNameCh:"",
				motherBirthDate:"",
				parent:"",
				parentSignDate:"",
				localRegistrationNo:"",
				registrationDate:"",
				issueDate:"",
				certificationNo:"",
			};

class Add extends Component {	

	constructor(props) {

		super(props);
		this.state = {
			client: clientIni,
			options: {
				genderOption: [
					{ value: '', label: ' ' },
					{ value: 'Male', label: 'Male' },
					{ value: 'Female', label: 'Female' }				
				],
				countyOption: [
					{ value: "CT_0", label: ' ' },					
				],
				hospitalOption: [
					{ value: "H_0", label: ' ' },	
				],
				doctorOption: [
					{ value: "D_0", label: ' ' },
				],
				clerkOption: [
					{ value: "CK_0", label: ' ' },
				],
				parentOption: [
					{ value: '', label: ' ' },
					{ value: 'father', label: 'Father' },
					{ value: 'mother', label: 'Mother' }
				],
			},
			report: {
				birthCertificate: false,
				passport: false,
				travelDocument: false,
			}
		};

		this.onChange = this.onChange.bind(this);
		this.onClear = this.onClear.bind(this);
		this.onSaveRecord = this.onSaveRecord.bind(this);
		this.onBirthDateChange = this.onBirthDateChange.bind(this);
		this.onBirthTimeChange = this.onBirthTimeChange.bind(this);
		this.onHospitalChange = this.onHospitalChange.bind(this);
		this.onGenerateForms = this.onGenerateForms.bind(this);
		this.onGenderChange = this.onGenderChange.bind(this);
		this.iniCountySelect = this.iniCountySelect.bind(this);
		this.onCountyChange = this.onCountyChange.bind(this);
		this.iniHospitalSelect = this.iniHospitalSelect.bind(this);
		this.clearHospital = this.clearHospital.bind(this);
		this.clearClerk = this.clearClerk.bind(this);
		this.clearDoctor = this.clearDoctor.bind(this);
		this.iniDoctorSelect = this.iniDoctorSelect.bind(this);
		this.onDoctorChange = this.onDoctorChange.bind(this);
		this.iniClerkSelect = this.iniClerkSelect.bind(this);
		this.onClerkChange = this.onClerkChange.bind(this);
		this.onFatherBirthDateChange = this.onFatherBirthDateChange.bind(this);
		this.onMotherBirthDateChange = this.onMotherBirthDateChange.bind(this);
		this.onClerkSignDateChange = this.onClerkSignDateChange.bind(this);
		this.onRegistrationDateChange = this.onRegistrationDateChange.bind(this);
		this.onIssueDateChange = this.onIssueDateChange.bind(this);
		this.onParentChange = this.onParentChange.bind(this);
		this.onParentSignDateChange = this.onParentSignDateChange.bind(this);
		
	}

	onSaveRecord() {
		// console.log(this.state.client);
		
		
		firebase.database().ref('kiki/max_client_id').once('value').then(
			(id)=>{
				var cId = null;
				var maxId = null;
				if (this.props.cId) {
					cId = this.props.cId
					maxId = id.val();
				}
				else {
					maxId = id.val()+1;
					cId = "C_" + maxId;
				}
				
				var updates = {};
				updates['/kiki/detail/' + cId] = this.state.client;
				updates['kiki/summary/' + cId] = {
					cId: cId,
					nameEn: this.state.client.firstNameEn + " " + this.state.client.middleNameEn + " " + this.state.client.lastNameEn,
					nameCh: this.state.client.lastNameCh + this.state.client.firstNameCh,
					birthDate: this.state.client.birthDate,
					createDate: new moment().format("YYYY-MM-DD")
				}
				updates['/kiki/max_client_id'] = maxId;
				firebase.database().ref().update(updates);				
			}
		).then(alert("Record saved."))
		// firebase.database().ref('kiki/C01').set(this.state.client);

	}

	onChange(e) {
		let newClient = Object.assign({}, this.state.client, {[e.target.id] : e.target.value});
		this.setState({client : newClient});
	}

	onGenderChange(obj) {
		let newClient = Object.assign({}, this.state.client);
		newClient.gender = obj.value;
		if (obj.value==='Male') {
			newClient.genderCh = '男';
		}
		else {
			newClient.genderCh = '女';
		}
		this.setState({client : newClient});				
	}

	onClear() {
		// Clear states
		this.setState({client: clientIni});		
	}

	onBirthDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {birthDate: date});
		this.setState({client : newClient});
	}

	onFatherBirthDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {fatherBirthDate: date});
		this.setState({client : newClient});
	}

	onMotherBirthDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {motherBirthDate: date});
		this.setState({client : newClient});
	}

	onParentSignDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {parentSignDate: date});
		this.setState({client : newClient});
	}

	onRegistrationDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {registrationDate: date});
		this.setState({client : newClient});
	}

	onIssueDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {issueDate: date});
		this.setState({client : newClient});
	}

	onClerkSignDateChange(date) {
		date = date.replace(/-/g, "/");
		let newClient = Object.assign({}, this.state.client, {clerkSignDate: date});
		this.setState({client : newClient});
	}

	onBirthTimeChange(time) {
		let newClient = Object.assign({}, this.state.client, {birthTime:time.format("HH:mm:ss")});
		this.setState({client : newClient});
	}

	onParentChange(obj) {
		let newState = Object.assign({}, this.state);
		newState.client.parent = obj.value;
		this.setState(newState);
	}

	onHospitalChange(obj) {
		let newState = Object.assign({}, this.state);
		newState.client.hospitalId = obj.value;
		newState.client.hospitalName = obj.label;
		newState.client.hospitalAddress = this.props.hospitals[obj.value].addressCh;
		newState.client.hospitalCity = this.props.hospitals[obj.value].cityCh;
		this.setState(newState);
		this.iniDoctorSelect(obj.value);
		this.iniClerkSelect(obj.value);
		this.clearDoctor();
		this.clearClerk();
	}

	iniHospitalSelect(countyId) {		
		let options = this.props.hospitals;
		let newHospital = [];
		let county = this.props.county[countyId];
		if (county!=null) {
			for (var key in options) {
				if (!options.hasOwnProperty(key)) continue;			
				if (options[key].county===county.nameEn) {
					newHospital.push({value: key, label: options[key].nameCh});
				}			
			}
		}		
		let newState = Object.assign({}, this.state);
		newState.options.hospitalOption = newHospital;		
		this.setState(newState);
	}

	onClerkChange(obj) {
		let newState = Object.assign({}, this.state);
		newState.client.clerkId = obj.value;
		newState.client.clerkNameCh = obj.label;
		newState.client.clerkNameEn = this.props.clerks[obj.value].nameEn;
		newState.client.clerkTitleCh = this.props.clerks[obj.value].titleCh;
		this.setState(newState);
	}

	iniClerkSelect(hospitalId) {
		let options = this.props.clerks;
		let newClerk = [{ value: null, label: '' }];
		let hospital = this.props.hospitals[hospitalId];
		if (hospital!=="H_0") {
			for (var key in hospital.clerks) {	
				if (hospital.clerks[key]) {
					newClerk.push({value: key, label: options[key].nameCh});
				}			
			}
		}		
		let newState = Object.assign({}, this.state);
		newState.options.clerkOption = newClerk;
		this.setState(newState);
	}

	onDoctorChange(obj) {
		let newState = Object.assign({}, this.state);
		newState.client.doctorId = obj.value;
		newState.client.doctorNameCh = obj.label;
		newState.client.doctorNameEn = this.props.doctors[obj.value].nameEn;
		newState.client.doctorTitleCh = this.props.doctors[obj.value].titleCh;
		newState.client.doctorAddressCh = this.props.doctors[obj.value].addressCh;
		this.setState(newState);
	}

	iniDoctorSelect(hospitalId) {
		let options = this.props.doctors;
		let newDoctor = [{ value: null, label: '' }];
		let hospital = this.props.hospitals[hospitalId];
		if (hospital!=="H_0") {
			for (var key in hospital.doctors) {	
				if (hospital.doctors[key]) {
					newDoctor.push({value: key, label: options[key].nameCh});
				}			
			}
		}		
		let newState = Object.assign({}, this.state);
		newState.options.doctorOption = newDoctor;
		this.setState(newState);
	}

	onCountyChange(obj) {
		let newState = Object.assign({}, this.state);
		newState.client.hospitalCounty = obj.value;
		let county = this.props.county[obj.value];
		newState.client.countyNameCh = county.nameCh;
		newState.client.countyAddressCh = county.address;
		if (county!=null) {
			let clerk = this.props.clerks[county.clerk];
			if (clerk!=null) {
				newState.client.countyClerk = clerk.nameCh;
			}
			else {
				newState.client.countyClerk = "";
			}
			newState.client.countyNameCh = county.nameCh;
		}
		else {
			newState.client.countyClerk = "";
		}		
		this.setState(newState);
		this.clearHospital();
		this.iniHospitalSelect(obj.value);		
	}

	onGenerateForms() {
		axios.post('http://localhost:8080/generate', this.state.client)
		.then(function (response) {
			alert(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	iniCountySelect(options) {
		let newCounty = [];
		for (var key in options) {
			if (!options.hasOwnProperty(key)) continue;
			newCounty.push({value: key, label: options[key].nameCh });
		}
		let newOptions = Object.assign({}, this.state.options, {
			countyOption: newCounty
		})
		let newState = Object.assign({}, this.state, {
			options: newOptions 
		});
		this.setState(newState);
	}

	clearBasicInfo() {
		let newState = Object.assign({}, this.state);
		newState.client.firstNameCh = "";
		newState.client.lastNameCh = "";
		newState.client.firstNameEn = "";
		newState.client.middleNameEn = "";
		newState.client.lastNameEn = "";
		newState.client.gender = null;
		newState.client.birthDate = "";
		newState.client.birthTime = "00:00:00";
		this.setState(newState);
	}

	clearHospital() {
		let newState = Object.assign({}, this.state);
		newState.client.hospitalId = "H_0";
		newState.client.hospitalAddress = "";
		newState.client.hospitalCity = "";
		this.setState(newState);
		this.clearClerk();
		this.clearDoctor();
	}

	clearClerk() {
		let newState = Object.assign({}, this.state);
		newState.client.clerkId = null;
		newState.client.clerkNameEn = "";
		newState.client.clerkNameCh = "";
		newState.client.clerkTitleCh = "";
		this.setState(newState);
	}

	clearDoctor() {
		let newState = Object.assign({}, this.state);
		newState.client.doctorId = null;
		newState.client.doctorNameCh = "";
		newState.client.doctorNameEn = "";
		newState.client.doctorTitleCh = "";
		newState.client.doctorAddressCh = "";
		this.setState(newState);
	}


	componentWillMount() {
		this.iniCountySelect(this.props.county);
		if (this.props.cId) {

			firebase.database().ref('kiki/detail/' + this.props.cId).once('value').then(
				(client)=>{						
					this.iniHospitalSelect(client.val().hospitalCounty);					
					this.iniDoctorSelect(client.val().hospitalId);
					this.iniClerkSelect(client.val().hospitalId);
					this.setState({client: client.val()});	
				}
			);
		}
	}

	componentDidMount() {		
		// console.log("host: " + window.location.hostname);
	}

   
	render() {

		var hiddenStyle = {};
		if (window.location.hostname!=='localhost') {
			hiddenStyle.display = 'none'
		}

		return (
		<div className="container">
			<div className="add-client">
				<div className="panel-group" >
					<form className="form-horizontal" >
						<div className="form-group">
			  				<div className="col-md-2">	
						  	</div>
							<div className="col-md-2">			   		
								<input type="button" className="btn btn-primary" onClick={this.onSaveRecord} value="Save" />
							</div>
							<div className="col-md-2" style={hiddenStyle}>			   		
								<input type="button" className="btn btn-primary" onClick={this.onGenerateForms} value="Report" />
							</div>							
							<div className="col-md-2">			   		
								<input type="button" className="btn btn-primary" onClick={this.onClear} value="Clear" />
							</div>
							<div className="col-md-2">			   		
								<input type="button" className="btn btn-primary" onClick={this.props.onListRecord} value="Close" />
							</div>
							<div className="col-md-2">	
						  	</div>
						</div>
					</form>
					<br/>
					<div className="panel panel-primary">
					{/* Basic Information */}
						<div className="panel-heading">Basic Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
			  					<div className="form-group">	
				  					<label className="control-label col-sm-2">First Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="firstNameCh" value={this.state.client.firstNameCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Last Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="lastNameCh" value={this.state.client.lastNameCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Certification#</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="certificationNo" value={this.state.client.certificationNo} onChange={this.onChange}/>
									</div>
								</div>		  

			  					<div className="form-group">
									<label className="control-label col-sm-2">First Name (En)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="firstNameEn" value={this.state.client.firstNameEn} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Middle Name (En)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="middleNameEn" value={this.state.client.middleNameEn} onChange={this.onChange}/>
									</div>	  
									<label className="control-label col-sm-2">Last Name (En)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="lastNameEn" value={this.state.client.lastNameEn} onChange={this.onChange}/>
									</div>
								</div>

								<div className="form-group">
									<label className="control-label col-sm-2">Gender</label>
									<div className="col-md-2">
										<Select
											id="gender"
											value={this.state.client.gender}
											options={this.state.options.genderOption}
											onChange={this.onGenderChange}
											clearable={false}
										/>
									</div> 				 
									<label className="control-label col-sm-2">Birth Date</label>
									<div className="col-md-2">
										<Calendar id="birthDate" format='YYYY-MM-DD' date={this.state.client.birthDate} onChange={this.onBirthDateChange}/>
									</div>
									<label className="control-label col-sm-2">Birth Time</label>
									<div className="col-md-2">
										<TimePicker id="birthTime" value={new moment(this.state.client.birthTime, "HH:mm:ss")} onChange={this.onBirthTimeChange}/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-sm-2">Local Registration#</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="localRegistrationNo" value={this.state.client.localRegistrationNo} onChange={this.onChange}/>
									</div> 				 
									<label className="control-label col-sm-2">Registration Date</label>
									<div className="col-md-2">
										<Calendar id="registrationDate" format='YYYY-MM-DD' date={this.state.client.registrationDate} onChange={this.onRegistrationDateChange}/>
									</div>
									<label className="control-label col-sm-2">Issue Date</label>
									<div className="col-md-2">
										<Calendar id="issueDate" format='YYYY-MM-DD' date={this.state.client.issueDate} onChange={this.onIssueDateChange}/>
									</div>
								</div>
							</form>
						</div>
					</div>
				{/* County and Hospital Information */}
					<div className="panel panel-primary">
						<div className="panel-heading">Hospital Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">
									<label className="control-label col-sm-2">County</label>
									<div className="col-md-2">
										<Select
										    id="county"
										    value={this.state.client.hospitalCounty}
										    options={this.state.options.countyOption}
										    onChange={this.onCountyChange}
										    clearable={false}
										/>
									</div>
									<label className="control-label col-sm-2">County Clerk</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="countyClerk" value={this.state.client.countyClerk} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Hospital</label>
									<div className="col-md-2">
										<Select
											id="hospital"
											value={this.state.client.hospitalId}
											options={this.state.options.hospitalOption}
											onChange={this.onHospitalChange}
											clearable={false}
										/>
									</div>
								</div>
			  					<div className="form-group">								
									<label className="control-label col-sm-2">Address</label>
									<div className="col-md-6">
										<input type="text" className="form-control" id="hospitalAddress" value={this.state.client.hospitalAddress} onChange={this.onChange}/>
									</div>								
									<label className="control-label col-sm-2">City</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="hospitalCity" value={this.state.client.hospitalCity} onChange={this.onChange}/>
									</div>									
								</div>
								<div className="form-group">								
									<label className="control-label col-sm-3">Health Care Agency Address</label>
									<div className="col-md-9">
										<input type="text" className="form-control" id="countyAddressCh" value={this.state.client.countyAddressCh} onChange={this.onChange}/>
									</div>															
								</div>
							</form>
						</div>
					</div>
				{/* Doctor Information */}
					<div className="panel panel-primary">
						<div className="panel-heading">Doctor Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">
									<label className="control-label col-sm-2">Name (Ch)</label>
									<div className="col-md-2">
										<Select
											id="doctor"
											value={this.state.client.doctorId}
											options={this.state.options.doctorOption}
											onChange={this.onDoctorChange}
											clearable={false}
										/>
									</div>
									<label className="control-label col-sm-2">Name (En)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="doctorNameEn" value={this.state.client.doctorNameEn} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Title</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="doctorTitleCh" value={this.state.client.doctorTitleCh} onChange={this.onChange}/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-sm-2">Address</label>
									<div className="col-md-10">
										<input type="text" className="form-control" id="doctorAddressCh" value={this.state.client.doctorAddressCh} onChange={this.onChange}/>
									</div>
								</div>
							</form>
						</div>
					</div>
				{/* Clerk Information */}
					<div className="panel panel-primary">
						<div className="panel-heading">Clerk Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">
									<label className="control-label col-sm-2">Name (Ch)</label>
									<div className="col-md-3">
										<Select
											id="clerk"
											value={this.state.client.clerkId}
											options={this.state.options.clerkOption}
											onChange={this.onClerkChange}
											clearable={false}
										/>
									</div>
									<label className="control-label col-sm-2">Name (En)</label>
									<div className="col-md-3">
										<input type="text" className="form-control" id="clerkNameEn" value={this.state.client.clerkNameEn} onChange={this.onChange}/>
									</div>									
								</div>		
								<div className="form-group">	
									<label className="control-label col-sm-2">Title</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="clerkTitleCh" value={this.state.client.clerkTitleCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Number</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="clerkNumber" value={this.state.client.clerkNumber} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Sign Date</label>
									<div className="col-md-2">
										<Calendar id="clerkSignDate" format='YYYY-MM-DD' date={this.state.client.clerkSignDate} onChange={this.onClerkSignDateChange}/>
									</div>
								</div>						
							</form>
						</div>
					</div>
				{/* Father Information */}
					<div className="panel panel-primary">
						<div className="panel-heading">Father Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">
									<label className="control-label col-sm-2">First Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="fatherFirstNameCh" value={this.state.client.fatherFirstNameCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Last Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="fatherLastNameCh" value={this.state.client.fatherLastNameCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Birth Date</label>
									<div className="col-md-2">
										<Calendar id="fatherBirthDate" format='YYYY-MM-DD' date={this.state.client.fatherBirthDate} onChange={this.onFatherBirthDateChange}/>
									</div>
								</div>								
							</form>
						</div>
					</div>
				{/* Mother Information */}
					<div className="panel panel-primary">
						<div className="panel-heading">Mother Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">
									<label className="control-label col-sm-2">First Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="motherFirstNameCh" value={this.state.client.motherFirstNameCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Last Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="motherLastNameCh" value={this.state.client.motherLastNameCh} onChange={this.onChange}/>
									</div>
									<label className="control-label col-sm-2">Birth Date</label>
									<div className="col-md-2">
										<Calendar id="motherBirthDate" format='YYYY-MM-DD' date={this.state.client.motherBirthDate} onChange={this.onMotherBirthDateChange}/>
									</div>
								</div>								
							</form>
						</div>
					</div>
				{/* Parent Signature */}
					<div className="panel panel-primary">
						<div className="panel-heading">Parent Signature</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">
									<label className="control-label col-sm-2">Choose Parent</label>
									<div className="col-md-2">
										<Select
											id="parent"
											value={this.state.client.parent}
											options={this.state.options.parentOption}
											onChange={this.onParentChange}
											clearable={false}
										/>
									</div>
									<div className="col-md-4">
									</div>
									<label className="control-label col-sm-2">Sign Date</label>
									<div className="col-md-2">
										<Calendar id="parentSignDate" format='YYYY-MM-DD' date={this.state.client.parentSignDate} onChange={this.onParentSignDateChange}/>
									</div>
								</div>								
							</form>
						</div>
					</div>
					<div className="panel panel-primary" style={hiddenStyle}>
						<div className="panel-heading">Forms</div>
						<div className="panel-body">
							<form className="form-horizontal" >
			  					<div className="form-group">	
				  					<div className="checkbox col-md-12">
										<label><input type="checkbox" value="this.state.report.birthCertificate" /> Birth Certificate</label>
									</div>
									<div className="checkbox col-md-12">
										<label><input type="checkbox" value="this.state.report.passport" /> Passport</label>
									</div>
									<div className="checkbox col-md-12">
										<label><input type="checkbox" value="this.state.report.travelDocument" /> Travel Document</label>
									</div>
								</div>
							</form>
						</div>
					</div>
					{/*
					<div className="panel panel-primary">
						<div className="panel-heading">Basic Information</div>
						<div className="panel-body">
							<form className="form-horizontal" >
								<div className="form-group">	
									<label className="control-label col-sm-2">First Name (Ch)</label>
									<div className="col-md-2">
										<input type="text" className="form-control" id="firstNameCh" value={this.state.client.firstNameCh} onChange={this.onChange}/>
									</div>
								</div>
							</form>
						</div>
					</div>
					*/}
					<br/>
					<br/>
					<form className="form-horizontal" >
						<div className="form-group">
			  				<div className="col-md-2">	
						  	</div>
							<div className="col-md-2">			   		
								<input type="button" className="btn btn-primary" onClick={this.onSaveRecord} value="Save" />
							</div>
							<div className="col-md-2" style={hiddenStyle}>			   		
								<input type="button" className="btn btn-primary" onClick={this.onGenerateForms} value="Report" />
							</div>							
							<div className="col-md-2">			   		
								<input type="button" className="btn btn-primary" onClick={this.onClear} value="Clear" />
							</div>
							<div className="col-md-2">			   		
								<input type="button" className="btn btn-primary" onClick={this.props.onListRecord} value="Close" />
							</div>
							<div className="col-md-2">	
						  	</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		);
	};
}
export default Add;
