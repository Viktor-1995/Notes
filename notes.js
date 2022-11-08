const createBtn = document.querySelector(".create-note");
const noteText = document.querySelector(".noteText");
const noteTitle = document.querySelector(".noteTitle");
const dateOfToday = document.getElementById("todayDate");
let wrapNotes = document.querySelector(".wrap-notes");
let changeName = document.querySelector(".change-name");
let modal = document.querySelector(".ask-modal");
let named = document.querySelector(".name");
let postsArray = [];
let loadedNotes = [];

dateOfToday.innerText =
    "Today is a " + new Date().toLocaleDateString("en-GB").replace(/\//gi, ".");

// localStorage.clear();

class Note {
    constructor(title, text, date) {
        this.title = title;
        this.text = text;
        this.date = date ? date : new Date().toLocaleDateString();
        this.render();
    }
    render() {
        var div = document.createElement("div");
        div.className = "note " + this.title;
        div.innerHTML = `
        <div class="header-note">
        <div class='close ${this.title}' title='Close'></div>
        <input class="title-note" placeholder="WriteTitle" value='${this.title}'>
        <h4 class="date-note">${this.date}</h4>
        </div>
        <div class="header-main">
            <textarea>${this.text}</textarea>
        </div> `;
        wrapNotes.appendChild(div);
    }
}

// if (localStorage.length) {
loadedNotes = JSON.parse(localStorage.getItem("Notes"));
loadedName = JSON.parse(localStorage.getItem("Name"));
if (loadedName) {
    named.innerText = loadedName;
    localStorage.setItem("Name", JSON.stringify(loadedName));
} else {
    modal.style.display = "block";
}
if (loadedNotes) {
    postsArray = loadedNotes;
    console.log(loadedNotes);
    for (var i = 0; i < loadedNotes.length; i++) {
        var newNote = new Note(
            loadedNotes[i].title,
            loadedNotes[i].text,
            loadedNotes[i].date
        );
    }
    localStorage.setItem("Notes", JSON.stringify(postsArray));
}
// }

createBtn.addEventListener("click", (e) => {
    var newNote = new Note(noteTitle.value, noteText.value);
    postsArray.push(newNote);
    noteTitle.value = "";
    noteText.value = "";
    localStorage.setItem("Notes", JSON.stringify(postsArray));
});

wrapNotes.addEventListener("click", (e) => {
    if (!e.target.className.includes("close")) {
        return;
    }
    console.log(postsArray);
    let classToClose = e.target.className;
    postsArray.filter((obj, index) => {
        if (classToClose.includes(obj.title)) {
            console.log(obj.title);
            console.log(index);
            postsArray.splice(index, 1);
        }
    });
    console.log(postsArray.length);

    localStorage.setItem("Notes", JSON.stringify(postsArray));
    window.location.reload();
});

let nameInput = document.querySelector(".ask-name");

changeName.addEventListener("click", (e) => {
    modal.style.display = "block";
});
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
const setName = document.querySelector(".set-name");
setName.addEventListener("click", (e) => {
    let name = document.querySelector(".name");
    name.innerText = nameInput.value;
    localStorage.setItem("Name", JSON.stringify(nameInput.value));
    console.log(nameInput.value);
    modal.style.display = "none";
});
