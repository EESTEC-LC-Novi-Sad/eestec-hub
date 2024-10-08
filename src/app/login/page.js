function LoginPage() {
    return (
        <div>
            <form>
                <input required type="text" placeholder="Username or Email" /><br />
                <input required type="password" placeholder="Password" /><br />
                <button type="submit" value="Login" />
            </form>
        </div >
    )
}

export default LoginPage;
