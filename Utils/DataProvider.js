import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [ideas, setIdeas] = useState([]);

  const loadInitialData = async () => {
    try {
      const storedPeople = await AsyncStorage.getItem("people");
      const storedIdeas = await AsyncStorage.getItem("ideas");
      if (storedPeople) setPeople(JSON.parse(storedPeople));
      if (storedIdeas) setIdeas(JSON.parse(storedIdeas));
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

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

  const addPerson = async (person) => {
    const newPerson = { ...person, id: uuidv4(), ideas: [] };
    const newPeople = [...people, newPerson];
    setPeople(newPeople);
    await AsyncStorage.setItem("people", JSON.stringify(newPeople));
  };

  const addIdea = async (personId, idea) => {
    const newIdea = { ...idea, id: uuidv4() };
    const newPeople = people.map((person) =>
      person.id === personId
        ? { ...person, ideas: [...person.ideas, newIdea] }
        : person
    );
    setPeople(newPeople);
    await AsyncStorage.setItem("people", JSON.stringify(newPeople));
  };

  const deleteIdea = async (personId, ideaId) => {
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
    await AsyncStorage.setItem("people", JSON.stringify(newPeople));

    if (imageUriToDelete) {
      try {
        await FileSystem.deleteAsync(imageUriToDelete, { idempotent: true });
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
  };

  const getPerson = (personId) => {
    return people.find((person) => person.id === personId);
  };

  const getIdeas = (personId) => {
    const person = people.find((p) => p.id === personId);
    return person ? person.ideas : [];
  };

  const deletePerson = async (personId) => {
    const personToDelete = people.find((person) => person.id === personId);
    const newPeople = people.filter((person) => person.id !== personId);
    setPeople(newPeople);

    try {
      await AsyncStorage.setItem("people", JSON.stringify(newPeople));

      if (personToDelete) {
        for (const idea of personToDelete.ideas) {
          if (idea.img) {
            try {
              await FileSystem.deleteAsync(idea.img, { idempotent: true });
            } catch (error) {
              console.error("Failed to delete image:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to delete person:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
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

export { DataProvider, DataContext };