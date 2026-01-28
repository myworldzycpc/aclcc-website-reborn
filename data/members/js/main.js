
const membersContainer = document.querySelector("#members-container");
data.forEach(function (member) {
    const $member = document.createElement("div");
    $member.classList.add("member");
    $member.setAttribute("data-id", member.id);
    $member.innerHTML = `
            <img src="data/members/img/member/${member.id}.png" alt="${member.name}">
            <h2><p class="anti-strong">${member.name}</p></h2>
            <p>${member.desshort}</p>
            <p>${member.detail}</p>
        `;
    membersContainer.appendChild($member);
});

const members = document.querySelectorAll(".member");
let lastTimeout = 100;

members.forEach(function ($member) {
    $member.addEventListener("click", function () {
        const id = $member.getAttribute("data-id");
        const member = data.find(function (item) {
            return item.id === id;
        });
        const model = document.querySelector(".model");
        const modelContainer = document.querySelector(".model-container");
        model.querySelector(".model-content h2").textContent = member.name;
        model.querySelector(".model-content img").src = `data/members/img/member/${id}.png`;
        model.querySelector(".model-content .description").innerHTML = member.description;
        modelContainer.style.display = "block";
        modelContainer.style.opacity = "0";
        setTimeout(function () {
            modelContainer.style.opacity = "1";
            modelContainer.style.transition = "0.2s";
            model.style.transform = "translateY(10vh)";
            model.style.opacity = "0";
            model.style.transition = "0";
            model.style.display = "block";
            setTimeout(function () {
                model.style.transform = "translateY(0)";
                model.style.opacity = "1";
                model.style.transition = "0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)";
            }, 200);
        }, 1);
    });
    setTimeout(function () {
        $member.classList.add("show");
    }, lastTimeout);
    lastTimeout += 100;
});

function closeModel() {
    const model = document.querySelector(".model");
    const modelContainer = document.querySelector(".model-container");
    model.style.transform = "translateY(10vh)";
    model.style.opacity = "0";
    model.style.transition = "0.2s";
    setTimeout(function () {
        model.style.display = "none";
        modelContainer.style.opacity = "0";
        modelContainer.style.transition = "0.2s";
        setTimeout(function () {
            modelContainer.style.display = "none";
        }, 200);
    }, 200);
}

document.querySelector(".model-container").style.display = "none";

// 防止点击事件冒泡到model-container上，导致关闭
document.querySelectorAll(".model").forEach(function (item) {
    item.addEventListener("click", function (event) {
        event.stopPropagation();
    });
})