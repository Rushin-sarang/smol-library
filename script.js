let bookqs = document.querySelector("#name");
let authorqs = document.querySelector("#author");
let pageqs = document.querySelector("#page");
let statusqs = document.querySelector("#status");
let formqs = document.querySelector("form").addEventListener("submit", onSubmit);
let dsqs = document.querySelector("#ds");
let table = document.querySelector("table").addEventListener("click", onClick);
let allBooks = [{title: "Berserk", author: "Kentaro Miura", pages:"600",stats: "Read"}];
let i=1;
let index;

function indexOf(targetName){
    for(let k=0;k<allBooks.length;k++){
        console.log(allBooks[k].title);
        if(allBooks[k].title === targetName){
            return k;
        }
    }
}

function ch(k){
    let newT;
    if(allBooks[k].stats === "Read"){
        newT = "Not Read";
    }else if(allBooks[k].stats === "Not Read"){
        newT = "Read";
    }
    allBooks[k] = {title: `${allBooks[k].title}`, author: `${allBooks[k].author}`, pages: `${allBooks[k].pages}`, stats: `${newT}`};
    clearForm();
    display(allBooks);
}

function del(k){
    allBooks.splice(k , k+1);
    clearForm();
    display(allBooks);
    i--;
}

function onClick(e){
    let targetName = e.target.parentNode.parentNode.childNodes[1].innerText;
    if(e.target.innerHTML === "Delete"){
        if (confirm(`You want to delete ${targetName}?`)){
            del(indexOf(targetName));
        }
    }
    if(e.target.classList.contains("st")){
        ch(indexOf(targetName));
    }
}

function onSubmit(e){
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    display(allBooks);
}

function clearForm(){
    bookqs.value = "";
    authorqs.value = "";
    pageqs.value = "";
    dsqs.innerHTML = "";
}

function addBookToLibrary(){
    allBooks[i] = new Book(bookqs.value, authorqs.value, pageqs.value, statusqs.value);    
    i++;
}

function display(allBooks){
    let j=0;
    for(j=0;j<allBooks.length;j++){
        let temp = `<tr> \n
        <td> ${allBooks[j].title} </td> \n
        <td> ${allBooks[j].author} </td> \n
        <td> ${allBooks[j].pages} </td> \n
        <td> <button class="st">${allBooks[j].stats}</button> </td> \n
        <td> <button id="del">Delete</button>`;
        dsqs.innerHTML += temp;
    }
}

function Book(title, author, pages, stats){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.stats = stats;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${stats}`;
    }
}
display(allBooks);  