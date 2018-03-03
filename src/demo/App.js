import React, { Component } from 'react';
import './App.css';
import ScrollDiv from '../scroll-div-component/scroll-div-component';
import JMBackground from '../assets/imgs/john-mayer-pic.jpg';

const styles = {
  marginTop: '50vh'
}
const bgImgDivStyles = {
  width: '100%',
  backgroundAttachment: "fixed",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
  fontWeight: '800',
  textTransform: 'uppercase',
  fontSize: '18px'
}
class App extends Component {
  render() {
    return (
      <div className="App" style={{minHeight: '300vh'}}>
        <header className="App-header">
          <h1 className="App-title">Parallax Div implementation Example</h1>
        </header>
          <ScrollDiv
            scrolling={true}
            speed={'1.8'}>
            <div className="div-to-scroll" style={{ ...styles }}>Hi This is the div to scroll..</div>
          </ScrollDiv>
          <ScrollDiv
            scrolling={true}
            speed={'1.2'}
            className="div-bg-img-wrapper"
            style={
              {
                position: 'absolute',
                backgroundAttachment: "fixed",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${JMBackground})`
              }
            }>
            <div className="div-bg-image" style={{ ...bgImgDivStyles }}>
                <p>And this is Just a Photo of John Mayer</p>
            </div>
          </ScrollDiv>
      </div>
    );
  }
}

export default App;
