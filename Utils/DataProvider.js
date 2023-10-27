import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const generateID = async () => {
  const currentTime = new Date().getTime().toString();
  const randomValue = Math.random().toString();
  const uniqueString = currentTime + randomValue;
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    uniqueString,
  );
  return hash;
};

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set data for key ${key}:`, error);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Failed to get data for key ${key}:`, error);
  }
};

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [ideas, setIdeas] = useState([]);

  const loadInitialData = async () => {
    try {
      const storedPeople = await AsyncStorage.getItem('people');
      const storedIdeas = await AsyncStorage.getItem('ideas');
      if (storedPeople) setPeople(JSON.parse(storedPeople));
      if (storedIdeas) setIdeas(JSON.parse(storedIdeas));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const setData = setData;
  const getData = getData;

  const addPerson = async (person) => {
    setIsLoading(true);
    const ID = await generateID();
    const newPerson = {...person, id: ID, ideas: []};
    const newPeople = [...people, newPerson];
    setPeople(newPeople);
    await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    setIsLoading(false);
  };

  const addIdea = async (personId, idea) => {
    setIsLoading(true);
    const ID = await generateID();
    const newIdea = {...idea, id: ID};
    const newPeople = people.map((person) =>
      person.id === personId
        ? {...person, ideas: [...person.ideas, newIdea]}
        : person,
    );
    setPeople(newPeople);
    await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    setIsLoading(false);
  };

  const deleteIdea = async (personId, ideaId) => {
    try {
      setIsLoading(true);
      let imageUriToDelete = null;

      const newPeople = people.map((person) => {
        if (person.id === personId) {
          const ideaToDelete = person.ideas.find((idea) => idea.id === ideaId);
          if (ideaToDelete && ideaToDelete.img) {
            imageUriToDelete = ideaToDelete.img;
          }
          return {
            ...person,
            ideas: person.ideas.filter((idea) => idea.id !== ideaId),
          };
        }
        return person;
      });
      setPeople(newPeople);
      await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    } catch (error) {
      console.error('Failed to delete idea:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePerson = async (personId) => {
    try {
      setIsLoading(true);
      const newPeople = people.filter((person) => person.id !== personId);
      setPeople(newPeople);
      await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    } catch (error) {
      console.error('Failed to delete person:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPerson = (personId) => {
    setIsLoading(false);
    return people.find((person) => person.id === personId);
  };

  const getIdeas = (personId) => {
    setIsLoading(false);
    const person = people.find((p) => p.id === personId);
    return person ? person.ideas : [];
  };

  return (
    <DataContext.Provider
      value={{
        isLoading,
        people,
        ideas,
        addPerson,
        deletePerson,
        addIdea,
        deleteIdea,
        getIdeas,
        getPerson,
        loadInitialData,
        setData,
        getData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export {DataProvider, DataContext, setData, getData};
