import React from 'react'

export default function FriendChallenge({
  friendName,
  setFriendName,
  friendInput,
  setFriendInput,
  friendConsumedMl,
  updateFriend,
}) {
  return (
    <div className="friend-panel-inner">
      <h3>Friend Challenge</h3>
      <div className="friend-form-col">
        <label>
          Friend name
          <input value={friendName} onChange={(e) => setFriendName(e.target.value)} />
        </label>
        <label>
          Friend consumed
          <input type="number" value={friendInput} onChange={(e) => setFriendInput(Number(e.target.value))} />
        </label>
        <div className="friend-actions-col">
          <button onClick={() => { updateFriend(friendInput); }}>Update</button>
          <button onClick={() => { setFriendName(''); setFriendInput(0); }} className="ghost">Clear</button>
        </div>
      </div>
      <div className="friend-stats">
        <div>Current friend: <strong>{friendName || '—'}</strong></div>
        <div>Consumed (ml): <strong>{friendConsumedMl}</strong></div>
      </div>
    </div>
  )
}
