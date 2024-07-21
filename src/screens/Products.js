import React from 'react';
import { Text, View, SafeAreaView, StatusBar, Platform, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { getMyStringValue, setStringValue } from '../components/AsyncStorage';
import CustomButton from '../components/CustomButton';
import { firebase } from '@react-native-firebase/auth';
import Firebase from '@react-native-firebase/app'
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '../redux/action';

class Products extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      willAddNote: false,
      newProduct: "",
      isEmpty: false,
      products: []
    }
  }

  componentDidMount = async() => {

    this.setState({ products: this.props.products }, () => 
      console.log(this.state.products));
  }

  _updateProduct = async (item) => {
    if (!item.editable) {
      let products = this.state.products;
      this.state.products.map(element => {
        if(element.id === item.id) {
          element.editable = true;
          element.text = item.text;
        }
      });
      this.setState({ products: products, newProduct: item.text });
      // await setStringValue("products", this.state.products);
    } else {
      await this.props.dispatch(updateProduct({
        item,
        newProduct: this.state.newProduct,
        endEditing: () => this.setState({ newProduct: "" })
      }))
      // await setStringValue("products", this.state.products);
    }
  }

  _showSpecificProduct = async (item) => {
    let products = this.props.products;
    this.state.products.map(element => {
      if(element.id === item.id) {
        element.show = !element.show;
      }
    })
    this.setState({ products: products });
    // await setStringValue("products", products);
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
                    this.state.isEmpty && this.state.newProduct.trim() === "" && { borderColor: '#ff0000' }]}
              ref={ref => this.refDesc = ref}
              multiline
                  onChangeText={text => this.setState({ newProduct: text })}
              />

              <View style={{height: 5}}/>
              <TouchableOpacity 
                  onPress={async () => {
                    await this.props.dispatch(addProduct({
                      isTextFieldEmpty: this.state.newProduct.trim() === "",
                      clearTextField: () => {
                        this.setState({ isEmpty: true });
                        this.refDesc.focus();
                        return;
                      },
                      newProduct: this.state.newProduct,
                      endEditing: () =>
                        this.setState({
                          addNoteTouchable: false,
                          newProduct: "",
                          isEmpty: false
                        })
                    }));
                  }}
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
                    onPress={() => this._showSpecificProduct(item, item.id)}
                  style={styles.eachNoteView}
                    key={item.id}>
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
                            onChangeText={text => this.setState({ newProduct: text })}
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
                            onPress={async () => {
                              await this.props.dispatch(deleteProduct({
                                item,
                                endEditing: () =>
                                  this.setState({
                                    addNoteTouchable: false,
                                    newProduct: "",
                                    isEmpty: false
                                  })
                              }));
                              // this._addProduct()
                            }}
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
              // setStringValue('loginStatus', {login: 0})
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

export default props => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  console.log('products', products);
  return <Products {...props} dispatch={dispatch} products={products} />
}