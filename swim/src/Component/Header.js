import React from 'react';
import swim from './swim.ico.jpg';
import {Link} from 'react-router-dom';

 

class Header extends React.Component {
	
   render() {
   
	      return (

        <div className="header">
        	<div className="row">
	         	<div className="col-sm-1 logo">
	         		<Link to = "/"><img className= "logoImg" src={swim} /></Link>
	         	</div>
	         	<div className="col-sm-11 pageTitle">
	         	<p className="textStyle"> SWIM Dashboard</p>
	         	</div>
	         </div>
	         	<hr className="divider" />
	      </div>
      );
   }
}
export default Header