import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase.js";  // Ensure correct import
import fs from "fs";

// Read merged JSON file
const data = JSON.parse(fs.readFileSync("./src/components/outfitters_data.json", "utf-8"));

// Function to upload products while avoiding duplicates
const uploadData = async () => {
  try {
    console.log("📤 Starting data upload...");

    const shopCollection = collection(db, "shopItems");

    // Function to check if product already exists
    const productExists = async (product_url) => {
      const q = query(shopCollection, where("product_url", "==", product_url));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    };

    // Upload Outfitters data
    for (const item of data.outfitters) {
      if (await productExists(item.product_url)) {
        console.log(`⚠️ Skipping duplicate: ${item.product_name}`);
        continue;
      }
      console.log(`✅ Uploading Outfitters item: ${item.product_name}`);
      await addDoc(shopCollection, { ...item, brand: "Outfitters" });
    }

    // Upload Breakout data
    for (const item of data.breakout) {
      if (await productExists(item.product_url)) {
        console.log(`⚠️ Skipping duplicate: ${item.product_name}`);
        continue;
      }
      console.log(`✅ Uploading Breakout item: ${item.product_name}`);
      await addDoc(shopCollection, { ...item, brand: "Breakout" });
    }

    console.log("🎉 All new data uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
};

// Run the upload function
uploadData();
