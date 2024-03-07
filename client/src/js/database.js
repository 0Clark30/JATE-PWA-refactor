import { openDB } from "idb";

const initdb = async () => {
  await openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });
};

export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ value: content });
    await tx.complete;
    console.log("Data saved to the database");
  } catch (error) {
    console.error("Error putting data into database:", error);
  }
};

export const getDb = async () => {
  try {
    console.log("GET from the database");
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log("All data retrieved from the database", result);
    return result;
  } catch (error) {
    console.error("Error getting data from database:", error);
    return null;
  }
};

initdb();
