window.onload = function() {
  document.getElementById("myBtn").addEventListener("click", function(){
        $.ajax( {
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
        success: function ( json ) {
          var post= json.shift();
          document.getElementById("inspiration").innerHTML = post["content"] + "<p>&mdash;  " + post.title +"</p>";
          tweetLink (post.content, post.title);
        },
        cache: false

      } );

  });
  function tweetLink (content, title) {
    console.log(typeof content);
    content = content.replace(/(<p>)|\.[^.]*$/g, "");
    if (content.length>=(134-title.length)) {
      content = content.substring(0,134-title.length) +"..."
    };
    console.log(content);
    var b = document.getElementById('btnTweet');
    b.setAttribute("href", "https://twitter.com/intent/tweet?text="+encodeURIComponent('"' + content + '" ' +title));
  };
};
