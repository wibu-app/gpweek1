let baseUrl = 'http://localhost:3000'

function animeTrending(){
    $.ajax({
        method: "GET",
        url: `${baseUrl}/animes`,
        // headers:{
        //     token : localStorage.getItem('token')
        // }
    })
    .done(resp => {
        $('#')
    })
    .fail((jqXHR, textStatus) => {
        console.log(textStatus)
        swal({
            icon:"../assets/shock.gif",
            title: "Internal Server Error"
        })
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();

    $('#logoutbtn').hide()
    $('#clickhere').show()

    localStorage.clear()
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

$(document).ready(function () {
    if (localStorage.token) {
        $('#regisform').hide()
        $('#loginform').hide()
        $('#clickhere').hide()
    } else {
        animeTrending()
        $('#home').hide()
        // $('#navbar').hide()
        // $('#regisform').hide()
        // $('#loginform').hide()
    }

    $('#regisbtn').click(function(){
        event.preventDefault()
        let userName = $('#regisuser').val()
        let email = $('#regisemail').val()
        let password = $('#regispassword').val()
        
        if (email != '' && password != '' && userName != ''){
            $.ajax({
                method: "POST",
                url: `${baseUrl}/users/signup`,
                data: {
                    userName,
                    email,
                    password
                }
            })
            .done(resp => {
                swal({
                    icon: "../assets/ohyeah.gif",
                    title: "Success Register, Please Login"
                })
                $('#regisform').hide()
                $('#loginform').show()
                
                $('#regisuser').val('')
                $('#regisemail').val('')
                $('#regispassword').val('')
                $('#loginemail').val('')
                $('#loginpassword').val('')
            })
            .fail((jqXHR, textStatus) => {
                console.log(textStatus)
                swal({
                    icon:"../assets/shock.gif",
                    title: "Email Already Used"
                })
            })
        }else{
            swal({
                icon: "../assets/shock.gif",
                title: "Email/Password cannot be empty"
            })
        }
    })

    $('#loginbtn').click(function(){
        event.preventDefault()
        let email = $('#loginemail').val()
        let password = $('#loginpassword').val()
        
        if (email != '' && password != ''){
            $.ajax({
                method: "POST",
                url: `${baseUrl}/users/signin`,
                data: {
                    email,
                    password
                }
            })
            .done(resp => {
                swal({
                    icon: "../assets/ohyeah.gif",
                    title: "Success Login!"
                })
                $('#loginform').hide()
                $('#navbar').show()

                $('#regisuser').val('')
                $('#regisemail').val('')
                $('#regispassword').val('')
                $('#loginemail').val('')
                $('#loginpassword').val('')

                localStorage.setItem("token", resp.token)
            })
            .fail((jqXHR, textStatus) => {
                console.log(textStatus)
                swal({
                    icon: "../assets/shock.gif",
                    title: "Email/Password Wrong"
                })
            })
        }else{
            swal({
                icon: "../assets/shock.gif",
                title: "Email/Password cannot be empty"
            })
        }
    })

    $('#clickhere').click(function () {
        event.preventDefault()
        $('#home').hide()
        $('#navbar').show()
    })

    // $('#clickhere').click(function () {
    //     event.preventDefault()
    //     $('#regisform').hide()
    //     $('#clickhere').hide()
    //     $('#loginform').show()
    // })

    $('#formcancelregis').click(function () {
        event.preventDefault()
        $('#regisform').hide()
        $('#clickhere').show()
        $('#loginform').hide()
    })

    $('#formcancellogin').click(function () {
        event.preventDefault()
        $('#regisform').hide()
        $('#clickhere').show()
        $('#loginform').hide()
    })

    $('#toRegis').click(function () {
        event.preventDefault()
        $('#regisform').show()
        $('#loginform').hide()
    })

    $('#toLogin').click(function () {
        event.preventDefault()
        $('#regisform').hide()
        $('#loginform').show()
    })

    $('#logoutbtn').click(function () {
        event.preventDefault()
        swal({
                title: "Are you sure?",
                text: "We gonna miss you",
                icon: "../assets/shock.gif",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    // signOut()
                    swal({
                        title: "You'r Logout!, We will miss you!",
                        icon: "../assets/ok.png",
                    });
                } else {
                    swal({
                        icon: "../assets/ohyeah.gif",
                        title: "Please, Don't do that again!"
                    });
                }
            });
    })
});