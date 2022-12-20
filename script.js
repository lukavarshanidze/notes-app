const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));
if(notes) {
    notes.forEach((note) => {
        notesFunction(note);
    });
}

addBtn.addEventListener("click", () => {
    notesFunction();
});

function notesFunction(text = ""){

    const div = document.createElement("div");
    div.classList.add("notes");
    div.innerHTML = `
    <div class="btns">
        <button class="editBtn"><i class="fas fa-edit"></i></button>
        <button class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `;
    const editBtn = div.querySelector(".editBtn");
    const deleteBtn = div.querySelector(".deleteBtn");
    const main = div.querySelector(".main");
    const textArea = div.querySelector("textarea");
    

        textArea.value = text;
        main.innerHTML = marked(text);

    


    editBtn.addEventListener("click", () => {
        textArea.classList.toggle("hidden");
        main.classList.toggle("hidden");
    });
    deleteBtn.addEventListener("click", () => {
        div.remove();
        updateLs();
    });
    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLs();
    });

    document.body.appendChild(div);
}

function updateLs(){

    const texts = document.querySelectorAll('textarea');
    const notes = [];
    texts.forEach((text) => {
        notes.push(text.value)
    });
    localStorage.setItem("notes", JSON.stringify(notes))
}


