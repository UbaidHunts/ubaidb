// Scroll reveal, active-nav highlighting, sticky-nav hairline, footer year.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── footer year ─────────────────────────────────────────── */
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ── reveal on scroll ────────────────────────────────────── */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!reduceMotion && "IntersectionObserver" in window && revealables.length) {
    revealables.forEach(function (el) {
      el.dataset.reveal = "pending";
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.dataset.reveal = "shown";
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    revealables.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ── active section in nav ───────────────────────────────── */
  // Only same-page "#id" links take part; cross-page links are left alone so
  // their hardcoded aria-current="page" survives.
  var navLinks = Array.prototype.slice
    .call(document.querySelectorAll(".nav-link"))
    .filter(function (link) {
      return link.getAttribute("href").charAt(0) === "#";
    });

  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var visible = new Set();

    var setCurrent = function () {
      var topMost = null;
      sections.forEach(function (section) {
        if (!visible.has(section)) return;
        if (!topMost || section.offsetTop < topMost.offsetTop) topMost = section;
      });

      navLinks.forEach(function (link) {
        var isCurrent = topMost && link.getAttribute("href") === "#" + topMost.id;
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setCurrent();
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ── nav hairline once scrolled ──────────────────────────── */
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var frame = 0;
    var sync = function () {
      frame = 0;
      nav.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };
    window.addEventListener(
      "scroll",
      function () {
        if (frame === 0) frame = window.requestAnimationFrame(sync);
      },
      { passive: true }
    );
    sync();
  }

  /* ── has the light hero scrolled out from under the nav? ─── */
  // Drives the nav's light treatment and hides the wordmark while the hero is
  // still on screen — the name is already set in the hero itself there.
  var paperHero = document.querySelector(".hero--paper, .page-header--paper");
  if (nav && paperHero && "IntersectionObserver" in window) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        nav.dataset.pastHero = entries[0].isIntersecting ? "false" : "true";
      },
      { rootMargin: "-" + nav.offsetHeight + "px 0px 0px 0px", threshold: 0 }
    );
    nav.dataset.pastHero = "false";
    heroObserver.observe(paperHero);
  }
})();
