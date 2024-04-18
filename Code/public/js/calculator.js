const CalcApp = () => {
    const [age, setAge] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const [humanAge, setHumanAge] = React.useState(null)
    const [reactUser, setReactUser] = React.useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const body = JSON.stringify({
            age: parseInt(age),
            react_user: reactUser
        })

        const response = await fetch("/api/age-calc", {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json()

        setHumanAge(json.human_age)

        setLoading(false)
    }

    return <div>
        <h1>Frontend Developers, Find Your Age in Human Years!</h1>
        {
            humanAge && <p class="notice">
                Your human age is {humanAge} years old! {humanAge > 90 ? '💀' : '🧓'}
                <br/>
                Ever think about becoming a backend developer?
            </p>
        }
        <form onSubmit={onSubmit}>
            <p>
                <label>Your web developer age</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} />
            </p>
            <p>
                <label>Are you a victim of React?</label>
                <input type="checkbox" value={reactUser} onChange={e => setReactUser(e.target.checked)} />
            </p>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Calculate!'} 
            </button>
        </form>
    </div>
}


ReactDOM.render(
    <CalcApp />,
    document.getElementById("app")
);