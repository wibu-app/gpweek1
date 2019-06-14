function tplawesome(e,t) {
    res=e;
    for (var n=0;n<t.length;n++) {
        res=res.replace(/\{\{(.*?)\}\}/g, 
        function(e,r){
            return t[n][r]})
        }
        return res
    }
    
    $(function() {
        $("form").on("submit", function(e) { 
            e.preventDefault();
            console.log($('#keywords').val())
            // prepare the request
            var request = gapi.client.youtube.search.list({
                    part: "snippet", 
                    type: "video",
                    q: encodeURIComponent($("#keywords").val()).replace(/%20/g, "+"), 
                    order: "relevance",
                    maxResults: 3
            });
 
            // execute the request
            request.execute(function(response) {
                var results = response.result;
                $("#results").html("");
                $.each(results.items, function(index, item) {
                    $.get("tpl/item.html", function(data) {
                        $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                    });
                });
                resetVideoHeight();
            });
        });

        $(window).on("resize", resetVideoHeight);

    });

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDEB5MO40mLI3TZatfYjs7Ftf8OKudqQCI");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
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

function onSignIn(googleUser){
    var id_token = googleUser.getAuthResponse().id_token
    console.log(id_token);
    
    $.ajax({
        url: `http://localhost:3000/users/tokensignin`,
        method: "POST",
        data: {
            id_token : id_token
        },
        success: function(data){
            console.log(data,'===');
            
        },
        error: function(err){
            console.log(err);  
        }
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
        // $('#home').hide()
        $('#navbar').hide()
        $('#regisform').hide()
        $('#loginform').hide()
    }

    $('#regisbtn').click(function(){
        event.preventDefault()
        let username = $('#regisuser').val()
        let email = $('#regisemail').val()
        let password = $('#regispassword').val()
        
        if (email != '' && password != '' && username != ''){
            $.ajax({
                method: "POST",
                url: `${baseUrl}/users/register`,
                data: {
                    username,
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
                url: `${baseUrl}/users/login`,
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

    // $('#clickhere').click(function () {
    //     event.preventDefault()
    //     $('#home').hide()
    //     $('#navbar').show()
    // })

    $('#clickhere').click(function () {
        event.preventDefault()
        $('#regisform').hide()
        $('#clickhere').hide()
        $('#loginform').show()
    })

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
// $(document).ready(function(){
//     $("#submit").click(function(){
//         $.ajax({
//             url: "http://localhost:3000/api/users/register",
//             method: "POST",
//             data : {
//                 username: $("#inputusername").val(),
//                 email: $('#inputEmail').val(),
//                 password: $('#inputPassword').val(),
//             }
//         })
//         .done(function(){
            
//         })
//     })
//     $('#submitLogin').click(function(){
//         $.ajax({
//             url: "http://localhost:3000/api/users/login",
//             method: "POST",
//             data:{
//                 email: $("#InputEmailLogin").val(),
//                 password: $("#InputPasswordLogin").val()
//             }
//         })
//         .done(function(usertoken){
//             console.log(usertoken);
//             localStorage.setItem('usertoken', usertoken);
//         })
//         .fail(function(err){
//             console.log(err);
//         })
//     })

  

// })
