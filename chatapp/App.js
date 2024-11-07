import React, { useState } from 'react';
import './App.css';

function App() {
  const [groups, setGroups] = useState({}); // Store groups and their messages/members
  const [currentGroup, setCurrentGroup] = useState(null); // Store the currently selected group
  const [newGroupName, setNewGroupName] = useState(""); // For creating a new group
  const [newMessage, setNewMessage] = useState(""); // For sending a new message
  const [newMember, setNewMember] = useState(""); // For adding new members to a group

  const createGroup = () => {
    if (newGroupName && !groups[newGroupName]) {
      setGroups({
        ...groups,
        [newGroupName]: { messages: [], members: [] },
      });
      setNewGroupName(""); // Clear input
    }
  };

  const selectGroup = (groupName) => {
    setCurrentGroup(groupName);
  };

  const sendMessage = () => {
    if (newMessage && currentGroup) {
      setGroups({
        ...groups,
        [currentGroup]: {
          ...groups[currentGroup],
          messages: [...groups[currentGroup].messages, newMessage],
        },
      });
      setNewMessage(""); // Clear input
    }
  };

  const addMember = () => {
    if (newMember && currentGroup && !groups[currentGroup].members.includes(newMember)) {
      setGroups({
        ...groups,
        [currentGroup]: {
          ...groups[currentGroup],
          members: [...groups[currentGroup].members, newMember],
        },
      });
      setNewMember(""); // Clear input
    }
  };

  return (
    <div id="app">
      <div className="sidebar">
        <h2>Groups</h2>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter group name"
        />
        <button onClick={createGroup}>Create Group</button>
        <div id="groups">
          {Object.keys(groups).map((group) => (
            <div key={group} onClick={() => selectGroup(group)}>
              {group}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-section">
        <h2 id="group-title">{currentGroup ? `Group: ${currentGroup}` : "Select a Group"}</h2>
        {currentGroup && (
          <>
            <div id="chat-window">
              {groups[currentGroup].messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
            <div id="members">
              <h3>Members</h3>
              {groups[currentGroup].members.length > 0 ? (
                groups[currentGroup].members.map((member, index) => (
                  <div key={index} className="member-item">
                    {member}
                  </div>
                ))
              ) : (
                <div>No members</div>
              )}
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add member"
              />
              <button onClick={addMember}>Add Member</button>
            </div>
            <div className="message-input-section">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
