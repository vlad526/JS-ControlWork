let Add = document.getElementById("addButton")
Add.onclick = function Add() {
    const inputBox = document.getElementById("inputBox");
    const input = inputBox.value.trim();
    const List = document.getElementById("List");

    //Перевірка на пробіли в середені слова
    if (/\s/.test(input)) {
        alert("Input cannot have spaces.");
        inputBox.value = "";
    }
    //Перевіряється чи в name лише англ. букви та цифри, ігноруємо пробіли перед і після = , перевіряємо чи в value лише англ. букви та цифри
    const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/;
    const match = input.match(regex);

    if (!match) {
        alert("Use only numbers or letters.");
    }
    //видаляю пробіли з кінця та початку значень
    const name = match[1].trim();
    const value = match[2].trim();

    //Створюємо li в якому будуть name та value
    const li = document.createElement("li");
    li.textContent = `${name}=${value}`;


    //Функція яка допомагає обрати що видалити
    li.addEventListener("click", () => {
        li.classList.toggle("selected");

        if (li.classList.contains("selected")) {
            li.style.backgroundColor = "#7fa3b8";
        } else {
            li.style.backgroundColor = "white";
        }

    });

    List.appendChild(li);
    inputBox.value = "";
}

//Функція сортування для value та name
function sortList(type) {

    const List = document.getElementById("List");
    const items = Array.from(List.children);

    items.sort((a, b) => {
        //Витягуємо name і value за допомогою split
        const [nameA, valueA] = a.textContent.split("=");
        const [nameB, valueB] = b.textContent.split("=");

        let fieldA;
        let fieldB;

        //Визначаємо що буде сортуватись name або value
        if (type === "name") {
            fieldA = nameA
            fieldB = nameB
        } else {
            fieldA = valueA
            fieldB = valueB
        }

        //Порівнюємо
        let Compare = fieldA.localeCompare(fieldB);
        return Compare;
    });

    //Очищаємо список і додаємо відсортований список назад
    List.innerHTML = "";
    items.forEach(item => List.appendChild(item));
}
//Сортуємо по Value
const SortValue = document.getElementById("sortByValueButton")
SortValue.onclick = () => sortList("value");

//Сортуємо по Name
const SortName = document.getElementById("sortByNameButton")
SortName.onclick = () => sortList("name");


const Delete = document.getElementById("deleteButton")
//Функція видалення.Видаляє обрані нами елементи
Delete.onclick = function deleteSelected() {
    const List = document.getElementById("List");
    const selectedItems = Array.from(List.children).filter(item => item.classList.contains("selected"));
    selectedItems.forEach(item => item.remove());
}
