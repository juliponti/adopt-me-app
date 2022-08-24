import { useState, useEffect } from "react";

const localCache = {}; // it shoul be used localStoage for this

function useBreedList(animal) {
  const [breedlist, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `https://api.petfinder.com/v2/types/${animal}/breeds`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      const json = await res.json();

      localCache[animal] = json.breeds || [];

      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedlist, status];
}

export default useBreedList;
