// Alert component

import { archiveProjectHandler } from '@/handler/archiveProject';
import { Dispatch } from 'redux';
import { Alert, Button, View } from 'react-native';
import { Platform } from 'react-native';
import React from 'react';
// import { Dialog } from 'react-native-elements';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


interface ArchiveProps {
    projectId: string;
    dispatch: Dispatch;
}

export default function AlertComponent({ projectId, dispatch }: ArchiveProps) {
    if (Platform.OS === 'web') {
        const result = window.confirm(`Are you sure you want to archive project - ${projectId}?`);
        if (result) {
            archiveProjectHandler(projectId, dispatch);
        }
    } else {
        return Alert.alert('Archive Project', `Are you sure you want to archive project - ${projectId}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Archive', onPress: () => archiveProjectHandler(projectId, dispatch) },
        ]);
    }
};