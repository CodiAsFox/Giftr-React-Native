import React, {useContext} from 'react';

import {Alert, StyleSheet} from 'react-native';
import {DataContext} from '../../Utils/DataProvider';

import {
  Icon,
  Text,
  Button,
  Avatar,
  ListItem,
  List,
} from '@ui-kitten/components';

function IdeaCard({idea, handleImagePress, person, setUpdate}) {
  const RightIcon = (props) => <Icon {...props} name="chevron-right-outline" />;
  const Trash = (props) => <Icon {...props} name="trash-2-outline" />;
  const {deleteIdea} = useContext(DataContext);

  const handleDelete = (personId, ideaId) => {
    Alert.alert(
      'Delete Idea',
      `Are you sure you want to delete ${idea.giftIdea}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteIdea(personId, ideaId);
            setUpdate(true);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <ListItem
      title={(props) => {
        return (
          <Text {...props} style={[props.style, styles.name]}>
            {idea.giftIdea}
          </Text>
        );
      }}
      style={{flex: 1}}
      size="large"
      onPress={() => handleImagePress(idea.img.uri, idea.giftIdea)}
      accessoryLeft={() => {
        return (
          <Avatar
            size="giant"
            shape="square"
            style={styles.itemImage}
            source={{uri: idea.img.uri}}
          />
        );
      }}
      accessoryRight={() => (
        <Button
          onPress={() => {
            handleDelete(person.id, idea.id);
          }}
          size="small"
          status="danger"
          appearance="ghost"
          accessoryLeft={Trash}
        />
      )}
    />
  );
}

function IdeaList({ideas, handleImagePress, person, setUpdate}) {
  return (
    <List
      style={{flex: 1}}
      data={ideas}
      keyExtractor={(item) => item.id}
      size="large"
      renderItem={({item}) => {
        return (
          <IdeaCard
            idea={item}
            person={person}
            handleImagePress={handleImagePress}
            setUpdate={setUpdate}
          />
        );
      }}
    />
  );
}

export default IdeaList;

const styles = StyleSheet.create({
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 21,
  },
});
