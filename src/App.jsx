import { useState } from 'react'
import './App.css'
import RoomList from "./components/RoomList";

function App() {
    return (
        <div>
            <h1>Hotel Rooms</h1>
            <RoomList />
        </div>
    );
}

export default App