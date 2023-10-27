import React, {useState} from 'react';

/***
 * Oh, Hi Steve, is a surprise seeing you here.
 *
 * Again I think I made something more complex than it should be.
 * But I am having so much fun with React Native. I hope it's ok.
 *
 * I had some crazy ideas that ededup eating alot of production time.
 * I removed them and kept the core functionality.
 *
 *
 * Tay.
 * ***/

import {StyleSheet} from 'react-native';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import {StatusBar} from 'expo-status-bar';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import AppNavigation from './Components/AppNavigation';
import {DataProvider} from './Utils/DataProvider';
import {ThemeContext} from './Utils/ThemeProvider';

export default App = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar style={theme == 'dark' ? 'inverted' : 'dark'} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <Layout style={styles.container}>
            <DataProvider>
              <AppNavigation />
            </DataProvider>
          </Layout>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
