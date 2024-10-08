function LoginPage() {
    return (
        <div>
            <form>
                <input required type="text" name="email" placeholder="Email" /><br />
                <input required type="password" name="password" placeholder="Password" /><br />
                <button type="submit">Login</button>
            </form>
        </div >
    )
}

export default LoginPage;
