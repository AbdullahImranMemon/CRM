import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { database } from "../config/firebaseconfig";
import "./Dashboard.css";
import { NewJobEntry } from "./NewJobEntry";

export const Dashboard = () => {
    const jobsCollection = collection(database, "Jobs");
    const subbiesCollection = collection(database, "Subcontractor");

    const [metrics, setMetrics] = useState({
        buildersCount: 0,
        jobsQuotes: 0,
        totalValue: 0,
        tradesCount: 0,
        subbiesCount: 0,
        winRate: 0,
    });

    const [showPopup, setShowPopup] = useState(false);

    const fetchMetrics = async () => {
        try {
            const jobsSnapshot = await getDocs(jobsCollection);
            const subbiesSnapshot = await getDocs(subbiesCollection);

            const jobsCount = jobsSnapshot.docs.length;
            const totalJobValue = jobsSnapshot.docs.reduce(
                (acc, doc) => acc + (doc.data().jobValue || 0),
                0
            );
            const subbiesCount = subbiesSnapshot.docs.length;

            setMetrics({
                buildersCount: jobsCount,
                jobsQuotes: jobsCount,
                totalValue: totalJobValue,
                tradesCount: subbiesCount,
                subbiesCount,
                winRate: jobsCount > 0 ? 70 : 0,
            });
        } catch (error) {
            console.error("Error fetching metrics:", error);
        }
    };

    const addNewJob = async (newJobData) => {
        try {
            await addDoc(jobsCollection, {
                ...newJobData,
                jobValue: parseFloat(newJobData.jobValue),
            });
            alert("New Job Entry Added!");
            setShowPopup(false);
            fetchMetrics();
        } catch (error) {
            console.error("Error adding new job:", error);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);

    return (
        <div>
            <h1 className="p-10 bg-blue-400">Dashboard</h1>
            <div className="header-button">
                <button onClick={() => setShowPopup(true)}>Add New Job Entry</button>
            </div>
            <div className="card-grid">
                {[
                    { label: "Number of Builders", value: metrics.buildersCount },
                    { label: "Jobs Quotes", value: metrics.jobsQuotes },
                    { label: "Total Quoted Value", value: `$${metrics.totalValue}` },
                    { label: "Number of Trades", value: metrics.tradesCount },
                    { label: "Win Rate Percentage", value: `${metrics.winRate}%` },
                    { label: "Number of Subbies", value: metrics.subbiesCount },
                ].map(({ label, value }, index) => (
                    <div className="card" key={index}>
                        <h2>{label}</h2>
                        <p>{value}</p>
                    </div>
                ))}
            </div>

            {showPopup && (
                <NewJobEntry
                    onClose={() => setShowPopup(false)}
                    onSave={addNewJob}
                />
            )}
        </div>
    );
};
