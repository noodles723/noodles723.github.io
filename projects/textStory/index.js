(function(){
  // var data = window._DATA.content;
  var app = document.querySelector("#app");
  // var wrapper = document.querySelector(".wrapper");
  // var mainId = 0;
  var index = 1;
  var HEIGHT = app.offsetHeight;
  var footer = document.querySelector(".footer");
  var dialogs = document.querySelectorAll(".dialog-item");

  var end = false;

  app.ontouchdown = function(e) {e.preventDefault();} 
  var modal = document.querySelector("#modal");
  modal.onclick = function(e) {
    e.stopPropagation();
    if(e.target === modal) {
      // modal.style.visibility = 'hidden';
      modal.style.animationName = "hide";
      footer.style.visibility = "visible";
      app.style.overflowY = "auto";
    }

    if(!end) {
      end = true;
      app.removeEventListener("touchend", clickHandle, false);
      app.addEventListener("click", clickHandle, false);
    }
  }

  // var insertDialog = function(item, side) {
  //   var ele = document.createElement("div");
  //   ele.classList.add("dialog-item");
  //   ele.classList.add(side);

  //   var name = document.createElement("p");
  //   name.classList.add("name");
  //   name.innerText = item.name;

  //   var message = document.createElement("div");
  //   message.classList.add("message");
  //   message.innerText = item.content;

  //   ele.append(name);
  //   ele.append(message);

  //   wrapper.append(ele);
  // }

  var showModal = function() {
    // modal.style.visibility = 'visible';
    // modal.style.opacity = 1;
    modal.style.animationName = "show";
  }

  function showDialog(item) {
    item.style.animationName = "slideInUp";
  }

  var h = 0;
  var clickHandle = function(e) {
    e.stopPropagation();
    e.preventDefault();

    if(index === dialogs.length) {
      showModal();
      return;
    }

    // if(data[index].id === mainId) {
    //   insertDialog(data[index], "right");
    // } else {
    //   insertDialog(data[index], "left");
    // }
    showDialog(dialogs[index]);
      
    if(dialogs[index].offsetTop+dialogs[index].offsetHeight > HEIGHT) {  
        app.scrollTop += dialogs[index].offsetHeight + 12;
    }

    index++;
  }

  // for(; index<dialogs.length;index++) {
  //   if(dialogs[index].id !== dialogs[0].id) {
  //     mainId = data[index].id;
  //     break;
  //   }
  // }
  // for(var i=0;i<data.length;i++) {
  //   if(data[i].id !== mainId) insertDialog(data[i], "left");
  //   else insertDialog(data[i], "right");
  // }

  
  index = 1;
  // insertDialog(data[0], "left");
  showDialog(dialogs[0]);

  setTimeout(function(){
    // app.ontouchup = clickHandle;
    app.addEventListener("touchend", clickHandle, false);
  }, 300);

})();

