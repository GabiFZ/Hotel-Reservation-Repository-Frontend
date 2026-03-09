import { useState } from 'react'
import './App.css'
import RoomList from "./components/RoomList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

function App() {
    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">🏨 Hotel Rooms Management</h1>
            <RoomList />
        </Container>
    );
}

export default App;