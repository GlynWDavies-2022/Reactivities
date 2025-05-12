import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then((response) => setActivities(response.data));
    }, []);

    return (
        <>
            <CssBaseline />
            <NavBar />
            <Typography variant='h3'>Reactivities</Typography>
            <List>
                {activities.map((activity) => (
                    <ListItem key={activity.id}>
                        <ListItemText>{activity.title}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default App;
