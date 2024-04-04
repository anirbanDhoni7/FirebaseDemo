import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {Modal, View, TouchableOpacity, Platform} from 'react-native';
import ItemDetailsComponent from './ItemDetailsComponent';
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
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ItemDetailsComponent
            backgroundColor="#fff"
            trophy
            isModalVisible={this.props.isModalVisible}
            secondaryView={this.props.secondaryView}
            reference={this.props.reference}
            refTextFontSize={this.props.refTextFontSize}
            selectionColor={this.props.selectionColor}
            refText={this.props.refText}
            navigation={this.props.navigation}
            itemDetailsArray={this.props.modalRowItems.map(element => ({
              ...element,
              topicHeaderWidth: element.topicHeaderWidth
                ? element.topicHeaderWidth
                : '0%',
              descWidth: element.descWidth ? element.descWidth : '90%',
              rightIconWidth: '10%',
              hasIconAtRightSide: this.props.hasIconAtRightSideInEachItem,
              isModal: true,
              modalOpenFunction: element.modalOpenFunction
                ? () => element.modalOpenFunction()
                : undefined,
              modalCloseFunction: element.isModalClose,
              iconType: element.iconType ? element.iconType : 'videocam',
              fontSize: 17,
              internalPlay: element.internalPlay,
            }))}
          />

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
