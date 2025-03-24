import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import Tile from '@/components/Tile';
import { fetchProjects } from '@/backend/projectService'; // Import the function
import { Project } from '@/models/project';

export default function ProjectsViewHomePage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects(); // Use the imported function
                setProjects(data);
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        };

        loadProjects();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <View style={styles.projectsViewHomePageContainer}>
            {projects.map((project, index) => (
                <Tile key={index} displayText={project.name} color={project.color} />
            ))}
            <ButtonType1 displayText="Create Project" style={styles.createProjectButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    projectsViewHomePageContainer: {
        flex: 1,        
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 1)",
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
        // padding: 10,
    },
    createProjectButton: {
        // Below three lines are used to position the button at the bottom of the container
        //--------------------------------
        marginTop: "auto",
        bottom: 0,
        left: 0,
        //--------------------------------
        // End of positioning the button at the bottom of the container
    }
});