export default function FriendChallenge({
  friendName,
  setFriendName,
  friendInput,
  setFriendInput,
  friendConsumedMl,
  updateFriend,
  challenge,
  challengeLink,
  createChallenge,
  verifyPassword,
  passwordInput,
  setPasswordInput,
  userRole,
  updateChallenge,
}) {
  const activePlayer = userRole === 'A' ? challenge?.playerA : challenge?.playerB

  return (
    <section className="hydration-challenge-panel">
      <h3>Friend Challenge</h3>
      <p className="hydration-panel-note">
        Track a friend locally or generate a challenge link with passwords for two players.
      </p>

      <div className="hydration-field-stack">
        <label>
          Friend name
          <input
            type="text"
            value={friendName}
            onChange={(event) => setFriendName(event.target.value)}
            placeholder="Training partner"
          />
        </label>
        <label>
          Friend water today (ml)
          <input
            type="number"
            value={friendInput}
            min={0}
            onChange={(event) => setFriendInput(Number(event.target.value))}
          />
        </label>
        <button type="button" onClick={() => updateFriend(friendInput)}>
          Save Friend Progress
        </button>
      </div>

      <div className="hydration-friend-summary">
        <strong>{friendName || 'Friend'}</strong>
        <span>{friendConsumedMl} ml logged</span>
      </div>

      <div className="hydration-divider" />

      {!challenge && (
        <button type="button" className="hydration-accent-btn" onClick={createChallenge}>
          Create Shareable Challenge
        </button>
      )}

      {challenge && (
        <div className="hydration-field-stack">
          <div className="hydration-challenge-card">
            <div>
              <strong>Challenge ID</strong>
              <span>{challenge.id}</span>
            </div>
            <div>
              <strong>Role</strong>
              <span>{userRole || 'Not joined'}</span>
            </div>
          </div>

          <label>
            Challenge password
            <input
              type="text"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder="Enter passA or passB"
            />
          </label>
          <button type="button" onClick={() => verifyPassword(passwordInput)}>
            Join Challenge
          </button>

          <label>
            Share link
            <input type="text" readOnly value={challengeLink} />
          </label>

          {userRole && (
            <>
              <label>
                {userRole === 'A' ? 'Player A name' : 'Player B name'}
                <input
                  type="text"
                  value={activePlayer?.name ?? ''}
                  onChange={(event) =>
                    updateChallenge(userRole, event.target.value, activePlayer?.consumedMl ?? 0)
                  }
                />
              </label>
              <label>
                {userRole === 'A' ? 'Player A water (ml)' : 'Player B water (ml)'}
                <input
                  type="number"
                  min={0}
                  value={activePlayer?.consumedMl ?? 0}
                  onChange={(event) =>
                    updateChallenge(userRole, activePlayer?.name ?? '', Number(event.target.value))
                  }
                />
              </label>
            </>
          )}

          <div className="hydration-challenge-vs">
            <div>
              <strong>{challenge.playerA.name || 'Player A'}</strong>
              <span>{challenge.playerA.consumedMl} ml</span>
            </div>
            <div>
              <strong>{challenge.playerB.name || 'Player B'}</strong>
              <span>{challenge.playerB.consumedMl} ml</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}