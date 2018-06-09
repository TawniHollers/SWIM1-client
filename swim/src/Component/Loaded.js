import React from 'react';
import axios from 'axios';
import ASNDisplay from './ASNDisplay';
import { Modal, Button } from 'react-bootstrap';

class Loaded extends React.Component {
	constructor(){
		super();
		this.state = {
			checkBox: [],
			serialNumbers: [],
			details: "",
			show: false
		}
		this.sendData = this.sendData.bind(this);
		this.onChange = this.onChange.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.goSomewhere = this.goSomewhere.bind(this);
	}

	onChange(e){
		const checkBox = this.state.checkBox;
		let index
		if(e.target.checked){
			console.log(+e.target.value)
			checkBox.push(+e.target.value)
		}
		else{
			index = checkBox.indexOf(+e.target.value)
			checkBox.splice(index, 1)
		}

		console.log(checkBox);

		this.setState({
			checkBox: checkBox
		})
	}

	selectAll(event){
		event.preventDefault();
		let checkBox = this.state.checkBox;
		for(let i = 0; i < this.state.serialNumbers.length; i++){
			document.getElementById(this.state.serialNumbers[i].serial).checked = true;
			if((checkBox.indexOf(Number(this.state.serialNumbers[i].serial) == -1) && (this.state.checkBox.length < this.state.serialNumbers.length))){
				checkBox.push(this.state.serialNumbers[i].serial)
			}
			// console.log("doing this");
			// console.log(this.props.location.state.asn)
		}
		this.setState({
			checkBox: checkBox,
			show: true
		})	

	}

	sendData(event){
		event.preventDefault();
		const asn = this.props.location.state.asn;
		const dockDoor = 0;
		
		let fserials = this.state.serialNumbers;
		console.log("Here")
		let serials = fserials.map((serial)=>{
			let status;
			if(this.state.checkBox.indexOf(Number(serial.serial)) > -1){
				status = "LOADED"
			}
			else{
				status = "RECEIEVED"
			}
			return {
				serial: serial.serial,
				status: status
			}

			console.log(status)
		})
		console.log(this.state.checkBox)


		axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:8080/statusChange",
        data: {
           asn,
           dockDoor,
           serials
        }
      })


	}

	receivedData(){
		let array = this.state.serialNumbers

		return array.map((data, idx)=>
			<tr key={idx}>
				<td>{data.serial}</td>
				<td><input type="checkbox" id={data.serial} value={data.serial} onClick={this.onChange}></input></td>
			</tr>

		)
		
	}

	goSomewhere(event){
		event.preventDefault();
		this.setState({
			show: false
		})
		this.props.history.push("/");
	}

	

   render() {
   	if(this.state.serialNumbers.length == 0){
   		this.setState({
			serialNumbers: JSON.parse(this.props.location.state.details)
		})
   	}
	      return (
	      	<div className="received-table">
	      		<table>
	      			<tr>
	      				<th>Serial No.</th>
	      				<th>Received?</th>
	      			</tr>
	      			{this.receivedData()}

	      			
	      		</table>

	      		<button onClick={this.sendData}>Save</button>
	      		<button onClick={this.selectAll}>Select All</button>

	      		<Modal> //show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title>Information has been saved</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Data has been Loaded</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.goSomewhere}>Close</Button>
          </Modal.Footer>
        </Modal>	

	      	</div>
   	
      );
   }	
}
export default Loaded;