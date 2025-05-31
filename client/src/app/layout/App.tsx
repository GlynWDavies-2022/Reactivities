import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

export default function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then((response) => setActivities(response.data));
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find((activity) => activity.id === id));
    };

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    };

    return (
        <Box sx={{ bgcolor: '#EEEEEE' }}>
            <CssBaseline />
            <NavBar />
            <Typography variant='h3' sx={{ marginTop: 2, marginLeft: 2 }}>
                Reactivities
            </Typography>
            <Container maxWidth='xl' sx={{ marginTop: 3 }}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    selectedActivity={selectedActivity}
                />
            </Container>
        </Box>
    );
}
