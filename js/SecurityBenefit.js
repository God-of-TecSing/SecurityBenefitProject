function postToServer(value, time) {
  var xhr = new XMLHttpRequest();
  var url = "/javascriptPost";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
       let graph = xhr.responseText;
      console.log(graph);
    }
  };
  var data = JSON.stringify({'Company': value, 'Time': time});
  xhr.send(data);
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#week").addEventListener("click", (e) => {
    var time = 1;
    postToServer(document.getElementById("search").value, time);
    graph = "/images/" + document.getElementById("search").value + "week.png";
    document.getElementById("plot").src = "";
    setTimeout(function(){document.getElementById("plot").src = graph},2000);

  });

  document.querySelector("#month").addEventListener("click", (e) => {
    var time = 2;
    postToServer(document.getElementById("search").value, time);
    graph = "/images/" + document.getElementById("search").value + "month.png";
    document.getElementById("plot").src = "";
      setTimeout(function(){document.getElementById("plot").src = graph},2000);
  });

  document.querySelector("#year").addEventListener("click", (e) => {
    var time = 3;
    postToServer(document.getElementById("search").value, time);
    graph = "/images/" + document.getElementById("search").value + "year.png";
    document.getElementById("plot").src = "";
    setTimeout(function(){document.getElementById("plot").src = graph},2000);
  });

  document.querySelector("#years").addEventListener("click", (e) => {
    var time = 4;
    postToServer(document.getElementById("search").value, time);
    graph = "/images/" + document.getElementById("search").value + "5year.png";
    document.getElementById("plot").src = "";
  setTimeout(function(){document.getElementById("plot").src = graph},2000);
  });
});
