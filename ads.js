// ===== AdSense + ad-blocker detection =====
// Runs on DOMContentLoaded. Pushes all ad slots, then checks for ad blockers.

document.addEventListener("DOMContentLoaded", function () {
  // Push all ad slots on the page
  try {
    const ads = document.querySelectorAll("ins.adsbygoogle");
    ads.forEach(function () {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  } catch (e) {
    // AdSense script may not be loaded yet — that's fine
  }

  // Ad-blocker detection
  // Strategy: create a bait element that ad blockers typically hide,
  // then check if it was blocked. Only show a message if an ad blocker IS detected.
  detectAdblock();
});

function detectAdblock() {
  // Method 1: Bait element with ad-related class names
  const bait = document.createElement("div");
  bait.className = "ad-banner ads adsbygoogle ad-placement ad-zone ad-unit";
  bait.style.cssText =
    "position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;";
  bait.innerHTML = "&nbsp;";
  document.body.appendChild(bait);

  // Method 2: Also try loading the AdSense script URL via fetch
  // (some blockers block the network request, not just the DOM)

  setTimeout(function () {
    let blocked = false;

    // Check bait element
    const baitStyle = window.getComputedStyle(bait);
    if (
      bait.offsetHeight === 0 ||
      bait.clientHeight === 0 ||
      baitStyle.display === "none" ||
      baitStyle.visibility === "hidden" ||
      baitStyle.opacity === "0" ||
      bait.parentElement === null
    ) {
      blocked = true;
    }
    bait.remove();

    // Also check if adsbygoogle is undefined (script was blocked)
    if (typeof window.adsbygoogle === "undefined") {
      // The AdSense script didn't load — could be an ad blocker or network issue
      // Only count this as "blocked" if the bait was also hidden
      // (avoids false positives on slow connections)
    }

    if (blocked) {
      showAdblockNotice();
    }
  }, 200);
}

function showAdblockNotice() {
  // Don't show if already dismissed this session
  if (sessionStorage.getItem("adblock-notice-dismissed") === "1") return;

  const notice = document.createElement("div");
  notice.className = "adblock-notice";
  notice.innerHTML =
    '<span class="ab-icon">[adblock]</span> ' +
    '<span class="ab-text">this site runs ads to support my hobbies. ' +
    'if you\u2019re using an ad blocker, please consider ' +
    '<span class="hl">disabling it here</span> \u2014 no popups, no junk, just one banner. ' +
    'if you\u2019d rather not, that\u2019s fine too.</span> ' +
    '<span class="ab-close" id="ab-close">dismiss</span>';

  document.body.appendChild(notice);

  document.getElementById("ab-close").addEventListener("click", function () {
    notice.style.display = "none";
    sessionStorage.setItem("adblock-notice-dismissed", "1");
  });
}
