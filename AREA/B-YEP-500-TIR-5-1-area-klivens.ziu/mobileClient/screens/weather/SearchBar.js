import React from 'react';
import { StyleSheet, Text, View, Button, textInput, TextInput } from 'react-native';



export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    const location = this.textInput.value;
    this.props.onClick(location);
    this.textInput.value = '';
  }

  render() {
   return (
     <View>
       <View>
         <TextInput    type="text" />
         <Button onClick={this.handleChange}> Submit </Button>
       </View>
     </View>
   );
 }
}
