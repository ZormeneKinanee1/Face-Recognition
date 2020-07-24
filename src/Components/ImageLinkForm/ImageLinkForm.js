import React from 'react'; 
import './ImageLinkForm.css'



const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(
		<div>
		   <p className="f3" style={{color:"blue"}}>
          {'This Application will detect faces in your uploaded images. Have fun!'}
          </p>
          <div className="center">
            <div className="form center pa4 br1 shadow-3 w-50">
	          	<input className="f3 pa2 w-70" type="text" onChange={onInputChange} placeholder="Insert Image URL" />
	          	<button className="w-30 grow f3 link pv3 dib white bg-black" onClick={onButtonSubmit}>Detect</button>
          	</div> 
          </div> 
	
			
			
		</div>



	);
}




export default ImageLinkForm;
