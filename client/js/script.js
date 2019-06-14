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
    gapi.client.setApiKey("AIzaSyB1r4dpBP-lLxR-TfKyMicVkcm4f2gfmms");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}