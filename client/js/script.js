let baseUrl = 'http://localhost:3000'

function animeTrending() {
    $.ajax({
            method: "GET",
            url: `${baseUrl}/animes`,
            // headers:{
            //     token : localStorage.getItem('token')
            // }
        })
        .done(resp => {
            $('#animelist').empty()
            for (let i = 0; i < resp.anime.length; i++) {
                $('#animelist').append(`
            <div class="card" style="width: 15rem;margin-bottom:10px; margin-right:10px" onclick="details('${resp.anime[i].id}')">
            <img src="${resp.anime[i].attributes.coverImage.large}" class="card-img-top" alt="..." style="height:80px">
            <div class="card-body">
            <h5 class="card-title">${resp.anime[i].attributes.canonicalTitle}</h5>
                <p class="card-text">Rating: ${resp.anime[i].attributes.averageRating}</p>
                <p class="card-text">Status: ${resp.anime[i].attributes.status}</p>
            </div>
            </div>
            `)
            }
        })
        .fail((jqXHR, textStatus) => {
            console.log(textStatus)
            swal({
                icon: "../assets/shock.gif",
                title: "Internal Server Error"
            })
        })
}

function details(input) {
    $.ajax({
            method: "GET",
            url: `${baseUrl}/animes/details/${input}`,
            // headers:{
            //     token : localStorage.getItem('token')
            // },
        })
        .done(resp => {
            $('#detail').empty()
            $('#mainhome').hide()
            $('#detail').show()
            console.log(resp)
            $('#detail').append(`
                <div class="d-flex justify-content-center" id="judul">
                <b style="font-size: 80px;color:white">${resp.data.attributes.canonicalTitle}</b>
                </div>
                <div class="d-flex justify-content-center" id="gambar">
                <img src="${resp.data.attributes.coverImage.large}" alt="" style="height: 200px">
                </div>
                <div id="detail" style="margin-top:20px">
                <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title"><b>Synopsys</b></h5>
                    <p class="card-text">${resp.data.attributes.synopsis}</p>
                    <h5 class="card-title"><b>Details</b></h5>
                    <p class="card-text">Rating: <b>${resp.data.attributes.averageRating}</b></p>
                    <p class="card-text">Episode: ${resp.data.attributes.episodeLength}</p>
                    <p class="card-text">Next Release: ${resp.data.attributes.nextRelease}</p>
                    <p class="card-text">Show Type: ${resp.data.attributes.showType}</p>
                    <p class="card-text">Status: ${resp.data.attributes.status}</p>
                </div>
                </div>
                </div>
        `)
        })
        .fail((jqXHR, textStatus) => {
            console.log(textStatus)
            swal({
                icon: "../assets/shock.gif",
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
        // $('#mainhome').hide()
        // $('#navbar').hide()
        // $('#regisform').hide()
        // $('#loginform').hide()
    }

    $('#nb').click(function(){
        event.preventDefault()
        console.log('tes')
        $('#mainhome').show()
        $('#detail').hide()
        animeTrending()
    })

    $('#regisbtn').click(function () {
        event.preventDefault()
        let userName = $('#regisuser').val()
        let email = $('#regisemail').val()
        let password = $('#regispassword').val()

        if (email != '' && password != '' && userName != '') {
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
                        icon: "../assets/shock.gif",
                        title: "Email Already Used"
                    })
                })
        } else {
            swal({
                icon: "../assets/shock.gif",
                title: "Email/Password cannot be empty"
            })
        }
    })

    $('#loginbtn').click(function () {
        event.preventDefault()
        let email = $('#loginemail').val()
        let password = $('#loginpassword').val()

        if (email != '' && password != '') {
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
        } else {
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