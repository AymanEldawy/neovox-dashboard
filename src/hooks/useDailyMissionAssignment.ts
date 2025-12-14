import { useEffect } from 'react';
import { addMissionsForUser } from '@/services/userMissionsService';

const LAST_MISSION_CHECK_KEY = 'lastMissionCheckDate';

/**
 * Hook to automatically add missions for active subscriptions
 * Checks once per day and calls the backend to add missions
 */
export const useDailyMissionAssignment = () => {
    useEffect(() => {
        const checkAndAddMissions = async () => {
            try {
                const today = new Date().toDateString();
                const lastCheck = localStorage.getItem(LAST_MISSION_CHECK_KEY);

                // Only check once per day
                if (lastCheck === today) {
                    return;
                }

                // Call the backend to add missions for all active subscriptions
                await addMissionsForUser();

                // Update the last check date
                localStorage.setItem(LAST_MISSION_CHECK_KEY, today);
            } catch (error) {
                console.error('Failed to add daily missions:', error);
            }
        };

        checkAndAddMissions();
    }, []);
};
