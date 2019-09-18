import React from 'react';
import {useState} from 'react';
import Axios from "axios";

const CardList = ({profiles}) =>
    (
        <div>
            {profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
    );

const Card = (profile) => {
    return (
        <div className="github-profile">
            <img src={profile.avatar_url}/>
            <div className="info">
                <div className="name">{profile.name}</div>
                <div className="company">{profile.company}</div>
            </div>
        </div>
    )
}

const Form = ({onSubmit}) =>{
    const [userName, setUserName] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const resp = await Axios.get(`https://api.github.com/users/${userName}`);
        await onSubmit(resp.data);
        setUserName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                   value = {userName}
                   onChange={event => setUserName(event.target.value)}
                   placeholder="GitHub username"
                   required/>
            <button>Add card</button>
        </form>
    ); 
}

const App = ({title}) => {

    const [profiles, setProfiles] = useState([]);
    
    const addNewProfile = (profile) =>{
        setProfiles([...profiles, profile]);
    };

    return (
        <div>
            <div className="header">{title}</div>
            <Form onSubmit = {addNewProfile}/>
            <CardList profiles = {profiles}/>
        </div>
    );
}

export default App;
