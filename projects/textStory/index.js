(function(){
  var data = window._DATA.content;
  var wrapper = document.querySelector("#app");
  var mainId = 0;
  var index = 1;
  var HEIGHT = document.body.offsetHeight;
  var footer = document.querySelector(".footer");

  var modal = document.querySelector("#modal");
  modal.onclick = function(e) {
    e.stopPropagation();
    if(e.target === modal) {
      modal.style.visibility = 'hidden';
      footer.style.visibility = "visible";
    }
  }

  var insertDialog = function(item, side) {
    var ele = document.createElement("div");
    ele.classList.add("dialog-item");
    ele.classList.add(side);

    var name = document.createElement("p");
    name.classList.add("name");
    name.innerText = item.name;

    var message = document.createElement("div");
    message.classList.add("message");
    message.innerText = item.content;

    ele.append(name);
    ele.append(message);

    wrapper.append(ele);
  }

  var showModal = function() {
    modal.style.visibility = 'visible';
    modal.style.opacity = 1;
  }

  var clickHandle = function(e) {
    e.stopPropagation();
    e.preventDefault();

    if(index === data.length) {
      showModal();
      return;
    }

    if(data[index].id === mainId) {
      insertDialog(data[index], "right");
    } else {
      insertDialog(data[index], "left");
    }
    index++;

    if(wrapper.offsetHeight > HEIGHT) {
      document.body.scrollTop = document.body.scrollHeight;
    }
  }

  for(; index<data.length;index++) {
    if(data[index].id !== data[0].id) {
      mainId = data[index].id;
      break;
    }
  }

  index = 1;
  insertDialog(data[0], "left");

  setTimeout(function(){
    wrapper.addEventListener("click", clickHandle, false);
  }, 300);
})();

