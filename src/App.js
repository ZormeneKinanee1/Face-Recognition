import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

import './App.css';



const app = new Clarifai.App({
 apiKey: 'f6088ab787ab4f5e91af7bdb403f2c9e'
});


const particleOptions = {
  particles:{
    number:{
      value:600, 
      density:{
        enable:true, 
        value_area:3500
      }
    }
  }
}


// In order to define a state must use a constructor 

class App extends Component {
  constructor()
  {
    super(); 
    this.state={
      input:'', 
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  boxFaceLocation = (data) =>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage'); 
    const width=Number(image.width); 
    const height=Number(image.height);
    return {
      leftColumn: clarifaiFace.left_col*width, 
      topRow: clarifaiFace.top_row *height,
      rightColumn: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row *height)
    } 

  }

  displayFaceBox = (box) => {
    return (this.setState({box:box}));
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => this.displayFaceBox(this.boxFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === "signout")
    {
      this.setState({isSignedIn:false})
    }
    else if(route === "home")
    {
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render()
  {
    // const {isSignedIn, imageUrl, route, box} = this.state; 

    return (
    <div className="App">
    <Particles className="particles"
       params={particleOptions} />
       
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} /> 
      { this.state.route === "home" 
       ?<div> 
          <Logo/>
          <Rank/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/> 
          <FaceRecognition 
          imageUrl={this.state.imageUrl} box={this.state.box}/>
        </div>

        : (
          this.state.route === "signin" 
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange} />
        )  
    }

    </div>
    );
  }
}

export default App; 
