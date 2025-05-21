import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ButtonType1 } from '@/components/ButtonType1';
import Tile from '@/components/Tile';
import { fetchProjectsWithoutTasks } from '@/backend/projectService';
import { Project } from '@/models/responseModels/Project';
import { router } from 'expo-router';
import { bottomFullWidthPlacement, fullPageContainer } from '@/app/styles/common';
import { isAccessTokenValid } from '@/localStorage/accessToken';
import { projectHomeHandler } from '@/handler/projectHome';
import { useDispatch } from 'react-redux';

export default function ProjectsHome() {
    // Go to SignInPage if user is not signed in
    useEffect(() => {
        isAccessTokenValid().then((isValid) => {
            if (!isValid) {
                router.replace('/sign-in');
            }
        });
    }, []);

    const [projects, setProjects] = useState<Project[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjectsWithoutTasks(dispatch); // Use the imported function
                setProjects(data);
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        };

        loadProjects();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <View style={styles.projectsViewHomePageContainer}>
            <View style={styles.projectsContainer}>
                {projects.filter(project => project.status !== 'archived').map((project, index) => (
                    <Tile key={index} displayText={project.name} color={project.color} onPress={() => {
                        projectHomeHandler(project.id, dispatch);
                    }} />
                ))}
            </View>
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
    },
    projectsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'scroll',
    }
});