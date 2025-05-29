import {Dimensions} from 'react-native';
import {heightToDp, widthToDp} from './ResponsiveComponent';

export default {
  //modal styles
  modalOuterStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 8, 10, 0.50)',
    alignItems: 'center',
  },
  modalCloseStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 35 / 2,
    elevation: 5,
    marginTop: 5,
  },
  modalInnerStyle: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBodyContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  }
};
