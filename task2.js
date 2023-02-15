let inpName = document.querySelector("#inp-name");
let inpEmail = document.querySelector("#inp-email");
let inpImg = document.querySelector("#inp-img");
let inpPhone = document.querySelector("#inp-phone");
let resList = document.querySelector(".resWindow");

let btnDelete = document.querySelector("#delete");
let btnEdit = document.querySelector("#edit");
let btnSave = document.querySelector("#save");
// console.log(
//   inpEmail,
//   inpImg,
//   inpName,
//   inpPhone,
//   resList,
//   btnDelete,
//   btnEdit,
//   btnSave
// );

btnSave.addEventListener("click", () => {
  if (
    !inpName.value.trim() ||
    !inpEmail.value.trim() ||
    !inpImg.value.trim() ||
    !inpPhone.value.trim()
  ) {
    alert("заполните все поля");
    return;
  }
  let data = {
    userName: inpName.value,
    userMail: inpEmail.value,
    userImg: inpImg.value,
    userPhone: inpPhone.value,
  };
  changes(data);
  out();
  inpEmail.value = "";
  inpName.value = "";
  inpImg.value = "";
  inpPhone.value = "";
});

function changes(object) {
  resList.innerHTML = "";
  if (!localStorage.getItem("local-data")) {
    localStorage.setItem("local-data", "[]");
  }

  let newData = JSON.parse(localStorage.getItem("local-data"));
  newData.push(object);
  localStorage.setItem("local-data", JSON.stringify(newData));
  console.log(object);
}

function out() {
  let newData = JSON.parse(localStorage.getItem("local-data"));
  // console.log(newData);

  if (newData !== null) {
    resList.innerHTML = "";
    newData.forEach((item, index) => {
      let btnElementDelete = document.createElement("button");
      let btnElementEdit = document.createElement("button");

      btnElementDelete.innerText = "Delete contact";
      btnElementEdit.innerText = "Edit contact";
      let li = document.createElement("li");

      li.innerHTML = `<li>${item.userName}</li> <li>${item.userMail}</li> <img src=${item.userImg} alt="page"><li>${item.userPhone}</li>`;
      li.append(btnElementDelete);
      li.append(btnElementEdit);

      btnElementDelete.addEventListener("click", () => {
        deleteElement(index);
      });
      btnElementEdit.addEventListener("click", () => {
        editElement(index);
      });
      resList.append(li);
    });
  }
}
// ==================точечное удаление элемента start===============

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("local-data"));
  data.splice(index, 1);
  localStorage.setItem("local-data", JSON.stringify(data));
  out();
}

out();
//============================точечное удаление элемента end================
// edit кнопка старт=====================
//  вытащил edit
let mainModal = document.querySelector(".main-modal");
let inpEdit1 = document.querySelector(".inp-edit-1");
let inpEdit2 = document.querySelector(".inp-edit-2");
let inpEdit3 = document.querySelector(".inp-edit-3");
let inpEdit4 = document.querySelector(".inp-edit-4");

let btnClosser = document.querySelector(".btn-closer");
let btnSaveEdit = document.querySelector(".save-modal");
// console.log(
//   mainModal,
//   inpEdit1,
//   inpEdit2,
//   inpEdit3,
//   inpEdit4,
//   btnClosser,
//   btnSaveEdit
// );

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("local-data"));
  console.log(data);
  inpEdit1.value = data[index].userName;
  inpEdit2.value = data[index].userMail;
  inpEdit3.value = data[index].userImg;
  inpEdit4.value = data[index].userPhone;

  inpEdit1.setAttribute("id", index);
  inpEdit2.setAttribute("id", index);
  inpEdit3.setAttribute("id", index);
  inpEdit4.setAttribute("id", index);
}
btnClosser.addEventListener("click", () => {
  mainModal.style.display = "none";
  // edit кнопка конец=============
});
btnSaveEdit.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("local-data"));
  if (data !== null) {
    let index1Inp = inpEdit1.id;
    let index2Inp = inpEdit2.id;
    let index3Inp = inpEdit3.id;
    let index4Inp = inpEdit4.id;
    if (
      !inpEdit1.value.trim() ||
      !inpEdit2.value.trim() ||
      !inpEdit3.value.trim() ||
      !inpEdit4.value.trim()
    ) {
      alert("заполните поля");
      return;
    }
    let editedContact = {
      userName: inpEdit1.value,
      userMail: inpEdit2.value,
      userImg: inpEdit3.value,
      userPhone: inpEdit4.value,
    };

    data.splice(index1Inp, 1, editedContact);
    data.splice(index2Inp, 1, editedContact);
    data.splice(index3Inp, 1, editedContact);
    data.splice(index4Inp, 1, editedContact);

    localStorage.setItem("local-data", JSON.stringify(data));
    mainModal.style.display = "none";
  }
  console.log(data);
  out();
  console.log(btnSaveEdit);
});

//!===== кнопка общего удаления старт=========================

btnDelete.addEventListener("click", () => {
  resList.innerHTML = "";
  localStorage.clear();
});
out();
//!================== кнопка общего удаления конец==========================
