import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Modal, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import ScreenStyles from './ScreenStyles';

export default class ModalComponent extends React.Component {
  render = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.props.isModalVisible}
    >
      <View style={ScreenStyles.modalOuterStyle}>
        <View
          style={[ScreenStyles.modalInnerStyle, this.props.height && { flex: this.props.height }]}
        >
          <View style={ScreenStyles.modalBodyContainer}>
            {this.props.modalBody}
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.props.isModalClose}
            style={ScreenStyles.modalCloseStyle}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
              size={20}
              color={'#000'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
