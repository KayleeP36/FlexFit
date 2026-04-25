import React, { useState, useEffect } from 'react'

export default function FriendChallenge({
  friendName,
  setFriendName,
  friendInput,
  setFriendInput,
  friendConsumedMl,
  updateFriend,
  // challenge props
  challenge,
  challengeLink,
  createChallenge,
  verifyPassword,
  passwordInput,
  setPasswordInput,
  userRole,
  updateChallenge,
}) {
  const [localName, setLocalName] = useState('')
  const [localConsumed, setLocalConsumed] = useState(0)

  useEffect(() => {
    if (challenge && userRole) {
      const p = userRole === 'A' ? challenge.playerA : challenge.playerB
      setLocalName(p?.name || '')
      setLocalConsumed(p?.consumedMl || 0)
    }
  }, [challenge, userRole])

  const handleVerify = () => {
    const ok = verifyPassword(passwordInput)
    if (!ok) alert('Invalid password')
  }

  const handleUpdate = () => {
    if (!userRole) return alert('Enter your password to join this challenge')
    const consumed = Number(localConsumed) || 0
    updateChallenge(userRole, localName, consumed)
    alert('Updated — copy and share the link so your friend sees the change')
  }

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Link copied')
    } catch (e) {
      console.warn('copy fail', e)
    }
  }

  return (
    <div className="friend-panel-inner">
      <h3>Friend Challenge</h3>

      {!challenge && (
        <div className="friend-form-col">
          <p>Create a shareable challenge link for a friend. Each friend gets a password to update only their own stats.</p>
          <div className="friend-actions-col">
            <button onClick={createChallenge}>Create Challenge Link</button>
          </div>
        </div>
      )}

      {challenge && !userRole && (
        <div className="friend-form-col">
          <p>Challenge ready — enter your password to join, or open the link your friend sent.</p>
          <label>
            Password
            <input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          </label>
          <div className="friend-actions-col">
            <button onClick={handleVerify}>Enter</button>
            <button onClick={() => copy(challengeLink)}>Copy Challenge Link</button>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text)' }}>
            If you were invited by Player A, open the link they sent; it will auto-assign your role and password.
          </div>
        </div>
      )}

      {challenge && userRole && (
        <div className="friend-form-col">
          <div style={{ marginBottom: 8 }}>You joined as <strong>{userRole === 'A' ? 'Player A' : 'Player B'}</strong></div>
          {userRole === 'A' && (
            <div style={{ marginBottom: 8, fontSize: 13 }}>
              Your password: <strong style={{ color: 'var(--accent)' }}>{challenge.passA}</strong>
            </div>
          )}
          <label>
            Your name
            <input value={localName} onChange={(e) => setLocalName(e.target.value)} />
          </label>
          <label>
            Your consumed (ml)
            <input type="number" value={localConsumed} onChange={(e) => setLocalConsumed(Number(e.target.value))} />
          </label>
          <div className="friend-actions-col">
            <button onClick={handleUpdate}>Update My Stats</button>
            {userRole === 'A' ? (
              <button onClick={() => copy(`${challengeLink}&join=B`)} className="ghost">Copy Link For Friend</button>
            ) : (
              <button onClick={() => copy(challengeLink)} className="ghost">Copy Link</button>
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            <div>Current other:</div>
            <div><strong>{userRole === 'A' ? challenge.playerB.name || '—' : challenge.playerA.name || '—'}</strong></div>
            <div>Consumed (ml): <strong>{userRole === 'A' ? challenge.playerB.consumedMl || 0 : challenge.playerA.consumedMl || 0}</strong></div>
          </div>
        </div>
      )}

      {!challenge && (
        <div className="friend-stats">
          <div>Current friend: <strong>{friendName || '—'}</strong></div>
          <div>Consumed (ml): <strong>{friendConsumedMl}</strong></div>
        </div>
      )}
    </div>
  )
}
