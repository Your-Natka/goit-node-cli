import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsArr = await listContacts();
      console.table(contactsArr);
      break;

    case "get":
      const contactObj = await getContactById(id);
      console.table(contactObj);
      break;

    case "add":
      const contactAdd = await addContact(name, email, phone);
      console.log(contactAdd);
      break;

    case "remove":
      const contactDel = await removeContact(id);
      console.log(contactDel);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
