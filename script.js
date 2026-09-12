document.addEventListener("DOMContentLoaded", function () {

    var authScreen = document.getElementById("authScreen");
    var mainUnseenContent = document.getElementById("mainUnseenContent");

    var loginBox = document.getElementById("loginBox");
    var signupBox = document.getElementById("signupBox");

    var showSignup = document.getElementById("showSignup");
    var showLogin = document.getElementById("showLogin");

    var loginButton = document.getElementById("loginButton");
    var signupButton = document.getElementById("signupButton");

    var loginUsername = document.getElementById("loginUsername");
    var loginPassword = document.getElementById("loginPassword");

    var signupUsername = document.getElementById("signupUsername");
    var signupPassword = document.getElementById("signupPassword");
    var signupConfirmPassword =
        document.getElementById("signupConfirmPassword");

    var loginError = document.getElementById("loginError");
    var signupError = document.getElementById("signupError");


    /* =====================================================
       REMEMBER ME + SIGN OUT
    ===================================================== */

    var rememberWrapper = document.createElement("label");

    rememberWrapper.style.display = "flex";
    rememberWrapper.style.alignItems = "center";
    rememberWrapper.style.justifyContent = "flex-start";
    rememberWrapper.style.gap = "3px";
    rememberWrapper.style.margin = "6px 0";
    rememberWrapper.style.padding = "0";
    rememberWrapper.style.width = "fit-content";
    rememberWrapper.style.color = "rgba(255,255,255,.65)";
    rememberWrapper.style.fontSize = "12px";
    rememberWrapper.style.lineHeight = "1";
    rememberWrapper.style.cursor = "pointer";

    rememberWrapper.innerHTML =
        '<input type="checkbox" id="rememberMe" ' +
        'style="accent-color:#00f5d4;cursor:pointer;margin:0 3px 0 0;padding:0;width:14px;height:14px;">' +
        '<span style="margin:0;padding:0;line-height:1;">Remember me</span>';

    if (loginPassword && loginPassword.parentNode) {
        loginPassword.parentNode.insertAdjacentElement(
            "afterend",
            rememberWrapper
        );
    }

    var rememberMe =
        document.getElementById("rememberMe");


    /* =====================================================
       SIGN OUT BUTTON
    ===================================================== */

    var signOutButton =
        document.createElement("button");

    signOutButton.type = "button";
    signOutButton.id = "unseenSignOut";
    signOutButton.textContent = "Sign Out";

    signOutButton.style.position = "fixed";
    signOutButton.style.top = "20px";
    signOutButton.style.right = "20px";
    signOutButton.style.zIndex = "99999";
    signOutButton.style.padding = "9px 15px";
    signOutButton.style.borderRadius = "10px";
    signOutButton.style.border =
        "1px solid rgba(124,92,255,.35)";
    signOutButton.style.background =
        "rgba(124,92,255,.08)";
    signOutButton.style.color = "#b9adff";
    signOutButton.style.fontFamily = "inherit";
    signOutButton.style.fontSize = "11px";
    signOutButton.style.fontWeight = "700";
    signOutButton.style.cursor = "pointer";
    signOutButton.style.display = "none";

    document.body.appendChild(signOutButton);


    /* =====================================================
       CHECK EXISTING LOGIN
    ===================================================== */

    var rememberedUser =
        localStorage.getItem("unseenRememberedUser");

    var sessionUser =
        sessionStorage.getItem("unseenSessionUser");

    localStorage.removeItem("unseenLoggedInUser");

    var loggedInUser =
        rememberedUser || sessionUser;

    if (loggedInUser) {

        authScreen.style.display = "none";
        mainUnseenContent.style.display = "block";
        signOutButton.style.display = "block";

    } else {

        authScreen.style.display = "flex";
        mainUnseenContent.style.display = "none";
        signOutButton.style.display = "none";

    }


    /* =====================================================
       SHOW SIGNUP
    ===================================================== */

    showSignup.addEventListener("click", function () {

        loginBox.style.display = "none";
        signupBox.style.display = "block";

        loginError.textContent = "";

    });


    /* =====================================================
       SHOW LOGIN
    ===================================================== */

    showLogin.addEventListener("click", function () {

        signupBox.style.display = "none";
        loginBox.style.display = "block";

        signupError.textContent = "";

    });


    /* =====================================================
       SIGN OUT
    ===================================================== */

    signOutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "unseenRememberedUser"
            );

            sessionStorage.removeItem(
                "unseenSessionUser"
            );

            localStorage.removeItem(
                "unseenLoggedInUser"
            );

            if (rememberMe) {
                rememberMe.checked = false;
            }

            loginUsername.value = "";
            loginPassword.value = "";

            authScreen.style.display = "flex";
            mainUnseenContent.style.display = "none";

            signupBox.style.display = "none";
            loginBox.style.display = "block";

            loginError.textContent = "";
            signupError.textContent = "";

            signOutButton.style.display = "none";

            showNotification(
                "You have been signed out successfully.",
                "SIGNED OUT"
            );

        }
    );


    /* =====================================================
       SIGN UP
    ===================================================== */

    signupButton.addEventListener("click", function () {

        var username =
            signupUsername.value.trim();

        var password =
            signupPassword.value;

        var confirmPassword =
            signupConfirmPassword.value;

        signupError.textContent = "";


        if (username === "") {

            signupError.textContent =
                "Username is required.";

            return;

        }


        if (password === "") {

            signupError.textContent =
                "Password is required.";

            return;

        }


        if (confirmPassword === "") {

            signupError.textContent =
                "Please confirm your password.";

            return;

        }


        if (password.length < 6) {

            signupError.textContent =
                "Password must be at least 6 characters.";

            return;

        }


        if (password !== confirmPassword) {

            signupError.textContent =
                "Passwords do not match.";

            return;

        }


        var user = {
            username: username,
            password: password
        };


        localStorage.setItem(
            "unseenAccount",
            JSON.stringify(user)
        );


        if (
            rememberMe &&
            rememberMe.checked
        ) {

            localStorage.setItem(
                "unseenRememberedUser",
                username
            );

            sessionStorage.removeItem(
                "unseenSessionUser"
            );

        } else {

            sessionStorage.setItem(
                "unseenSessionUser",
                username
            );

            localStorage.removeItem(
                "unseenRememberedUser"
            );

        }


        authScreen.style.display = "none";
        mainUnseenContent.style.display = "block";
        signOutButton.style.display = "block";

    });


    /* =====================================================
       LOGIN
    ===================================================== */

    loginButton.addEventListener("click", function () {

        var username =
            loginUsername.value.trim();

        var password =
            loginPassword.value;

        loginError.textContent = "";


        if (username === "") {

            loginError.textContent =
                "Username is required.";

            return;

        }


        if (password === "") {

            loginError.textContent =
                "Password is required.";

            return;

        }


        var savedAccount =
            localStorage.getItem("unseenAccount");


        if (!savedAccount) {

            loginError.textContent =
                "No account found. Please sign up first.";

            return;

        }


        var account =
            JSON.parse(savedAccount);


        if (
            username !== account.username ||
            password !== account.password
        ) {

            loginError.textContent =
                "Incorrect username or password.";

            return;

        }


        if (
            rememberMe &&
            rememberMe.checked
        ) {

            localStorage.setItem(
                "unseenRememberedUser",
                username
            );

            sessionStorage.removeItem(
                "unseenSessionUser"
            );

        } else {

            sessionStorage.setItem(
                "unseenSessionUser",
                username
            );

            localStorage.removeItem(
                "unseenRememberedUser"
            );

        }


        authScreen.style.display = "none";
        mainUnseenContent.style.display = "block";
        signOutButton.style.display = "block";

    });


    /* =====================================================
       RESET REQUEST DATA
    ===================================================== */

    localStorage.removeItem("unseenSentRequests");
    localStorage.removeItem("unseenIncomingRequests");


    /* =====================================================
       INTEREST SELECTION
    ===================================================== */

    var selectedInterests = [];

    var interestButtons =
        document.querySelectorAll(".interest");

    interestButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            var interest =
                button.textContent.trim();

            var index =
                selectedInterests.indexOf(interest);

            if (index === -1) {

                selectedInterests.push(interest);

                button.classList.add("selected");

            } else {

                selectedInterests.splice(index, 1);

                button.classList.remove("selected");

            }

        });

    });


    /* =====================================================
       DEMO STUDENT DATABASE
    ===================================================== */

    var students = [

        {
            name: "Aarav",
            branch: "CSE • 3rd Year",
            interests: [
                "AI / ML",
                "Hackathons",
                "Web Development"
            ]
        },

        {
            name: "Mehak",
            branch: "ECE • 3rd Year",
            interests: [
                "AI / ML",
                "Robotics",
                "Public Speaking"
            ]
        },

        {
            name: "Rohan",
            branch: "CSE • 2nd Year",
            interests: [
                "Web Development",
                "Gaming",
                "Hackathons"
            ]
        },

        {
            name: "Simran",
            branch: "IT • 3rd Year",
            interests: [
                "Writing",
                "Startups",
                "Public Speaking"
            ]
        },

        {
            name: "Karan",
            branch: "CSE • 3rd Year",
            interests: [
                "AI / ML",
                "Gaming",
                "Robotics"
            ]
        },

        {
            name: "Ananya",
            branch: "ECE • 2nd Year",
            interests: [
                "Photography",
                "Music",
                "Dance"
            ]
        },

        {
            name: "Dev",
            branch: "CSE • 2nd Year",
            interests: [
                "Startups",
                "Hackathons",
                "Web Development"
            ]
        },

        {
            name: "Ishita",
            branch: "IT • 3rd Year",
            interests: [
                "AI / ML",
                "Writing",
                "Photography"
            ]
        }

    ];


    /* =====================================================
       MAIN ELEMENTS
    ===================================================== */

    var matchButton =
        document.querySelector(".match-button .btn");

    var matchArea =
        document.querySelector(".match-placeholder");


    /* =====================================================
       REQUEST STORAGE
    ===================================================== */

    var sentRequests = [];
    var incomingRequests = [];

    try {

        sentRequests =
            JSON.parse(
                localStorage.getItem(
                    "unseenSentRequests"
                ) || "[]"
            );

        incomingRequests =
            JSON.parse(
                localStorage.getItem(
                    "unseenIncomingRequests"
                ) || "[]"
            );

    } catch (error) {

        sentRequests = [];
        incomingRequests = [];

    }


    function saveRequests() {

        localStorage.setItem(
            "unseenSentRequests",
            JSON.stringify(sentRequests)
        );

        localStorage.setItem(
            "unseenIncomingRequests",
            JSON.stringify(incomingRequests)
        );

    }


    /* =====================================================
       USER NAME
    ===================================================== */

    function getUserName() {

        var name =
            document.getElementById("name");

        if (
            name &&
            name.value.trim() !== ""
        ) {

            return name.value.trim();

        }


        var loggedUser =
            localStorage.getItem(
                "unseenRememberedUser"
            ) ||
            sessionStorage.getItem(
                "unseenSessionUser"
            );


        if (loggedUser) {
            return loggedUser;
        }


        return "there";

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function validEmail(email) {

        var pattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return pattern.test(email);

    }


    function suspiciousEmail(email) {

        var badDomains = [

            "gnail.com",
            "gmai.com",
            "gmial.com",
            "gmal.com",
            "gmail.co",
            "gmail.cm",
            "gmail.con",
            "gmail.cmo",
            "gamil.com",
            "hotmai.com",
            "hotmial.com",
            "outlok.com",
            "outloo.com",
            "yaho.com",
            "yhoo.com"

        ];


        var parts =
            email
                .toLowerCase()
                .trim()
                .split("@");


        if (parts.length !== 2) {
            return true;
        }


        return (
            badDomains.indexOf(parts[1]) !== -1
        );

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    function showNotification(message, title) {

        var old =
            document.querySelector(
                ".unseen-notification"
            );

        if (old) {
            old.remove();
        }


        var notification =
            document.createElement("div");

        notification.className =
            "unseen-notification";


        notification.innerHTML =

            '<div class="notification-icon">✦</div>' +

            '<div class="notification-content">' +

                '<div class="notification-label">' +
                    (title || "UNSEEN") +
                '</div>' +

                '<div class="notification-message">' +
                    message +
                '</div>' +

            '</div>' +

            '<button class="notification-close">×</button>';


        document.body.appendChild(
            notification
        );


        setTimeout(function () {

            notification.classList.add("show");

        }, 30);


        var close =
            notification.querySelector(
                ".notification-close"
            );


        if (close) {

            close.addEventListener(
                "click",
                function () {

                    notification.classList.remove("show");

                    setTimeout(function () {

                        if (notification.parentNode) {
                            notification.remove();
                        }

                    }, 300);

                }
            );

        }


        setTimeout(function () {

            if (!notification.parentNode) {
                return;
            }

            notification.classList.remove("show");

            setTimeout(function () {

                if (notification.parentNode) {
                    notification.remove();
                }

            }, 300);

        }, 4000);

    }


    /* =====================================================
       PROFILE VALIDATION
    ===================================================== */

    function validateProfile() {

        var name =
            document.getElementById("name");

        var email =
            document.getElementById("email");

        var roll =
            document.getElementById("rollNo");

        var branch =
            document.getElementById("branch");

        var year =
            document.getElementById("year");


        if (!name.value.trim()) {

            showNotification(
                "Please enter your name.",
                "NAME REQUIRED"
            );

            name.focus();

            return false;

        }


        if (!email.value.trim()) {

            showNotification(
                "Please enter your email address.",
                "EMAIL REQUIRED"
            );

            email.focus();

            return false;

        }


        if (!validEmail(email.value.trim())) {

            showNotification(
                "Please enter a valid email address.",
                "INVALID EMAIL"
            );

            email.focus();

            return false;

        }


        if (
            suspiciousEmail(
                email.value.trim()
            )
        ) {

            showNotification(
                "This email looks like it contains a typing mistake.",
                "CHECK EMAIL"
            );

            email.focus();

            return false;

        }


        if (!roll.value.trim()) {

            showNotification(
                "Please enter your roll number.",
                "ROLL NUMBER REQUIRED"
            );

            roll.focus();

            return false;

        }


        if (!branch.value) {

            showNotification(
                "Please select your branch.",
                "BRANCH REQUIRED"
            );

            branch.focus();

            return false;

        }


        if (!year.value) {

            showNotification(
                "Please select your year.",
                "YEAR REQUIRED"
            );

            year.focus();

            return false;

        }


        if (selectedInterests.length === 0) {

            showNotification(
                "Select at least one interest.",
                "SELECT INTERESTS"
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       BACKUP MESSAGE GENERATOR
    ===================================================== */

    var messageTemplates = {

        "Project Partner": [

            "Hey {name}! I'm {user}. We both seem interested in {shared}. I'm looking for someone to collaborate with on a project. Would you be interested?",

            "Hi {name}! We have {shared} in common, and I'd love to connect and see what we could build together.",

            "Hey {name}! We have a great overlap in {shared}. Maybe we could turn that common ground into a project!"

        ],


        "Hackathon Team": [

            "Hey {name}! I'm {user}. We both seem interested in {shared}. I'm looking for someone to team up with for hackathons. Want to connect?",

            "Hey {name}! I noticed that we both enjoy {shared}. It would be great to connect and possibly team up for a hackathon.",

            "Hi {name}! Our interests overlap around {shared}. Would you be interested in connecting for a future hackathon?"

        ],


        "Learn Together": [

            "Hey {name}! I'm {user}. Unseen found that we share an interest in {shared}. Want to learn and practice together?",

            "Hi {name}! I noticed we're both interested in {shared}. Maybe we could learn and practice together!",

            "Hey {name}! Since we both enjoy {shared}, I thought it would be great to connect and exchange what we're learning."

        ],


        "Find a Mentor": [

            "Hi {name}! I'm {user}. I noticed through Unseen that we share an interest in {shared}. I'd love to connect and learn from your experience.",

            "Hey {name}! Your interest in {shared} caught my attention. I'd really appreciate connecting and learning from your journey.",

            "Hi {name}! Since we share an interest in {shared}, I'd love to connect and hear about your experience."

        ],


        "Join a Community": [

            "Hey {name}! I'm {user}. We both share an interest in {shared}. It would be great to explore some campus communities together.",

            "Hi {name}! Since we're both into {shared}, maybe we could discover some interesting campus communities together.",

            "Hey {name}! Our interests overlap in {shared}. Would be great to connect and find communities around those interests."

        ],


        "Just Connect": [

            "Hey {name}! I'm {user}. Unseen showed that we share an interest in {shared}. Thought it would be nice to connect!",

            "Hey {name}! Looks like we share an interest in {shared}. Always nice to discover someone with similar interests. Let's connect!",

            "Hi {name}! Our interests overlap around {shared}, so I thought I'd say hi and connect."

        ],


        "Other": [

            "Hey {name}! I'm {user}. Unseen matched us because we share an interest in {shared}. I'd love to connect and see what we could explore together.",

            "Hi {name}! We have {shared} in common, so I thought I'd reach out and connect.",

            "Hey {name}! Your interests in {shared} caught my attention. Would be great to connect!"

        ]

    };


    var messageVersion = {};


    function generateMessage(student, intent) {

        var shared =
            student.interests.filter(
                function (interest) {

                    return (
                        selectedInterests.indexOf(
                            interest
                        ) !== -1
                    );

                }
            );


        var sharedText =
            shared.length > 0
                ? shared.slice(0, 2).join(" and ")
                : "our shared interests";


        var templates =
            messageTemplates[intent] ||
            messageTemplates["Just Connect"];


        var key =
            student.name + "-" + intent;


        if (
            messageVersion[key] === undefined
        ) {

            messageVersion[key] = 0;

        }


        var message =
            templates[
                messageVersion[key] %
                templates.length
            ];


        message =
            message.replace(
                /\{name\}/g,
                student.name
            );


        message =
            message.replace(
                /\{user\}/g,
                getUserName()
            );


        message =
            message.replace(
                /\{shared\}/g,
                sharedText
            );


        return message;

    }


    /* =====================================================
       GEMINI AI MESSAGE GENERATOR
    ===================================================== */

    async function generateGeminiMessage(student, intent) {

        var shared =
            student.interests.filter(
                function (interest) {

                    return (
                        selectedInterests.indexOf(
                            interest
                        ) !== -1
                    );

                }
            );


        try {

            var response =
                await fetch(
                    "/generate-message",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            userName:
                                getUserName(),

                            studentName:
                                student.name,

                            studentBranch:
                                student.branch,

                            sharedInterests:
                                shared,

                            purpose:
                                intent

                        })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Gemini server request failed"
                );

            }


            var data =
                await response.json();


            if (
                !data.success ||
                !data.message
            ) {

                throw new Error(
                    "Gemini did not return a message"
                );

            }


            return data.message;

        } catch (error) {

            console.error(
                "Gemini error:",
                error
            );


            return generateMessage(
                student,
                intent
            );

        }

    }


    /* =====================================================
       MODAL STYLES
    ===================================================== */

    function addModalStyles() {

        if (
            document.getElementById(
                "unseen-modal-style"
            )
        ) {
            return;
        }


        var style =
            document.createElement("style");

        style.id =
            "unseen-modal-style";


        style.textContent = [

            ".connection-modal{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:20px!important;box-sizing:border-box!important;background:rgba(0,0,0,.75)!important;z-index:999999!important;opacity:0!important;visibility:hidden!important;transition:.25s ease!important;}",

            ".connection-modal.show{opacity:1!important;visibility:visible!important;}",

            ".connection-modal-backdrop{position:absolute!important;inset:0!important;background:rgba(2,4,10,.82)!important;backdrop-filter:blur(10px)!important;}",

            ".connection-modal-box{position:relative!important;z-index:2!important;width:680px!important;max-width:94vw!important;max-height:90vh!important;overflow-y:auto!important;padding:32px!important;box-sizing:border-box!important;border-radius:24px!important;border:1px solid rgba(0,245,212,.3)!important;background:#090b14!important;color:#fff!important;box-shadow:0 30px 100px rgba(0,0,0,.8)!important;transform:translateY(20px) scale(.97)!important;transition:.25s ease!important;}",

            ".connection-modal.show .connection-modal-box{transform:translateY(0) scale(1)!important;}",

            ".modal-close{position:absolute!important;top:14px!important;right:14px!important;width:38px!important;height:38px!important;border:1px solid rgba(255,255,255,.15)!important;border-radius:10px!important;background:rgba(255,255,255,.05)!important;color:#fff!important;font-size:22px!important;cursor:pointer!important;}",

            ".modal-mini-label{margin-bottom:12px!important;color:#00f5d4!important;font-size:10px!important;font-weight:700!important;letter-spacing:2px!important;}",

            ".modal-person{display:flex!important;align-items:center!important;gap:15px!important;padding:16px!important;margin-bottom:20px!important;border-radius:15px!important;background:rgba(255,255,255,.03)!important;border:1px solid rgba(124,92,255,.2)!important;}",

            ".modal-avatar{width:52px!important;height:52px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:15px!important;background:rgba(0,245,212,.1)!important;color:#00f5d4!important;font-size:20px!important;font-weight:700!important;}",

            ".modal-person h2{margin:0 0 5px!important;color:#fff!important;font-size:21px!important;}",

            ".modal-person p{margin:0!important;color:rgba(255,255,255,.5)!important;font-size:13px!important;}",

            ".shared-box{padding:15px!important;margin-bottom:20px!important;border-radius:14px!important;border:1px solid rgba(0,245,212,.15)!important;background:rgba(0,245,212,.025)!important;}",

            ".shared-box>span{display:block!important;margin-bottom:10px!important;color:rgba(255,255,255,.5)!important;font-size:10px!important;font-weight:700!important;letter-spacing:1.5px!important;}",

            ".shared-tags{display:flex!important;flex-wrap:wrap!important;gap:8px!important;}",

            ".shared-tag{padding:7px 11px!important;border-radius:50px!important;border:1px solid rgba(0,245,212,.25)!important;background:rgba(0,245,212,.07)!important;color:#00f5d4!important;font-size:11px!important;}",

            ".modal-label{display:block!important;margin:16px 0 8px!important;color:rgba(255,255,255,.8)!important;font-size:12px!important;font-weight:700!important;}",

            ".connection-modal-box select,#connectionMessage{width:100%!important;box-sizing:border-box!important;border:1px solid rgba(124,92,255,.3)!important;border-radius:12px!important;background:#07070c!important;color:#fff!important;font-family:inherit!important;outline:none!important;}",

            ".connection-modal-box select{padding:13px 15px!important;}",

            "#connectionMessage{min-height:125px!important;padding:14px 16px!important;resize:vertical!important;line-height:1.6!important;}",

            ".ai-note{margin:9px 0 18px!important;color:rgba(255,255,255,.4)!important;font-size:11px!important;}",

            ".modal-actions{display:flex!important;justify-content:flex-end!important;gap:10px!important;}",

            ".modal-secondary,.modal-send{padding:12px 18px!important;border-radius:10px!important;cursor:pointer!important;font-size:12px!important;font-weight:700!important;}",

            ".modal-secondary{border:1px solid rgba(124,92,255,.35)!important;background:rgba(124,92,255,.08)!important;color:#b9adff!important;}",

            ".modal-send{border:1px solid rgba(0,245,212,.4)!important;background:rgba(0,245,212,.1)!important;color:#00f5d4!important;}",

            ".unseen-request-dashboard{display:grid!important;gap:20px!important;margin-top:40px!important;}",

            ".request-panel{padding:24px!important;border-radius:20px!important;border:1px solid rgba(124,92,255,.2)!important;background:rgba(255,255,255,.025)!important;}",

            ".request-panel-header{display:flex!important;justify-content:space-between!important;align-items:center!important;margin-bottom:18px!important;}",

            ".request-panel-label{color:#00f5d4!important;font-size:10px!important;font-weight:700!important;letter-spacing:2px!important;}",

            ".request-panel h3{margin:5px 0!important;color:#fff!important;}",

            ".request-panel-subtitle{margin:0!important;color:rgba(255,255,255,.45)!important;font-size:12px!important;}",

            ".request-count{width:38px!important;height:38px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:12px!important;background:rgba(0,245,212,.08)!important;border:1px solid rgba(0,245,212,.2)!important;color:#00f5d4!important;font-weight:700!important;}",

            ".request-card{display:flex!important;align-items:center!important;gap:14px!important;padding:15px!important;margin-top:10px!important;border-radius:15px!important;border:1px solid rgba(255,255,255,.07)!important;background:rgba(255,255,255,.025)!important;}",

            ".request-avatar{width:45px!important;height:45px!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;border-radius:13px!important;background:rgba(0,245,212,.1)!important;color:#00f5d4!important;font-weight:700!important;}",

            ".request-main{flex:1!important;min-width:0!important;}",

            ".request-name{color:#fff!important;font-weight:700!important;font-size:14px!important;}",

            ".request-branch{margin-top:3px!important;color:rgba(255,255,255,.45)!important;font-size:11px!important;}",

            ".request-purpose{margin-top:7px!important;color:rgba(255,255,255,.65)!important;font-size:11px!important;}",

            ".request-message{margin-top:8px!important;padding:9px!important;border-radius:9px!important;background:rgba(0,0,0,.2)!important;color:rgba(255,255,255,.55)!important;font-size:11px!important;line-height:1.5!important;}",

            ".request-status{white-space:nowrap!important;padding:6px 10px!important;border-radius:50px!important;font-size:10px!important;font-weight:700!important;}",

            ".request-status.pending{color:#ffd166!important;background:rgba(255,209,102,.08)!important;}",

            ".request-status.accepted{color:#00f5d4!important;background:rgba(0,245,212,.08)!important;}",

            ".request-status.declined{color:#ff6b81!important;background:rgba(255,107,129,.08)!important;}",

            ".incoming-actions{display:flex!important;gap:8px!important;flex-shrink:0!important;}",

            ".request-accept,.request-decline{padding:8px 12px!important;border-radius:9px!important;cursor:pointer!important;font-size:11px!important;font-weight:700!important;}",

            ".request-accept{border:1px solid rgba(0,245,212,.3)!important;background:rgba(0,245,212,.08)!important;color:#00f5d4!important;}",

            ".request-decline{border:1px solid rgba(255,107,129,.25)!important;background:rgba(255,107,129,.06)!important;color:#ff8b9a!important;}",

            ".empty-requests{padding:20px!important;text-align:center!important;color:rgba(255,255,255,.35)!important;font-size:12px!important;}"

        ].join("\n");


        document.head.appendChild(style);

    }


    addModalStyles();


    /* =====================================================
       CONNECTION MODAL
    ===================================================== */

    function openConnectionModal(student) {

        var oldModal =
            document.querySelector(
                ".connection-modal"
            );

        if (oldModal) {
            oldModal.remove();
        }


        var shared =
            student.interests.filter(
                function (interest) {

                    return (
                        selectedInterests.indexOf(
                            interest
                        ) !== -1
                    );

                }
            );


        var sharedHTML = "";


        shared.forEach(function (interest) {

            sharedHTML +=
                '<span class="shared-tag">' +
                interest +
                '</span>';

        });


        if (!sharedHTML) {

            sharedHTML =
                '<span class="shared-tag">Shared interests</span>';

        }


        var modal =
            document.createElement("div");

        modal.className =
            "connection-modal";


        modal.innerHTML =

            '<div class="connection-modal-backdrop"></div>' +

            '<div class="connection-modal-box">' +

                '<button class="modal-close" type="button">×</button>' +

                '<div class="modal-mini-label">UNSEEN CONNECTION</div>' +

                '<div class="modal-person">' +

                    '<div class="modal-avatar">' +
                        student.name.charAt(0) +
                    '</div>' +

                    '<div>' +

                        '<h2>' +
                            student.name +
                        '</h2>' +

                        '<p>' +
                            student.branch +
                        '</p>' +

                    '</div>' +

                '</div>' +

                '<div class="shared-box">' +

                    '<span>SHARED INTERESTS</span>' +

                    '<div class="shared-tags">' +
                        sharedHTML +
                    '</div>' +

                '</div>' +

                '<label class="modal-label">' +
                    'WHY DO YOU WANT TO CONNECT?' +
                '</label>' +

                '<select id="connectionIntent">' +

                    '<option value="Project Partner">Project Partner</option>' +
                    '<option value="Hackathon Team">Hackathon Team</option>' +
                    '<option value="Learn Together">Learn Together</option>' +
                    '<option value="Find a Mentor">Find a Mentor</option>' +
                    '<option value="Join a Community">Join a Community</option>' +
                    '<option value="Just Connect">Just Connect</option>' +
                    '<option value="Other">Other</option>' +

                '</select>' +

                '<label class="modal-label">AI GENERATED MESSAGE</label>' +

                '<textarea id="connectionMessage"></textarea>' +

                '<div class="ai-note">' +
                    '✦ Gemini generates this message from your purpose and shared interests' +
                '</div>' +

                '<div class="modal-actions">' +

                    '<button class="modal-secondary" id="regenerateMessage" type="button">' +
                        '↻ Regenerate' +
                    '</button>' +

                    '<button class="modal-send" id="sendConnection" type="button">' +
                        'Send Request →' +
                    '</button>' +

                '</div>' +

            '</div>';


        document.body.appendChild(modal);


        var intent =
            modal.querySelector(
                "#connectionIntent"
            );

        var message =
            modal.querySelector(
                "#connectionMessage"
            );

        var regenerateButton =
            modal.querySelector(
                "#regenerateMessage"
            );

        var sendButton =
            modal.querySelector(
                "#sendConnection"
            );


        async function updateMessageWithGemini() {

            message.value =
                "✦ Gemini is generating your message...";

            message.disabled = true;
            regenerateButton.disabled = true;
            sendButton.disabled = true;


            try {

                var generatedMessage =
                    await generateGeminiMessage(
                        student,
                        intent.value
                    );

                message.value =
                    generatedMessage;

            } catch (error) {

                console.error(
                    "Gemini generation error:",
                    error
                );

                message.value =
                    generateMessage(
                        student,
                        intent.value
                    );

            } finally {

                message.disabled = false;
                regenerateButton.disabled = false;
                sendButton.disabled = false;

            }

        }


        updateMessageWithGemini();


        intent.addEventListener(
            "change",
            function () {

                updateMessageWithGemini();

            }
        );


        regenerateButton.addEventListener(
            "click",
            function () {

                updateMessageWithGemini();

            }
        );


        sendButton.addEventListener(
            "click",
            function () {

                if (!message.value.trim()) {

                    showNotification(
                        "Please enter a message.",
                        "MESSAGE REQUIRED"
                    );

                    return;

                }


                sendConnectionRequest(
                    student,
                    intent.value,
                    message.value.trim()
                );

            }
        );


        modal.querySelector(
            ".modal-close"
        ).addEventListener(
            "click",
            closeConnectionModal
        );


        modal.querySelector(
            ".connection-modal-backdrop"
        ).addEventListener(
            "click",
            closeConnectionModal
        );


        setTimeout(function () {

            modal.classList.add("show");

        }, 30);

    }


    function closeConnectionModal() {

        var modal =
            document.querySelector(
                ".connection-modal"
            );

        if (!modal) {
            return;
        }


        modal.classList.remove("show");


        setTimeout(function () {

            if (modal.parentNode) {
                modal.remove();
            }

        }, 250);

    }


    /* =====================================================
       SEND CONNECTION REQUEST
    ===================================================== */

    function sendConnectionRequest(
        student,
        intent,
        message
    ) {

        var exists =
            sentRequests.some(
                function (request) {

                    return (
                        request.student === student.name &&
                        request.status === "pending"
                    );

                }
            );


        if (exists) {

            showNotification(
                "You already have a pending request with " +
                student.name + ".",
                "REQUEST ALREADY SENT"
            );

            return;

        }


        var shared =
            student.interests.filter(
                function (interest) {

                    return (
                        selectedInterests.indexOf(
                            interest
                        ) !== -1
                    );

                }
            );


        var request = {

            id: Date.now(),

            student: student.name,

            branch: student.branch,

            interests: student.interests,

            shared: shared,

            intent: intent,

            message: message,

            status: "pending",

            date:
                new Date().toLocaleDateString(),

            time:
                new Date().toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                )

        };


        sentRequests.push(request);

        saveRequests();

        closeConnectionModal();


        setTimeout(function () {

            renderRequestPanels();

            showNotification(
                "Your connection request was sent to " +
                student.name + ".",
                "REQUEST SENT"
            );

        }, 300);

    }


    /* =====================================================
       INCOMING REQUEST RESPONSE
    ===================================================== */

    function updateIncomingRequest(
        id,
        status
    ) {

        var request = null;


        for (
            var i = 0;
            i < incomingRequests.length;
            i++
        ) {

            if (
                incomingRequests[i].id === id
            ) {

                request =
                    incomingRequests[i];

                break;

            }

        }


        if (!request) {
            return;
        }


        if (status === "declined") {

            incomingRequests =
                incomingRequests.filter(
                    function (item) {

                        return item.id !== id;

                    }
                );


            saveRequests();

            renderRequestPanels();


            showNotification(
                "You declined the request from " +
                request.student + ".",
                "REQUEST DECLINED"
            );

            return;

        }


        request.status =
            "accepted";


        saveRequests();

        renderRequestPanels();


        showNotification(
            "You are now connected with " +
            request.student + ".",
            "REQUEST ACCEPTED"
        );

    }


    /* =====================================================
       STATUS
    ===================================================== */

    function getStatusIcon(status) {

        if (status === "accepted") {
            return "✓";
        }

        if (status === "declined") {
            return "×";
        }

        return "◌";

    }


    function capitalize(text) {

        return (
            text.charAt(0).toUpperCase() +
            text.slice(1)
        );

    }


    /* =====================================================
       REQUEST PANELS
    ===================================================== */

    function renderRequestPanels() {

        if (!matchArea) {
            return;
        }


        var old =
            matchArea.querySelector(
                ".unseen-request-dashboard"
            );


        if (old) {
            old.remove();
        }


        var dashboard =
            document.createElement("div");


        dashboard.className =
            "unseen-request-dashboard";


        var sentHTML =

            '<div class="request-panel">' +

                '<div class="request-panel-header">' +

                    '<div>' +

                        '<div class="request-panel-label">' +
                            'MY NETWORK' +
                        '</div>' +

                        '<h3>My Requests</h3>' +

                        '<p class="request-panel-subtitle">' +
                            'People you have sent connection requests to.' +
                        '</p>' +

                    '</div>' +

                    '<div class="request-count">' +
                        sentRequests.length +
                    '</div>' +

                '</div>';


        if (sentRequests.length === 0) {

            sentHTML +=

                '<div class="empty-requests">' +
                    'You have not sent any requests yet.' +
                '</div>';

        } else {

            sentRequests.forEach(
                function (request) {

                    sentHTML +=

                        '<div class="request-card">' +

                            '<div class="request-avatar">' +
                                request.student.charAt(0) +
                            '</div>' +

                            '<div class="request-main">' +

                                '<div class="request-name">' +
                                    request.student +
                                '</div>' +

                                '<div class="request-branch">' +
                                    request.branch +
                                '</div>' +

                                '<div class="request-purpose">' +
                                    'Purpose: ' +
                                    request.intent +
                                '</div>' +

                                '<div class="request-message">' +
                                    request.message +
                                '</div>' +

                            '</div>' +

                            '<div class="request-status ' +
                                request.status +
                            '">' +

                                getStatusIcon(
                                    request.status
                                ) +

                                ' ' +

                                capitalize(
                                    request.status
                                ) +

                            '</div>' +

                        '</div>';

                }
            );

        }


        sentHTML +=
            '</div>';


        var incomingHTML =

            '<div class="request-panel">' +

                '<div class="request-panel-header">' +

                    '<div>' +

                        '<div class="request-panel-label">' +
                            'DISCOVERED YOU' +
                        '</div>' +

                        '<h3>Incoming Requests</h3>' +

                        '<p class="request-panel-subtitle">' +
                            'People who want to connect with you.' +
                        '</p>' +

                    '</div>' +

                    '<div class="request-count">' +
                        incomingRequests.length +
                    '</div>' +

                '</div>';


        if (incomingRequests.length === 0) {

            incomingHTML +=

                '<div class="empty-requests">' +
                    'No incoming requests yet.' +
                '</div>';

        } else {

            incomingRequests.forEach(
                function (request) {

                    incomingHTML +=

                        '<div class="request-card">' +

                            '<div class="request-avatar">' +
                                request.student.charAt(0) +
                            '</div>' +

                            '<div class="request-main">' +

                                '<div class="request-name">' +
                                    request.student +
                                '</div>' +

                                '<div class="request-branch">' +
                                    request.branch +
                                '</div>' +

                                '<div class="request-purpose">' +
                                    'Wants to connect for: ' +
                                    request.intent +
                                '</div>' +

                                '<div class="request-message">' +
                                    '"' +
                                    request.message +
                                    '"' +
                                '</div>' +

                            '</div>';


                    if (request.status === "pending") {

                        incomingHTML +=

                            '<div class="incoming-actions">' +

                                '<button class="request-accept" data-id="' +
                                    request.id +
                                    '" type="button">' +

                                    '✓ Accept' +

                                '</button>' +

                                '<button class="request-decline" data-id="' +
                                    request.id +
                                    '" type="button">' +

                                    '× Decline' +

                                '</button>' +

                            '</div>';

                    } else {

                        incomingHTML +=

                            '<div class="request-status ' +
                                request.status +
                            '">' +

                                getStatusIcon(
                                    request.status
                                ) +

                                ' ' +

                                capitalize(
                                    request.status
                                ) +

                            '</div>';

                    }


                    incomingHTML +=
                        '</div>';

                }
            );

        }


        incomingHTML +=
            '</div>';


        dashboard.innerHTML =
            sentHTML +
            incomingHTML;


        matchArea.appendChild(
            dashboard
        );


        dashboard
            .querySelectorAll(
                ".request-accept"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            updateIncomingRequest(
                                Number(
                                    button.getAttribute(
                                        "data-id"
                                    )
                                ),
                                "accepted"
                            );

                        }
                    );

                }
            );


        dashboard
            .querySelectorAll(
                ".request-decline"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            updateIncomingRequest(
                                Number(
                                    button.getAttribute(
                                        "data-id"
                                    )
                                ),
                                "declined"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       FIND MATCHES
    ===================================================== */

    if (
        matchButton &&
        matchArea
    ) {

        matchButton.addEventListener(
            "click",
            function () {

                if (!validateProfile()) {
                    return;
                }


                var matches = [];


                students.forEach(
                    function (student) {

                        var common =
                            student.interests.filter(
                                function (interest) {

                                    return (
                                        selectedInterests.indexOf(
                                            interest
                                        ) !== -1
                                    );

                                }
                            );


                        if (common.length > 0) {

                            matches.push({

                                name:
                                    student.name,

                                branch:
                                    student.branch,

                                interests:
                                    student.interests,

                                common:
                                    common

                            });

                        }

                    }
                );


                matches.sort(
                    function (a, b) {

                        return (
                            b.common.length -
                            a.common.length
                        );

                    }
                );


                if (matches.length === 0) {

                    matchArea.innerHTML =

                        '<div class="match-icon">✨</div>' +

                        '<h3>No connections found yet</h3>' +

                        '<p>' +
                            'Try selecting a few different interests.' +
                        '</p>';

                    return;

                }


                var html =

                    '<div class="network-title">' +

                        '<span class="network-dot"></span>' +

                        '<div>' +

                            '<h3>Your hidden connections</h3>' +

                            '<p>' +
                                'Shared interests create unexpected connections.' +
                            '</p>' +

                        '</div>' +

                    '</div>' +

                    '<div class="connection-network">' +

                        '<div class="you-node">' +

                            '<div class="node-ring"></div>' +

                            '<div class="node-core">YOU</div>' +

                        '</div>' +

                        '<div class="connection-lines"></div>' +

                        '<div class="student-branches">';


                matches
                    .slice(0, 5)
                    .forEach(
                        function (student) {

                            var branches = "";


                            student.interests.forEach(
                                function (interest) {

                                    var shared =
                                        selectedInterests.indexOf(
                                            interest
                                        ) !== -1;


                                    branches +=

                                        '<div class="branch">' +

                                            '<span class="branch-line"></span>' +

                                            '<span class="branch-dot"></span>' +

                                            '<span class="' +

                                                (
                                                    shared
                                                        ? "shared-interest"
                                                        : ""
                                                ) +

                                            '">' +

                                                interest +

                                            '</span>' +

                                        '</div>';

                                }
                            );


                            var percentage =
                                Math.round(
                                    (
                                        student.common.length /
                                        selectedInterests.length
                                    ) * 100
                                );


                            if (percentage > 100) {
                                percentage = 100;
                            }


                            html +=

                                '<div class="student-node-wrapper">' +

                                    '<div class="main-connection"></div>' +

                                    '<div class="student-node">' +

                                        '<div class="student-circle">' +
                                            student.name.charAt(0) +
                                        '</div>' +

                                        '<div class="student-name">' +
                                            student.name +
                                        '</div>' +

                                        '<div class="student-branch">' +
                                            student.branch +
                                        '</div>' +

                                        '<div class="match-percentage">' +
                                            percentage +
                                            '% MATCH' +
                                        '</div>' +

                                        '<button class="connect-button" ' +
                                            'data-student="' +
                                            student.name +
                                            '" type="button">' +

                                            'Connect →' +

                                        '</button>' +

                                    '</div>' +

                                    '<div class="student-information">' +
                                        branches +
                                    '</div>' +

                                '</div>';

                        }
                    );


                html +=

                        '</div>' +

                    '</div>' +

                    '<div class="network-legend">' +

                        '<span>' +

                            '<i class="legend-shared"></i>' +

                            ' Shared interest' +

                        '</span>' +

                        '<span>' +

                            '<i class="legend-node"></i>' +

                            ' Student connection' +

                        '</span>' +

                    '</div>';


                matchArea.innerHTML =
                    html;


                var connectButtons =
                    matchArea.querySelectorAll(
                        ".connect-button"
                    );


                connectButtons.forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                var name =
                                    button.getAttribute(
                                        "data-student"
                                    );


                                var student = null;


                                students.forEach(
                                    function (item) {

                                        if (
                                            item.name === name
                                        ) {

                                            student = item;

                                        }

                                    }
                                );


                                if (student) {

                                    openConnectionModal(
                                        student
                                    );

                                }

                            }
                        );

                    }
                );


                renderRequestPanels();


                showNotification(
                    "Your profile is ready. We found your hidden connections!",
                    "MATCHES FOUND"
                );


                setTimeout(
                    function () {

                        matchArea.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    },
                    100
                );

            }
        );

    }


    /* =====================================================
       COMMUNITY BUTTONS
    ===================================================== */

    var communityButtons =
        document.querySelectorAll(
            ".community-button"
        );


    communityButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.classList.contains(
                            "joined"
                        )
                    ) {

                        button.classList.remove(
                            "joined"
                        );

                        button.textContent =
                            "Join Community →";


                        showNotification(
                            "You left the community.",
                            "COMMUNITY"
                        );

                    } else {

                        button.classList.add(
                            "joined"
                        );

                        button.textContent =
                            "✓ Joined";


                        showNotification(
                            "You joined the community successfully!",
                            "COMMUNITY JOINED"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       GDG × UNSEEN — CAMPUS PULSE
    ===================================================== */

    var gdgTopics = [

        "AI / ML Workshop",
        "Web Development",
        "Generative AI",
        "Cloud",
        "Android",
        "Hackathon"

    ];


    var gdgBaseData = {

        "AI / ML Workshop": 47,
        "Web Development": 38,
        "Generative AI": 34,
        "Cloud": 24,
        "Android": 21,
        "Hackathon": 42

    };


    var gdgBaseResponses = 53;


    /* =====================================================
       GET GDG DATA
    ===================================================== */

    function getGDGData() {

        var savedData =
            localStorage.getItem(
                "unseenGDGPulseData"
            );


        var savedResponses =
            localStorage.getItem(
                "unseenGDGPulseResponses"
            );


        var data;


        try {

            data =
                savedData
                    ? JSON.parse(savedData)
                    : JSON.parse(
                        JSON.stringify(
                            gdgBaseData
                        )
                    );

        } catch (error) {

            data =
                JSON.parse(
                    JSON.stringify(
                        gdgBaseData
                    )
                );

        }


        var responses =
            savedResponses
                ? Number(savedResponses)
                : gdgBaseResponses;


        return {
            data: data,
            responses: responses
        };

    }


    /* =====================================================
       SAVE GDG DATA
    ===================================================== */

    function saveGDGData(
        data,
        responses
    ) {

        localStorage.setItem(
            "unseenGDGPulseData",
            JSON.stringify(data)
        );


        localStorage.setItem(
            "unseenGDGPulseResponses",
            String(responses)
        );

    }


    /* =====================================================
       USER'S PREVIOUS VOTE
    ===================================================== */

    function getGDGUserVote() {

        var saved =
            localStorage.getItem(
                "unseenGDGUserVote"
            );


        if (!saved) {
            return [];
        }


        try {

            return JSON.parse(saved);

        } catch (error) {

            return [];

        }

    }


    /* =====================================================
       GDG OPTION BUTTONS
    ===================================================== */

    function initializeGDGOptions() {

        var buttons =
            document.querySelectorAll(
                ".gdg-option"
            );


        buttons.forEach(
            function (button) {

                button.classList.remove("active");


                var plus =
                    button.querySelector(
                        "span:last-child"
                    );


                if (plus) {
                    plus.textContent = "+";
                }


                button.addEventListener(
                    "click",
                    function () {

                        button.classList.toggle(
                            "active"
                        );


                        var plus =
                            button.querySelector(
                                "span:last-child"
                            );


                        if (
                            button.classList.contains(
                                "active"
                            )
                        ) {

                            if (plus) {
                                plus.textContent = "✓";
                            }

                        } else {

                            if (plus) {
                                plus.textContent = "+";
                            }

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       RENDER GDG STATS
    ===================================================== */

    function renderGDGStats() {

        var stats =
            document.getElementById(
                "gdgStats"
            );


        var total =
            document.getElementById(
                "gdgTotalResponses"
            );


        if (!stats) {
            return;
        }


        var gdg =
            getGDGData();


        stats.innerHTML = "";


        var topics = [];


        for (var topic in gdg.data) {

            topics.push({

                name: topic,

                count:
                    gdg.data[topic]

            });

        }


        topics.sort(
            function (a, b) {

                return (
                    b.count -
                    a.count
                );

            }
        );


        topics.forEach(
            function (item) {

                var percentage = 0;


                if (gdg.responses > 0) {

                    percentage =
                        Math.round(
                            (
                                item.count /
                                gdg.responses
                            ) * 100
                        );

                }


                var row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "gdg-stat-row";


                row.innerHTML =

                    '<div class="gdg-stat-info">' +

                        '<span class="gdg-stat-name">' +
                            item.name +
                        '</span>' +

                    '</div>' +

                    '<div class="gdg-stat-bar">' +

                        '<span style="width:' +
                            Math.min(
                                percentage,
                                100
                            ) +
                        '%"></span>' +

                    '</div>' +

                    '<strong class="gdg-stat-percent">' +
                        percentage +
                        '%' +
                    '</strong>';


                stats.appendChild(
                    row
                );

            }
        );


        if (total) {

            total.textContent =
                gdg.responses;

        }

    }


    /* =====================================================
       SUBMIT GDG INTEREST
    ===================================================== */

    function submitGDGPulse() {

        var buttons =
            document.querySelectorAll(
                ".gdg-option"
            );


        var selectedTopics = [];


        buttons.forEach(
            function (button) {

                if (
                    button.classList.contains(
                        "active"
                    )
                ) {

                    selectedTopics.push(
                        button.getAttribute(
                            "data-gdg-interest"
                        )
                    );

                }

            }
        );


        if (selectedTopics.length === 0) {

            showNotification(
                "Select at least one topic first.",
                "NO INTEREST SELECTED"
            );

            return;

        }


        var previousVote =
            getGDGUserVote();


        var gdg =
            getGDGData();


        if (previousVote.length > 0) {

            previousVote.forEach(
                function (topic) {

                    if (
                        typeof gdg.data[topic] ===
                            "number" &&
                        gdg.data[topic] > 0
                    ) {

                        gdg.data[topic]--;

                    }

                }
            );

        } else {

            gdg.responses++;

        }


        selectedTopics.forEach(
            function (topic) {

                if (
                    typeof gdg.data[topic] !==
                    "number"
                ) {

                    gdg.data[topic] = 0;

                }


                gdg.data[topic]++;

            }
        );


        localStorage.setItem(
            "unseenGDGUserVote",
            JSON.stringify(
                selectedTopics
            )
        );


        saveGDGData(
            gdg.data,
            gdg.responses
        );


        renderGDGStats();


        var submitButton =
            document.querySelector(
                ".gdg-submit-interest"
            );


        if (submitButton) {

            submitButton.textContent =
                "✓ Interest Added";

            submitButton.disabled =
                true;


            setTimeout(
                function () {

                    submitButton.textContent =
                        "Update My Interests →";

                    submitButton.disabled =
                        false;

                },
                1800
            );

        }


        showNotification(
            "Your interests have been added to the campus pulse.",
            "GDG PULSE UPDATED"
        );

    }


    /* =====================================================
       GDG EVENT
    ===================================================== */

    var gdgEvent = {

        name:
            "GDG AI Build Night",

        date:
            "20 September 2026",

        time:
            "2:00 PM – 5:00 PM",

        venue:
            "PUSSGRC Campus"

    };


    /* =====================================================
       EVENT REGISTRATION
    ===================================================== */

    function registerForGDGEvent() {

        var nameInput =
            document.getElementById(
                "name"
            );


        if (
            !nameInput ||
            !nameInput.value.trim()
        ) {

            showNotification(
                "Please complete your profile first.",
                "PROFILE REQUIRED"
            );

            return;

        }


        var button =
            document.querySelector(
                ".gdg-register-button"
            );


        if (button) {

            button.textContent =
                "✓ You're Registered";

            button.disabled =
                true;

        }


        var success =
            document.getElementById(
                "gdgRegistrationSuccess"
            );


        if (success) {

            success.classList.add("show");

        }


        showNotification(
            "You are registered for " +
            gdgEvent.name + ".",
            "REGISTRATION CONFIRMED"
        );

    }


    /* =====================================================
       RESET REGISTRATION
    ===================================================== */

    function restoreGDGRegistration() {

        var button =
            document.querySelector(
                ".gdg-register-button"
            );


        if (!button) {
            return;
        }


        button.textContent =
            "Register for Event";

        button.disabled =
            false;


        var success =
            document.getElementById(
                "gdgRegistrationSuccess"
            );


        if (success) {

            success.classList.remove(
                "show"
            );

        }

    }


    /* =====================================================
       INITIALIZE GDG
    ===================================================== */

    function initializeGDGSection() {

        initializeGDGOptions();

        renderGDGStats();

        restoreGDGRegistration();


        var submitButton =
            document.querySelector(
                ".gdg-submit-interest"
            );


        if (submitButton) {

            submitButton.addEventListener(
                "click",
                submitGDGPulse
            );

        }


        var registerButton =
            document.querySelector(
                ".gdg-register-button"
            );


        if (registerButton) {

            registerButton.addEventListener(
                "click",
                registerForGDGEvent
            );

        }

    }


    initializeGDGSection();


    /* =====================================================
       DEMO INCOMING REQUESTS
    ===================================================== */

    if (incomingRequests.length === 0) {

        incomingRequests = [

            {
                id: 90001,

                student: "Riya",

                branch:
                    "CSE • 3rd Year",

                intent:
                    "Hackathon Team",

                message:
                    "Hey! I noticed that we both are interested in AI / ML and Hackathons. Would love to connect and maybe team up!",

                status:
                    "pending"
            },


            {
                id: 90002,

                student: "Aditya",

                branch:
                    "ECE • 2nd Year",

                intent:
                    "Project Partner",

                message:
                    "Hi! I think our interests could make a great combination for a project. Would love to connect and discuss some ideas.",

                status:
                    "pending"
            }

        ];


        saveRequests();

    }

});