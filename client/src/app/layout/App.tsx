import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then((response) => setActivities(response.data));
    }, []);

    return (
        <>
            <CssBaseline />
            <NavBar />
            <Typography variant='h3' sx={{ marginTop: 2, marginLeft: 2 }}>
                Reactivities
            </Typography>
            <Container maxWidth='xl' sx={{ marginTop: 3 }}>
                <List>
                    {activities.map((activity) => (
                        <ListItem key={activity.id}>
                            <ListItemText>{activity.title}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
}
