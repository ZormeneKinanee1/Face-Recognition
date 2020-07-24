import React from 'react'; 
import Tilt from 'react-tilt';
import camera from './camera.png';
import './Logo.css';


const Logo = () =>{
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br-100 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
	 			<div className="Tilt-inner">
	 				<img src={camera} alt="Camera-Logo" />
	 			</div>
			</Tilt>
			
		</div>



	);
}




export default Logo;
