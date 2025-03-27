export const handleCreateProject = (projectName: string, projectDescription: string) => {
    if (!projectName || !projectDescription) {
        alert('Please fill in all fields');
        return;
    }
    // Logic to create a project
    alert(`Project "${projectName}" created!`);
};

export const handleCancel = () => {
    // Logic to handle cancel action
    alert('Project creation canceled');
}; 