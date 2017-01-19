import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import List from './List';
import Add from './Add';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDgUPM9zGJa_Yg4no2mo7AXWO2J0FaHD7o",
  authDomain: "certificate-aba5b.firebaseapp.com",
  databaseURL: "https://certificate-aba5b.firebaseio.com",
  storageBucket: "certificate-aba5b.appspot.com",
  messagingSenderId: "1005651535526"
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: "login",
      user: null,
      cId: null,
      county: null,
      hospitals: null,
      clerks: null,
      doctors: null,      
    };
    this.onNewRecord = this.onNewRecord.bind(this);
    this.onListRecord = this.onListRecord.bind(this);
    this.onEditRecord = this.onEditRecord.bind(this);
    this.onLoadOptions = this.onLoadOptions.bind(this);
  }

  signInFirebase(main, email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function() {
        main.setState({user: firebase.auth().currentUser});
        main.setState({currentPage: "list"});
        }, function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  signOutFirebase(main) {
    firebase.auth().signOut().then(function() {
      main.setState({user: null});
      main.setState({currentPage: "login"});
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  onNewRecord() {
    this.setState({currentPage: "add"});
  }

  onEditRecord(cId) {
    this.setState({currentPage: "edit"});
    this.setState({cId: cId});
  }

  

  onListRecord() {
    this.setState({currentPage: "list"});
  }

  onLoadOptions() {
    firebase.database().ref('options').once('value').then(
      (options)=>{
        this.setState({county: options.val().county});
        this.setState({hospitals: options.val().hospitals});
        this.setState({clerks: options.val().clerks});
        this.setState({doctors: options.val().doctors});
      });
  }

  componentWillMount() {
    var p = new Promise(()=>firebase.initializeApp(config));
    p.then(()=>{
      console.log("firebase initialized.")      
    });

    firebase.auth().onAuthStateChanged((user)=> {
      if (user!=null) {      
        let newUser = Object.assign({}, user);
        this.setState({user: newUser});
      } 
    });

  }

  render() {
    let page = null;

    switch (this.state.currentPage) {
      case "login":
      if (this.state.user==null) {
        page = <Login onSignIn={this.signInFirebase} appModule={this} />;
      }
      else {
        page = <List onNewRecord={this.onNewRecord} onEditRecord={this.onEditRecord} onLoadOptions={this.onLoadOptions}/>;
      }
        break;
      case "list":
        page = <List onNewRecord={this.onNewRecord} onEditRecord={this.onEditRecord} onLoadOptions={this.onLoadOptions}/>;
        break;
      case "add":
        page = <Add onListRecord={this.onListRecord} county={this.state.county} hospitals={this.state.hospitals} clerks={this.state.clerks} doctors={this.state.doctors}/>;
        break;
      case "edit":
        page = <Add onListRecord={this.onListRecord} cId={this.state.cId} county={this.state.county} hospitals={this.state.hospitals} clerks={this.state.clerks} doctors={this.state.doctors}/>;
        break;
      default:
        page = <div>Error</div>;
    }

    return (
      <div>
        <Header title="Trave Document Administration System" 
          onListRecord={this.onListRecord}
          onSignOut={this.signOutFirebase} 
          appModule={this} />
        {page}
        <Footer />
      </div>
    );
  }
}

export default App;
