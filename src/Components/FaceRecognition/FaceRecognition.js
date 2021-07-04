import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) =>{
	return (
		<div className = 'center pa3 '>
			<img id = "inputImage" alt ='' src ={imageUrl} width = '400' height = 'auto'/>
			<div className = 'bounding-box' style = {{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
		</div>
		)
}

export default FaceRecognition;