import {OAuth} from 'oauthio-web';
import axios from 'axios';



export const login = () => {
    console.log('i get here')
    
    OAuth.initialize('Yq_ObrXeRonGLhBwvd3nXD2oFlA');
    console.log('i get here how')

        OAuth.popup('linkedin2').done(function(result) {
        console.log('linkedin', result)
            axios
                .post('https://linkedinextension.herokuapp.com/api/users/user', {
                    result
                })
        }).fail(function(err) {
            console.log(err)
        })

}

export const loginInfo = (firstName, lastName, userID) => {
    console.log('i am here')
    localStorage.setItem('firstName', firstName)
    localStorage.setItem('lastName', lastName)
    localStorage.setItem('userId', userID)
}