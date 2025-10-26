// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    Swal.fire({
        title: 'Nghe một chút nhạc nha?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const song = document.querySelector('.song');
            if (song && typeof song.play === 'function') song.play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});


// animation timeline (uses GSAP 3 API)
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    if (textBoxChars) {
        textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
            .split("")
            .join("</span><span>")}</span>`;
    }

    if (hbd) {
        hbd.innerHTML = `<span>${hbd.innerHTML
            .split("")
            .join("</span><span>")}</span>`;
    }

    const ideaTextTrans = {
        autoAlpha: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        autoAlpha: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // Ensure all sections are hidden initially (in case CSS/JS loads slowly)
    gsap.set(".container > div", { autoAlpha: 0 });
    // Ensure container itself is visible for animations (container may be hidden in CSS)
    gsap.set(".container", { autoAlpha: 1 });

    // timeline (modern GSAP)
    const tl = gsap.timeline();

    tl.from(".one", { duration: 0.7, autoAlpha: 0, y: 10 })
      .from(".two", { duration: 0.4, autoAlpha: 0, y: 10 }, "-=0.2")
      .to(".one", { duration: 0.7, autoAlpha: 0, y: 10 }, "+=3.5")
      .to(".two", { duration: 0.7, autoAlpha: 0, y: 10 }, "-=1")
      .from(".three", { duration: 0.7, autoAlpha: 0, y: 10 })
      .to(".three", { duration: 0.7, autoAlpha: 0, y: 10 }, "+=3")
      .from(".four", { duration: 0.7, scale: 0.2, autoAlpha: 0 })
      .from(".fake-btn", { duration: 0.3, scale: 0.2, autoAlpha: 0 })
      .to(".fake-btn", { duration: 0.1, backgroundColor: "rgb(127, 206, 248)" }, "+=4")
      .to(".four", { duration: 0.5, scale: 0.2, autoAlpha: 0, y: -150 }, "+=1")
      .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-3 strong", { duration: 0.5, scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
      .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-5", { duration: 0.7, rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, autoAlpha: 0 })
      .to(".idea-5 span", { duration: 0.7, rotation: 90, x: 8 }, "+=1.4")
      .to(".idea-5", { duration: 0.7, scale: 0.2, autoAlpha: 0 }, "+=2")
      .from(".idea-6 span", { duration: 0.8, scale: 3, autoAlpha: 0, rotation: 15, ease: "expo.out" , stagger: 0.2 })
      .to(".idea-6 span", { duration: 0.8, scale: 3, autoAlpha: 0, rotation: -15, ease: "expo.out", stagger: 0.2 }, "+=1.5");

    // --------------------------
    // Balloon animations (responsive, varied sizes & slower)
    // --------------------------
    const balloons = gsap.utils.toArray(".baloons img");
    const balloonTweens = [];

    balloons.forEach((el, i) => {
        // set sensible transform origin
        gsap.set(el, { transformOrigin: '50% 50%' });

        // compute distance using viewport so mobile/desktop behave similarly
        const vh = Math.max(window.innerHeight || 800, 800);
        const startY = vh + 300 + Math.random() * 300; // start below viewport
        const endY = - (vh * 0.9) - (Math.random() * 200); // end above viewport
        const duration = gsap.utils.random(8, 14); // slower motion
        const delay = i * 0.25 + gsap.utils.random(0, 1.5); // stagger + randomness
        const s = gsap.utils.random(0.8, 1.3); // varied scales

        const t = gsap.fromTo(el,
            { autoAlpha: 0.9, y: startY, scale: s, x: gsap.utils.random(-60, 60), rotation: gsap.utils.random(-15,15) },
            { autoAlpha: 1, y: endY, scale: s, duration: duration, ease: 'none', delay: delay, repeat: -1, repeatDelay: gsap.utils.random(0.5, 2.5) }
        );

        // small horizontal drift during the tween for natural feel
        gsap.to(el, { x: '+=0', duration: duration, repeat: -1, ease: 'sine.inOut', yoyo: true });

        balloonTweens.push(t);
    });

    // Append the rest of the visual timeline after balloons were kicked off
    tl.from(".profile-picture", { duration: 0.5, scale: 1, autoAlpha: 0, x: -25, y: 25, ease: "power2.out" }, "-=2")
      .from(".hat", { duration: 0.5, x: -100, y: 350, rotation: -180, autoAlpha: 0 })
      .from(".wish-hbd span", { duration: 0.7, autoAlpha: 0, y: -50, rotation: 150, skewX: "30deg", ease: "elastic.out(1, 0.5)", stagger: 0.1 }, "party")
      .fromTo(".wish-hbd span", { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: "expo.out", duration: 0.7, stagger: 0.1 }, "party")
      .from(".wish h5", { duration: 0.5, autoAlpha: 0, y: 10, skewX: "-15deg" }, "party")
      .to(".eight svg", { duration: 1.5, visibility: 'visible', opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4, stagger: 0.3 })
      .to(".six", { duration: 0.5, autoAlpha: 0, y: 30, zIndex: -1 })
      .from(".nine p", { duration: 1, ...ideaTextTrans, stagger: 1.2 })
      .to(".last-smile", { duration: 0.5, rotation: 90 }, "+=1");

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    if (replyBtn) {
        replyBtn.addEventListener("click", () => {
            tl.restart();
            // restart balloons too
            balloonTweens.forEach(t => { try { t.restart(true); } catch (e) { /* ignore */ } });
        });
    }
};
