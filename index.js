"use strict";
let insertContactName = document.querySelector(".insertContactName");
let insertContactNumber = document.querySelector(".insertContactNumber");
let form = document.querySelector("form");
let contactName = document.querySelector("h3");
let contactNumber = document.querySelector("p");
let contactList = document.querySelector(".contact-list");
let btnList = document.querySelector(".btn-list");
let alreadyExist = document.querySelector(".already-exist");
let removeContacts = document.querySelectorAll(".remove-contact");
const checkContactInfo = () => {
    let info = localStorage.getItem("contactInfo");
    if (info === null) {
        return [];
    }
    return JSON.parse(info);
};
let contactArr = checkContactInfo();
let checkContactInformation = () => {
    let displayContact = document.querySelector('.display-contact');
    console.log(contactArr);
    if (contactArr.length == 0) {
        displayContact.style.display = 'block';
        console.log('if');
    }
    else {
        displayContact.style.display = 'none';
        console.log('else');
    }
};
checkContactInformation();
let setContactToLocalStorage = () => {
    localStorage.setItem("contactInfo", JSON.stringify(contactArr));
    checkContactInformation();
};
// localStorage.clear()
let checkValue = () => {
    if ((insertContactName === null || insertContactName === void 0 ? void 0 : insertContactName.value.trim()) == "" ||
        (insertContactNumber === null || insertContactNumber === void 0 ? void 0 : insertContactNumber.value) == null)
        return;
    let id;
    if (contactArr.length <= 0) {
        id = 1;
    }
    else {
        id = contactArr[contactArr.length - 1].id + 1;
    }
    const newContact = {
        id: id,
        contactNamee: insertContactName.value,
        contactNumberr: insertContactNumber.value,
    };
    contactArr.push(newContact);
    // console.log(contactArr)
    setContactToLocalStorage();
    addNewContact(newContact);
};
let addNewContact = (contact) => {
    let content = '';
    content += `
  
        <div class="contact-content">
        <div class="contact-info">
            <h3>${contact.contactNamee}</h3>
            <p>${contact.contactNumberr}</p>
        </div>
        <div class="icons">
            <i  data-id=${contact.id} class="fa-solid fa-trash  remove-contact"></i>
           <a href="tel:${contact.contactNumberr}"> <i class="fa-solid fa-phone  call-icon"></i></a>
        </div>
    </div>
    

        `;
    contactList.innerHTML += content;
    let removeContacts = document.querySelectorAll(".remove-contact");
    removeContacts.forEach((removeButton) => {
        removeButton.addEventListener("click", () => {
            // console.log(contactArr)
            contactArr.map((contactItem, index) => {
                let stringContactId = removeButton === null || removeButton === void 0 ? void 0 : removeButton.dataset.id;
                if (stringContactId !== undefined) {
                    let contactIdNumber = parseInt(stringContactId);
                    if (contactItem.id == contactIdNumber) {
                        contactArr.splice(index, 1);
                        let contactInfo = removeButton.closest('.contact-content');
                        if (contactInfo !== null) {
                            contactInfo.style.display = "none";
                        }
                        console.log("remove");
                    }
                }
            });
            // console.log(contactArr)
            checkContactInformation();
            setContactToLocalStorage();
        });
    });
};
contactArr.forEach(addNewContact);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkValue();
    insertContactName.value = "";
    insertContactNumber.value = "";
});
// localStorage.clear();
