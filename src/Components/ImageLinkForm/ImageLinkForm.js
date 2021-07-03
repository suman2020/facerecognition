import React from 'react';
import './ImageLinkForm.css';

const ImageLinkeForm = () =>{
	return (
		<div>
			<p className = 'f3'>
				{'This tool will recognize faces in your pictures. Wanna give it a try?'}
			</p>
			<div className = 'center'>
				<div className = 'center pa4 br3 shadow-5 form'>
					<input type = 'tex' className = 'f4 pa2 w-70 center'/>
					<button className ='f4 pa2 w-30 grow ph3 link pv2 dib white bg-black'>Detect</button>
				</div>
			</div>	
		</div>

		);


}

export default ImageLinkeForm;