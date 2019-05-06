import store from './store';
import {OAuth} from 'oauthio-web'
import '../popup/Login'

OAuth.initialize('Yq_ObrXeRonGLhBwvd3nXD2oFlA');
    
// Popup facebook and ask for authorization
window.onload = function() {
    document.getElementById('connect').addEventListener('click', function() {

        OAuth.popup('linkedin2').done(function(result) {
            console.log('linkedin:', result);
            axios
            .post('https://linkedinextension.herokuapp.com/api/users/user', {
                result
            })
            .then(response => {
                console.log(response)
            })
        });
    })

}