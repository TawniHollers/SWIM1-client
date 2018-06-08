import React from 'react';
import axios from 'axios';

class ASNDisplay extends React.Component {
	constructor(){
		super();
		this.state = {
			checkBox: []
		}
		this.sendData = this.sendData.bind(this);
		this.onChange = this.onChange.bind(this);
		this.formatData = this.formatData.bind(this);
		this.selectAll = this.selectAll.bind(this);
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
		for(let i = 0; i < this.props.serialNumbers.length; i++){
			document.getElementById(this.props.serialNumbers[i].serial).checked = true;
		}
					

	}

	sendData(event){
		event.preventDefault();
		const asn = this.props.asn;
		const dockDoor = this.props.dockDoor;
		let fserials = this.props.serialNumbers;
		let serials = fserials.map((serial)=>{
			let status;
			if(this.state.checkBox.indexOf(Number(serial.serial)) > -1){
				status = "RECEIVED"
			}
			else{
				status = "IN TRANSIT"
			}
			return {
				serial: serial.serial,
				status: status
			}
		})


		axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:8081/statusChange",
        data: {
           asn,
           dockDoor,
           serials
        }
      })
	}

	formatData(){
		let array = this.props.serialNumbers

		return array.map((data, idx)=>
			<tr key={idx}>
				<td>{data.serial}</td>
				<td><input type="checkbox" className="checkbox-display" value={data.serial} id={data.serial} onClick={this.onChange}></input></td>
			</tr>

		)
		console.log(this.state.checkBox);
	}
	  

   render() {
   	var styles = {
   		visibility: 'hidden'
   	}
   	let {asn} = this.props;
   	let {asnDisplay} = this.props;

   	if(asn > 0){
   		styles = null;

   	}
	      return (
	      	<div style={styles} className="col-sm-12 text-center received-table">
	      		<div className="col-sm-offset-5 col-sm-3 tableSerials text-center">
	      		<table>
	      			<tr>
	      				<th>Serial No.</th>
	      				<th>Received?</th>
	      			</tr>
	      			{this.formatData()}
	      			
	      		</table>
	      		</div>
	      		<div className="col-sm-12 buttonClass">
	      			<button className= "saveBtn bt btn-secondary" onClick={this.sendData}>Save</button>
	      			<button className="selectBtn btn " onClick={this.selectAll}>Select All</button>
	      		</div>
	      	</div>
   	
      );
   }
}
export default ASNDisplay