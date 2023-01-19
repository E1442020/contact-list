let insertContactName = document.querySelector(
  ".insertContactName"
) as HTMLInputElement;
let insertContactNumber = document.querySelector(
  ".insertContactNumber"
) as HTMLInputElement;
let form = document.querySelector("form") as HTMLFormElement;
let contactName = document.querySelector("h3") as HTMLHeadingElement;
let contactNumber = document.querySelector("p") as HTMLParagraphElement;
let contactList = document.querySelector(".contact-list") as HTMLDivElement;
let btnList = document.querySelector(".btn-list") as HTMLButtonElement;
let alreadyExist = document.querySelector(
  ".already-exist"
) as HTMLParagraphElement;
let removeContacts =
  document.querySelectorAll<HTMLDivElement>(".remove-contact");
  let displayContact= document.querySelector('.display-contact') as HTMLParagraphElement;


interface Contact {
  id: number;
  contactNamee: string;
  contactNumberr: string;
}

const checkContactInfo = (): Contact[] => {
  let info = localStorage.getItem("contactInfo");
  if (info === null) {
    return [];
  }
  return JSON.parse(info);
};

let contactArr: Contact[] = checkContactInfo();


let setContactToLocalStorage = () => {
  localStorage.setItem("contactInfo", JSON.stringify(contactArr));
  
};

let checkContactInformation = () => {
if(contactArr.length <= 0){
  displayContact.innerHTML='No contact information available';
}else{
  displayContact.style.display='none';
}}
  
checkContactInformation()




let checkValue = () => {
  if (
    insertContactName?.value.trim() == "" ||
    insertContactNumber?.value == null
  )
    return;
  const newContact: Contact = {
    id: contactArr.length,
    contactNamee: insertContactName.value,
    contactNumberr: insertContactNumber.value,
  };
  contactArr.push(newContact);
  setContactToLocalStorage();
  
  addNewContact(newContact);

  // return newContact.id
};



let addNewContact = (contact: Contact) => {
  let content=''

  content += `
        <div class="contact-content">
        <div class="contact-info">
            <h3>${contact.contactNamee}</h3>
            <p>${contact.contactNumberr}</p>
        </div>
        <div class="remove-contact">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>

        `;
  contactList.innerHTML += content;

  
  

  let removeContacts =
    document.querySelectorAll<HTMLButtonElement>(".remove-contact");

  removeContacts.forEach((r) => {
    r.addEventListener("click", () => {
        console.log(contactArr)
        console.log(contact.id)
      contactArr.map((i,index) => {
        if (i.id == contact.id) {
          // let index = contactArr.indexOf(contact);
          contactArr.splice(index, 1);
          console.log("remove");

        }
      });
      setContactToLocalStorage();


    });

  });

};

contactArr.forEach(addNewContact);


form.addEventListener("submit", (e) => {
  // e.preventDefault();
  checkValue();


  insertContactName.value = "";
  insertContactNumber.value = "";
});

// localStorage.clear();
