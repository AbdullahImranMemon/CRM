import { onCall } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v1";
// import { getDatabase } from "firebase-admin/database";
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp(); // Initialize the Firebase Admin SDK
const db = getFirestore();

export const handleUserCreation = functions.auth.user().onCreate(async (user) => {
    try {
        const { uid, email, displayName, photoURL } = user;
        logger.info(`New user created: ${email}`);

        await db.collection("users").doc(uid).set({
            email,
            displayName,
            photoURL,
            // createdAt: admin.firestore.FieldValue.serverTimestamp(),
            role: "user", // Default role
            id: uid
        });

        logger.info(`User data saved for UID: ${uid}`);
    } catch (error) {
        logger.error("Error saving user data", error);
    }
});