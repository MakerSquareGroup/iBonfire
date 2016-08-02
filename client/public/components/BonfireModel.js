import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
    
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default () => {
  return (
    <div id="bonfireModel">
      <div id="modelTextBox">
        <MuiThemeProvider>
          <TextField
            hintText="City/State"
          />
        </MuiThemeProvider>  
        <br/>
        <MuiThemeProvider>
          <TextField
            hintText="City/State"
          />
        </MuiThemeProvider>  
      </div>        
    </div>
  )
}