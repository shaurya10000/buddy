import * as Notifications from 'expo-notifications';

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const scheduleNotification = async (identifier: string, title: string, description: string) => {
    try {
        await Notifications.scheduleNotificationAsync({
            identifier: identifier,
            content: {
                title: title,
                body: description,
            },
            // trigger: { seconds: 5 }, // Fires in 5 seconds
            trigger: {
                hour: 19,
                minute: 40,
                repeats: true
            }
        });
        console.log("Scheduled notification");
    } catch (t: unknown) {
        console.log("Unknown error occurred: ", t);
    }
};

export {
    scheduleNotification,
}