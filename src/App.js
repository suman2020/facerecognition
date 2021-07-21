import React, {Component} from 'react';

import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from'./Components/SignIn/SignIn';
import Register from'./Components/Register/Register';

// defining parameters for moving particles on the background
const particlesOptions = {
    particles: {
      number: {
        value: 60,
        density:{
          enable: true,
          value_area : 800
        }
      }
    }
};
// defining app to use the functionality of Clarafai: image recognition api

const app = new Clarifai.App({
  apiKey: '5c8047de4a924665b01fa4828211273d'
});    


class App extends Component {
  constructor()
  {
    super();

    // use of state so that the changes in the parameters can be detected
    this.state = {
      input: '',
      imageUrl : '',
      box: {},
      route:'signin',
      signedIn: false,
    }
  }
// connecting to our backend
  componentDidMount(){
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log)
      // .then(data =>console.log(data))

  }


  // locating the face-dimensions and creating a box around it
  calculateFaceLocation = (datas) =>{

    const faceBox = datas.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)

    return{
      leftCol: faceBox.left_col * width ,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col*width) ,
      bottomRow: height -(faceBox.bottom_row * height)
    }


  }
  displayFaceBox = (box) =>{
    this.setState({box: box} )
    console.log(box)
  }

  // if user inputs something on the text-input box
  onInputChange = (event) =>{
    console.log(event.target.value);
    this.setState({input:event.target.value})
    // changing the input value to user-entered value
    }

// on hitting the submit button
  onSubmit = () =>{
    this.setState({imageUrl : this.state.input}) // update the image url with whatever the input is 
    console.log('CLick');

    // model to detect face
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)  
    // this.state.imageUrl cannot be used here cause it's going to give error
    .then(
      response =>{
        console.log(response)
        this.displayFaceBox(this.calculateFaceLocation(response))
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        // outputs the region where face is detected
    
      },
      )
    .catch(err => console.log(err) );
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({signedIn: false})

    }
    else if(route === 'home'){
      this.setState({signedIn: true})

    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
         <Particles className = 'particles'
                  params={particlesOptions} />
        <Navigation signedIn={this.state.signedIn} onRouteChange = {this.onRouteChange}/>
        {
          this.state.route === 'home'
          ?<div>
            <Logo />
            

            <Rank/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onSubmit}/>
            
             <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} /> 
          </div> 
          :(
            this.state.route ==='signin'
            ?<SignIn onRouteChange = {this.onRouteChange}/>
            :<Register onRouteChange = {this.onRouteChange}/>
          )
       }
       
      </div>
    );
  }
}

export default App;
