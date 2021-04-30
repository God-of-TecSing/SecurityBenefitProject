function postToServer(value, time, boolean) {
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
  var data = JSON.stringify({'Company': value, 'Time': time, 'Delete': boolean});
  xhr.send(data);
}

document.addEventListener("DOMContentLoaded", () => {

  function execute(time, png)
  {
    postToServer(document.getElementById("search").value, time, false);
    graph = "/images/" + document.getElementById("search").value + png;
    document.getElementById("plot").src = "";
    setTimeout(function()
    {
      document.getElementById("plot").src = graph;
      setTimeout(postToServer(document.getElementById("search").value, time, true),500);
    }, 2000);
  }

  document.querySelector("#week").addEventListener("click", (e) =>
    { execute(1,"week.png");  });

  document.querySelector("#month").addEventListener("click", (e) =>
    { execute(2,"month.png"); });

  document.querySelector("#year").addEventListener("click", (e) =>
    { execute(3,"year.png");  });

  document.querySelector("#years").addEventListener("click", (e) =>
    { execute(4,"5year.png"); });
});
