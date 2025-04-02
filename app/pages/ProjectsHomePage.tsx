import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import Tile from '@/components/Tile';
import { fetchProjects } from '@/backend/projectService';
import { Project } from '@/models/responseModels/Project';
import { router } from 'expo-router';
import { bottomFullWidthPlacement, fullPageContainer } from '@/app/styles/common';
import { isAccessTokenValid } from '@/localStorage/accessToken';

export default function ProjectsViewHomePage() {
    // Go to SignInPage if user is not signed in
    useEffect(() => {
        isAccessTokenValid().then((isValid) => {
            if (!isValid) {
                router.replace('/sign-in');
            }
        });
    }, []);

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
            <ButtonType1 displayText="Create Project" style={styles.createProjectButton} onPress={() => {
                router.push('/pages/CreateProject');
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    projectsViewHomePageContainer: {
        ...fullPageContainer,
    },
    createProjectButton: {
        ...bottomFullWidthPlacement,
        height: 51,
    }
});