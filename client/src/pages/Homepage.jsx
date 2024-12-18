
import React from 'react';
import styles from './index.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className={styles.homepage}>
            <div class="row">
                <div class="column left"><p></p></div>
                <div class="column center">
                    <div id="loginLogo">
                        <img src="./images/SUNY_Brockport_Logo.png" alt="SUNY Brockport Logo" />
                    </div>
                    <hr />
                    <div class="loginContainer">
                        <h2>SUNY Brockport Course Registration</h2>
                        <h3>Sign In</h3>
                        <form id="loginForm" method="post" autocomplete="off">
                            <p>
                                <label for="username">Username:</label>
                                <br />
                                <input type="text" name="username" id="username" placeholder="username" />
                                <span id="usernameError"></span>
                            </p>
                            <p>
                                <label for="password">Password:</label>
                                <br />
                                <input type="password" name="password" id="password" size="16" maxlength="16" placeholder="password" />
                                <span id="passwordError"></span>
                            </p>
                            <p>
                                <input type="submit" value="&nbsp;&nbsp;Log In&nbsp;&nbsp;" id="loginSubmitButton" />
                            </p>
                        </form>
                        <p style="font-size: 12px;" ><a href="">Forgot Password</a></p>
                        <p id="status"></p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
                <div class="column right"><p></p></div>
            </div>
        </div>
    );
}
export default HomePage;
