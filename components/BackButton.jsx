import React from 'react';
import {Alert} from 'react-native';

import {Button, Icon} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const nav = useNavigation();
  const CloseIcon = (props) => <Icon {...props} name="arrow-back-outline" />;
  return (
    <Button
      appearance="ghost"
      size="large"
      status="danger"
      accessoryLeft={CloseIcon}
      onPress={() => {
        Alert.alert(
          'Discard changes?',
          'Any unsaved changes will be discarded. Are you sure you want to exit?',
          [
            {
              text: 'Exit',
              onPress: () => {
                nav.goBack();
              },
              style: 'destructive',
            },
            {
              text: 'Keep Editing',
              style: 'confirm',
            },
          ],
        );
      }}
    />
  );
}
