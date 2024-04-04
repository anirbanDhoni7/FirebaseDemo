import React from 'react';
import { Text, View, SafeAreaView, StatusBar, Platform, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMyStringValue, setStringValue } from '../components/AsyncStorage';
import CustomButton from '../components/CustomButton';
import { firebase } from '@react-native-firebase/auth';
import Firebase from '@react-native-firebase/app'
import { CommonActions } from '@react-navigation/native';

export default class Products extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      willAddNote: false,
      noteText: "",
      isEmpty: false,
      products: []
    }
  }

  componentDidMount = async() => {

    if(await getMyStringValue('products') !== null) {
      this.setState({ products: JSON.parse(await getMyStringValue("products")) }, () => 
      console.log(this.state.products));
    }
  }

  _addProduct = async () => {

    if(this.state.noteText.trim() === "") {
      this.setState({ isEmpty: true });
      this.refDesc.focus();
      return;
    }

    let products = this.state.products.length==0 ? [] : this.state.products;
    products.push({
      id: Math.random() + this.state.products.length.toString(), 
      editable: false, 
      text: this.state.noteText.trim(), 
      show: false
    });
    this.setState({ 
      products: products, 
      addNoteTouchable: false, 
      noteText: "", 
      isEmpty: false 
    }, async () => await setStringValue("products", this.state.products));
    products = [];
  }

  _updateProduct = async item => {
    if (!item.editable) {
      let products = this.state.products;
      this.state.products.map(element => {
        if(element.id === item.id) {
          element.editable = true;
          element.text = item.text;
        }
      });
      this.setState({ products: products, noteText: item.text });
      await setStringValue("products", this.state.products);
    } else {
      let products = this.state.products;
      this.state.products.map(element => {
        if(element.id === item.id) {
          element.text = this.state.noteText.trim();
          element.show=false;
          element.editable = false;
        }
      });
      this.setState({ products: products, noteText: "" });
      await setStringValue("products", this.state.products);
    }
  }

  _showSpecificProduct = async item => {
    let products = this.state.products;
    this.state.products.map(element => {
      if(element.id === item.id) {
        element.show = !element.show;
      }
    });
    this.setState({ products: products });
    await setStringValue("products", this.state.products);
  }

  _deleteProduct = async (item) => {

    let products = this.state.products;
    products.splice(this.state.products.indexOf(item), 1);
    this.setState({ products: products });
    products = [];
    await setStringValue("products", this.state.products);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#0095ba" />
        
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.headerBackgroundStyle}>
            <Text style={styles.headerTextStyle}>Products</Text>
          </View>
          
          <TouchableOpacity
          activeOpacity={0.5}
          style={styles.addNoteTouchable}
          onPress={() => this.setState({ addNoteTouchable: !this.state.addNoteTouchable })}
          >
            <Text style={styles.eachNoteText}>Add Product</Text>
          </TouchableOpacity>

          {
            this.state.addNoteTouchable &&
            <View style={styles.addNoteViewStyle}>
              <TextInput
              style={[styles.addNoteTextInputStyle, 
              this.state.isEmpty && this.state.noteText.trim()==="" &&{borderColor: '#ff0000'}]}
              ref={ref => this.refDesc = ref}
              multiline
              onChangeText={text => this.setState({noteText: text})}
              />

              <View style={{height: 5}}/>
              <TouchableOpacity 
              onPress={() => this._addProduct()}
              style={[styles.addNoteTouchable, {margin: 0, backgroundColor: '#1b1b1b'}]}>
                <Text style={[styles.eachNoteText, {color: '#fff'}]}>Add Product</Text>
              </TouchableOpacity>
            </View>
          }

          {
            this.state.products.length != 0 &&
            <View style={{padding: 15}}>
              <FlatList
              data={this.state.products}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {return <View style={{height: 10}}/>}}
              ListFooterComponent={<View style={{height: 230}}/>}
              keyExtractor={({item, index}) => index}
              renderItem={({item, index}) => (
                <View key={item.id}>
                  <TouchableOpacity 
                  onPress={() => this._showSpecificProduct(item)}
                  style={styles.eachNoteView}
                  key={index}>
                    <Text 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.eachNoteText, {width: '50%'}]}>{item.text}</Text>
                    <Icon
                    name={!item.show ? "angle-down" : "angle-up"}
                    size={25}
                    color="#444"
                    />                  
                  </TouchableOpacity>
                  {
                    item.show && 
                    <View style={styles.eachItemOverallView}>
                      <View style={{width: !item.editable ? '80%' : '75%'}}>
                        <TextInput 
                        defaultValue={item.text}
                        editable={item.editable}
                        multiline
                        onChangeText={text => this.setState({ noteText: text })}
                        style={styles.addNoteTextInputStyle}/>
                      </View>
                      <View style={styles.eachItemIconRowView}>
                        <TouchableOpacity
                        onPress={() => this._updateProduct(item)}>
                          {!item.editable ?
                          <Ionicons
                          name={Platform.OS==='android' ? 'md-create' : 'ios-create'}
                          size={25}
                          color="#444"
                          />
                          :
                          <Text>Update</Text>
                          }
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => this._deleteProduct(item)}
                        style={{paddingLeft: 10}}>
                          <Ionicons
                          name={Platform.OS==='android' ? 'md-trash' : 'ios-trash'}
                          size={25}
                          color="#444"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                </View>
              )}
              />
            </View>
          }
          <CustomButton
            text={"Sign Out"}
            color={"#0095ba"}
            fontSize={15}
            style={{width: '95%'}}
            borderRadius={10}
            onPress={() => {
              setStringValue('loginStatus', {login: 0})
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Home' },
                  ],
                })
              );
              firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                      // if user data exist
                      console.log('user ', user);
                      //clear previous user session
                      firebase.auth().signOut();
                  }
              });
            }}
          />
          <View  style={{height: 20}}/>
        </ScrollView>  
      </SafeAreaView>
    );
  }
}
