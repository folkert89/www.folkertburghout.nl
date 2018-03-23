



//add eventlistener when user starts inputting

document.getElementById("myInput").addEventListener("input", function(){
var value = document.getElementById("myInput").value;
console.log(value);
getUrl(value);
});


//with the input request API queries
//

function getUrl (value){
var url = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search="+value+"&limit=10&namespace=0&format=json";
console.log(url);
fetchAPI(url);
}

//display the requested queries in the listing below

function fetchAPI (url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = "json";
    request.send();
    request.onload = function() {
    var json = request.response;
    console.log(json);
    displayList(json);
};
}

function displayList (json){
  console.log(json);
  var ul = document.getElementById("lists");

while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
         // create a new li element
  for (var i=0; i<10; i++){
      var li = document.createElement( 'li' );    
   var parent = document.getElementById("lists");
   var link= document.createElement('a');
    li.textContent = json[1][i]; 
    link.setAttribute("href", json[3][i]);   
    link.appendChild(li);  
    parent.appendChild(link);                 
  }
   

      
      //https://stackoverflow.com/questions/42443958/creating-multiple-list-items-in-list-element-with-a-loop

}
/*function buildMemberList(members){
  if(typeof members === 'object' && 
     typeof members.slice === 'function'){
    var all = members.length;
    var ul = document.createElement('ul');
    for(var i=0;i<all;i++){
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(members[i].name));
      ul.appendChild(li);
    }
    return ul;
  }
}//https://www.w3.org/wiki/JavaScript_best_practices#Build_on_the_shoulders_of_giants*/