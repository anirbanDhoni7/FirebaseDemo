import React from 'react';
import {Platform, Text, TouchableOpacity, View, Linking} from 'react-native';
import ScreenStyles from './ScreenStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';

class ItemDetailsComponent extends React.Component {
  renderSecondaryView = () =>
    this.props.secondaryView && (
      <View
        style={[
          ScreenStyles.styleEachDetailItemView,
          ScreenStyles.additionalStyleForStumping,
        ]}
      >
        {this.props.videoUrl && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL(this.props.videoUrl)}
          >
            <Text
              style={[
                ScreenStyles.styleYearLeftText,
                {
                  width: '100%',
                  color: this.props.theme.dark ? '#0000ff' : '#008000',
                  fontSize: 15,
                },
              ]}
            >
              Watch Video
            </Text>
          </TouchableOpacity>
        )}
        {
          <TouchableOpacity
            disabled={!this.props.imageUrl}
            activeOpacity={0.7}
            style={this.props.refText ? {width: '100%'} : {}}
            onPress={
              this.props.imageUrl == 1
                ? this.props.referencePageNavigationOnpress
                : () => Linking.openURL(this.props.imageUrl)
            }
          >
            <Text
              selectable
              selectionColor={
                this.props.selectionColor
                  ? this.props.selectionColor
                  : '#fafafa'
              }
              style={[
                ScreenStyles.styleDescRightText,
                {
                  width: '100%',
                  color: this.props.theme.dark ? '#0000ff' : '#008000',
                  fontSize: this.props.refTextFontSize
                    ? this.props.refTextFontSize
                    : 15,
                },
              ]}
            >
              {this.props.reference
                ? this.props.refText
                  ? this.props.refText
                  : 'View References'
                : 'View Images'}
            </Text>
          </TouchableOpacity>
        }
      </View>
    );

  closeModalAndOpenLink = (modalCloseFunction, url) => {
    modalCloseFunction();
    url && Linking.openURL(url);
  };

  renderRightIconView = (
    url,
    iconType,
    width,
    isModal,
    modalCloseFunction,
    notPlatformSpecificIcon,
    iconColor,
    isSvg,
    isFontAwesome
  ) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{width, paddingLeft: '1.5%', alignSelf: 'center'}}
      onPress={() =>
        isModal
          ? this.closeModalAndOpenLink(modalCloseFunction, url)
          : Linking.openURL(url)
      }
    >
      {
        isFontAwesome ?
          <FontAwesome5
            name={iconType}
            size={25}
            color={this.props.theme.dark ? '#0000ff' : iconColor ? iconColor : '#52be80'}
          /> :
          isSvg ?
            iconType :
            <Ionicons
              name={
                Platform.OS === 'android' && !notPlatformSpecificIcon
                  ? `md-${iconType}`
                  : Platform.OS === 'ios' && !notPlatformSpecificIcon
                    ? `ios-${iconType}`
                    : iconType
              }
              size={25}
              color={this.props.theme.dark ? '#0000ff' : iconColor ? iconColor : '#52be80'}
            />
      }
    </TouchableOpacity>
  );

  renderDetailsInRow = () => (
    <View
      style={[
        this.props.trophy
          ? ScreenStyles.styleDetailsViewTrophy
          : ScreenStyles.styleDetailsView,
        this.props.marginTop && {marginTop: this.props.marginTop},
        this.props.backgroundColor && {
          backgroundColor: this.props.backgroundColor,
        },
        this.props.theme.dark && {
          backgroundColor: '#cdcdcd',
          borderColor: '#cdcdcd',
        },
      ]}
    >
      {this.props.itemDetailsArray.map((item, index) => (
        <TouchableOpacity
          style={[
            ScreenStyles.styleEachDetailItemView,
            !this.props.secondaryView &&
              index === this.props.itemDetailsArray.length - 1 && {
                borderBottomWidth: 0,
              },
            item.borderBottomWidth && {
              borderBottomWidth: item.borderBottomWidth,
            },
            item.paddingVertical && {paddingVertical: item.paddingVertical},
            // item.hasIconAtRightSide && { alignItems: "center" },
            item.trophy && {alignItems: 'flex-start', paddingTop: 10},
            item.paddingTop && {paddingTop: item.paddingTop},
            this.props.theme.dark && {borderColor: '#fff'},
          ]}
          activeOpacity={0.7}
          onPress={() =>
            item.isModal
              ? this.closeModalAndOpenLink(item.modalCloseFunction, item.url)
              : Linking.openURL(item.url)
          }
          key={index}
        >
          <Text
            selectable
            selectionColor={
              this.props.theme.dark
                ? '#ececec'
                : this.props.selectionColor
                ? this.props.selectionColor
                : '#fafafa'
            }
            style={[
              ScreenStyles.styleYearLeftText,
              item.topicHeaderWidth && {width: item.topicHeaderWidth},
              item.headerColor && {color: item.headerColor},
              this.props.trophy && {fontSize: 12.5},
              item.fontSize && {fontSize: item.fontSize},
              this.props.theme.dark && {
                color: item.headingComment
                  ? '#0000ff'
                  : item.headerColor
                  ? item.headerColor
                  : 'purple',
              },
            ]}
          >
            {item.topicHeader}
          </Text>

          {!item.newStyle ? (
            <Text
              selectable
              selectionColor={
                this.props.theme.dark
                  ? '#ececec'
                  : this.props.selectionColor
                  ? this.props.selectionColor
                  : '#fafafa'
              }
              style={[
                ScreenStyles.styleDescRightText,
                item.descWidth && {width: item.descWidth},
                this.props.trophy && {fontSize: 12.5},
                item.hasIconAtRightSide && {fontSize: 12.5, lineHeight: 20},
                item.trophy && {fontSize: 12.1, lineHeight: 15},
                item.fontSize && {fontSize: item.fontSize},
                item.lineHeight && {lineHeight: item.lineHeight},
                item.bodyColor && {color: item.bodyColor},
                this.props.theme.dark && {
                  color: item.headingComment ? '#0000ff' : '#008000',
                },
              ]}
            >
              {item.desc}
            </Text>
          ) : (
            item.newComponent
          )}

          {item.hasIconAtRightSide &&
            this.renderRightIconView(
              item.url,
              item.iconType,
              item.rightIconWidth,
              item.isModal,
              item.modalCloseFunction,
              item.notPlatformSpecificIcon,
              item.iconColor,
              item.isSvg,
              item.isFontAwesome
            )}
        </TouchableOpacity>
      ))}
      {this.renderSecondaryView()}
    </View>
  );

  renderDetailsInTable = () => (
    <View
      style={[
        this.props.trophy
          ? ScreenStyles.styleDetailsViewTrophy
          : ScreenStyles.styleDetailsView,
        this.props.marginTop && {marginTop: this.props.marginTop},
        this.props.theme.dark && {
          backgroundColor: '#cdcdcd',
          borderColor: '#cdcdcd',
        },
      ]}
    >
      {this.props.itemDetailsArray.map((element, index) => (
        <View
          style={[
            ScreenStyles.styleEachDetailItemView,
            {paddingVertical: 0, borderBottomWidth: 0},
          ]}
          key={index}
        >
          {element.map((item, key) =>
            key == 0 ? (
              item.desc ? (
                <Text
                  selectable
                  selectionColor={
                    this.props.theme.dark
                      ? '#ececec'
                      : this.props.selectionColor
                      ? this.props.selectionColor
                      : '#fafafa'
                  }
                  style={[
                    ScreenStyles.styleEachDetailItemView,
                    ScreenStyles.styleTournamentTableColumnStyle,
                    item.additionalCellStyle && item.additionalCellStyle,
                    item.rowBold && ScreenStyles.fontWeightBold,
                    this.props.theme.dark && {
                      color: item.leftChildren ? '#008000' : 'purple',
                      borderColor: '#fff',
                    },
                  ]}
                >
                  {item.desc}
                </Text>
              ) : (
                <View
                  style={[
                    ScreenStyles.styleEachDetailItemView,
                    item.additionalCellStyle && item.additionalCellStyle,
                    this.props.theme.dark && {borderColor: '#fff'},
                  ]}
                />
              )
            ) : (
              <Text
                selectable
                selectionColor={
                  this.props.theme.dark
                    ? '#ececec'
                    : this.props.selectionColor
                    ? this.props.selectionColor
                    : '#fafafa'
                }
                style={[
                  ScreenStyles.styleEachDetailItemView,
                  ScreenStyles.styleTournamentTableColumnStyle,
                  item.additionalCellStyle && item.additionalCellStyle,
                  this.props.theme.dark && {
                    color: index === 0 ? 'purple' : '#008000',
                    borderColor: '#fff',
                  },
                ]}
              >
                {item.desc}
              </Text>
            ),
          )}
        </View>
      ))}
      {this.renderSecondaryView()}
    </View>
  );

  render = () =>
    this.props.isTable
      ? this.renderDetailsInTable()
      : this.renderDetailsInRow();
}

export default props => {
  const {colors} = useTheme();
  return <ItemDetailsComponent {...props} theme={colors} />;
};
