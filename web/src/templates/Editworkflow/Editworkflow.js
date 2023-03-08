import React, { useState } from 'react';
import './Editworkflow.css';

function Editworkflow() {
    const id = window.location.href.split("/")[4];
    console.log(id);
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedReaction, setSelectedReaction] = useState("");
    const [actionParams, setActionParams] = useState([]);
    const [reactionParams, setReactionParams] = useState([]);

    const actionOptions = [{name:"createWebhook",paramType:["owner","repo","events"]},{name:"deleteWebhook",paramType:["owner","repo","id"]},{name:"getWebhooks",paramType:["owner","repo"]},{name:"getCommits",paramType:["owner","repo"]},{name:"getStarredOfRepo",paramType:["owner","repo"]},{name:"getARepo",paramType:["owner","repo"]},{name:"getBranches",paramType:["owner","repo"]},{name:"getRepos",paramType:["owner"]},{name:"getFollowers",paramType:["owner"]},{name:"getFollowing",paramType:["owner"]},{name:"openDoor",paramType:["apikey","doorname"]},{name:"getWeather",paramType:["city"]}];
    const reactionOptions = [{name:"discordSendMessage",paramType:["message"]},{name:"SendEmbed",paramType:["title","color","description"]},{name:"sendMail",paramType:["to","subject","text"]}, {name:"openDoor",paramType:["apikey","doorname"]}];

    const handleActionChange = (event) => {
        const selectedAction = event.target.value;
        setSelectedAction(selectedAction);
        setActionParams(actionOptions.find(option => option.name === selectedAction).paramType);
    };

    const handleReactionChange = (event) => {
        const selectedReaction = event.target.value;
        setSelectedReaction(selectedReaction);
        setReactionParams(reactionOptions.find(option => option.name === selectedReaction).paramType);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const action = selectedAction;
        const reaction = selectedReaction;
        const ractionParams = actionParams.map((param, index) => document.querySelectorAll(".ActionParams input")[index].value).join(",");
        const rreactionParams = reactionParams.map((param, index) => document.querySelectorAll(".ReactionParams input")[index].value).join(",");

        const response = fetch(`/api/update/${id}/${action}/${ractionParams}/${reaction}/${rreactionParams}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => { console.log(data);})
        .then(() => {window.location.reload();})
        .then(() => {window.location.href = '/workflows';})
        .catch((error) => {
            console.error('Error:', error);
        });
    };

  return (
    <div className="Editworkflow">
    <div className="Actions">
        <label htmlFor="actions">Actions:</label>
        <select name="actions" id="actions" onChange={handleActionChange} value={selectedAction}>
        <option value="">Choose an action...</option>
        {actionOptions.map((option) => (
            <option key={option.name} value={option.name}>{option.name}</option>
        ))}
        </select>
        {actionParams.length > 0 && (
        <div className="ActionParams">
            {actionParams.map((param, index) => (
            <input key={index} type="text" placeholder={param} />
            ))}
        </div>
        )}
    </div>
    <div className="Reactions">
        <label htmlFor="reactions">Reactions:</label>
        <select name="reactions" id="reactions" onChange={handleReactionChange} value={selectedReaction}>
        <option value="">Choose a reaction...</option>
        {reactionOptions.map((option) => (
            <option key={option.name} value={option.name}>{option.name}</option>
        ))}
        </select>
        {reactionParams.length > 0 && (
        <div className="ReactionParams">
            {reactionParams.map((param, index) => (
            <input key={index} type="text" placeholder={param} />
            ))}
        </div>
        )}
    </div>
    <button className='button' onClick={handleSubmit}>Submit</button>
    </div>
    );
}

export default Editworkflow;