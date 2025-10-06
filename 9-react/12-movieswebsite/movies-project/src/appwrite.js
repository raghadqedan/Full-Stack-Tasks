import { Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = "trending";
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("68dd0a09001130a6d0e7");

const database = new Databases(client);

export async function updateSearchCount(searchTerm, movie) {
  console.log("update", searchTerm);
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", [movie.id]),
    ]);

    console.log("Response documents:", response.documents);
    if (response.documents.length > 0) {
      const doc = response.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchterm: searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTrending() {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(10),
      Query.orderDesc("count"),
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
  }
}

export { ID };
