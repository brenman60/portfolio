import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    fetch("/portfolio/data/tags.json")
    .then(response => response.json())
    .then(jsonData => setTags(jsonData))
    .catch(error => console.error("Error loading JSON: ", error));
  }, []);

//   const filterSkillsByCategory = (category) =>
//     category ? skills.filter(skill => skill.category === category) : skills;

  const sortByLevel = (givenTags) => {
    if (!tags || !givenTags) return [];

    const tagArray = Object.values(givenTags);
    return tagArray.sort((a, b) => parseInt(b.level) - parseInt(a.level));
  };

  const sortByStarred = (givenTags) => {
    if (!tags || !givenTags) return [];

    const tagArray = Object.values(givenTags);
    return tagArray.sort((a, b) => {
      return b.starred === 'true' ? 1 : a.starred === 'true' ? -1 : 0;
    });
  };

  const getTagNames = (tagIds) => {
    if (!tags || !Array.isArray(tagIds)) return [];

    return tagIds.map(id => {
      const tag = tags[id];
      return tag ? tag.name : null;
    }).filter(name => name !== null);
  };

  const getTags = () => {
    if (!tags) return [];

    return tags;
  }

  const value = { tags, setTags, getTagNames, getTags, sortByLevel, sortByStarred };
  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export const useTags = () => {
    return useContext(TagsContext);
};
