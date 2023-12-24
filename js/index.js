import {
  onDatabaseReady,
  getProfile,
  translatePage,
} from "./database-manage.js";

import { calculateYearsDifference, counterHtml } from "./functions.js";

// $("html, body").animate({ scrollTop: 0 }, "slow");

const defaultLanguage = localStorage.getItem("defaultLanguage") || "english";
defaultLanguage !== "english"
  ? translatePage(defaultLanguage)
  : $(`#${defaultLanguage}-option-container`).addClass("disabled");
$(
  `#${defaultLanguage === "english" ? "spanish" : "english"}-option-container`
).removeClass("disabled");

$("#english-option-container, #spanish-option-container").click(function () {
  if (!$(this).hasClass("disabled")) {
    translatePage($(this).attr("value"));
  }
});

onDatabaseReady();

// NAVBAR
$(".nav-link-event").click(function () {
  let viewportWidthEm = $(window).width() / 16;
  viewportWidthEm <= 60.875 && $("#burger-button").trigger("click");
});

// PROFILE
const profileData = await getProfile();

$("#location-span").text(
  ` ${profileData.location.province_state}, ${profileData.location.country}.`
);

counterHtml($("#projects-completed"), profileData.projects.length, 100);

const experienceData = calculateYearsDifference(
  profileData.experience.toDate()
);
$("#experience").text(`${experienceData.years}y ${experienceData.days}d`);

counterHtml($("#skills"), profileData.skills.length, 100);

$("#web-header-title").on("click", function (event) {
  if (event.ctrlKey && event.shiftKey) {
    // Redirige a la página deseada
    window.location.href = "./pages/admin-panel.html";
  }
});
