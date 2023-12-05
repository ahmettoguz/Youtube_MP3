// script.js
$(function () {
  mainFunction();
});

function mainFunction() {
  const form = document.getElementById("form");
  const btnCheckServer = document.getElementById("checkServer");

  form.addEventListener("submit", submitForm);
  btnCheckServer.addEventListener("click", checkServer);

  const serverUrl = "http://localhost";
  // const serverUrl = "http://159.203.81.11"

  function checkServer(e) {
    $.ajax({
      url: serverUrl,
      type: "GET",
      contentType: false,
      processData: false,

      followRedirects: true,
      cache: false,
      dataType: "json",
      success: function (response) {
        console.log(response);
        const out = JSON.stringify(response, null, 3);
        $("#res").html("<pre>" + out + "</pre>");

        $("#res").removeClass("error");
        $("#res").addClass("success");
      },
      error: function (response) {
        console.log(response);
        const out = JSON.stringify(response, null, 3);
        $("#res").html("<pre>" + out + "</pre>");

        $("#res").removeClass("success");
        $("#res").addClass("error");
      },
    });
  }

  function submitForm(e) {
    e.preventDefault();

    let videoUrl = $("#videoUrl").val();
    videoUrl: "https://youtu.be/shr16M_1qu8?list=LL";

    $.ajax({
      url: "http://localhost/getUrlInfo",
      type: "GET",
      data: {
        url: videoUrl,
      },
      success: function (response) {
        console.log(response);
      },

      success: function (response) {
        console.log(response);
        const out = JSON.stringify(response, null, 3);
        $("#res").html("<pre>" + out + "</pre>");

        $("#res").removeClass("error");
        $("#res").addClass("success");
      },
      error: function (response) {
        console.log(response);
        const out = JSON.stringify(response, null, 3);
        $("#res").html("<pre>" + out + "</pre>");

        $("#res").removeClass("success");
        $("#res").addClass("error");
      },
    });
  }
}
