// Typing intro
(function () {
  const target = document.getElementById("typed");
  const text = "fallentheDev@home:~# whoami";
  let i = 0;
  function type() {
    if (i <= text.length) {
      target.innerHTML = text.slice(0, i) + '<span class="cursor">&nbsp;</span>';
      i++;
      setTimeout(type, 55 + Math.random() * 60);
    } else {
      target.innerHTML = text + '<span class="cursor">&nbsp;</span>';
    }
  }
  type();
})();
