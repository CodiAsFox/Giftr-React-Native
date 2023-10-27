import React, {useContext} from 'react';

import {Alert, StyleSheet} from 'react-native';
import {DataContext} from '../../Utils/DataProvider';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
  Icon,
  Text,
  Button,
  Avatar,
  ListItem,
  List,
  useTheme,
} from '@ui-kitten/components';

import {Userpic} from 'react-native-userpic';

function PersonCard({person, navigation}) {
  const RightIcon = (props) => <Icon {...props} name="chevron-right-outline" />;
  const uiTheme = useTheme();

  return (
    <ListItem
      title={(props) => {
        return (
          <Text {...props} style={[props.style, styles.name]}>
            {person.name}
          </Text>
        );
      }}
      onPress={() => {
        navigation.navigate('IdeaScreen', {personId: person.id});
      }}
      style={{flex: 1}}
      size="large"
      description={(props) => (
        <Text {...props} style={[props.style, styles.dobText]}>
          <Icon
            name="calendar-outline"
            fill={uiTheme['color-info-200']}
            style={styles.dob}
          />
          {person.dob}
        </Text>
      )}
      accessoryLeft={() => {
        const userPicture = person.photoUri ? person.photoUri : '/';

        return (
          <Avatar
            size="large"
            style={styles.itemImage}
            ImageComponent={() => (
              <Userpic
                source={{uri: userPicture}}
                colorize={true}
                name={person.name}
              />
            )}
          />
        );
      }}
      accessoryRight={RightIcon}
    />
  );
}

function PersonList({sortedPeople, navigation}) {
  const Trash = (props) => <Icon {...props} name="trash-2-outline" />;
  const {deletePerson} = useContext(DataContext);
  const handleDelete = (personId, name) => {
    Alert.alert(
      'Delete Person',
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deletePerson(personId);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <List
      style={{flex: 1}}
      data={sortedPeople}
      keyExtractor={(item) => item.id}
      size="large"
      renderItem={({item}) => {
        return (
          <Swipeable
            style={{flex: 1}}
            renderRightActions={() => (
              <Button
                onPress={() => {
                  handleDelete(item.id, item.name);
                }}
                status="danger"
                accessoryLeft={Trash}
              />
            )}
          >
            <PersonCard person={item} navigation={navigation} />
          </Swipeable>
        );
      }}
    />
  );
}

export default PersonList;

const styles = StyleSheet.create({
  logo: {
    marginHorizontal: 16,
  },
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 21,
  },
  dob: {
    width: 15,
    height: 15,
    top: 2,
    marginRight: 2,
  },
  dobText: {
    marginTop: 5,
    fontSize: 13,
  },
});
