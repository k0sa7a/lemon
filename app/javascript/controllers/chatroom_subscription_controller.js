import { Controller } from "@hotwired/stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static values = {
    chatroomId: Number,
    userName: String,
  };
  static targets = ["messages"];

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) => this.#insertMessageAndScrollDown(data) }
    );

    console.log(
      `Subscribe to the chatroom with the id ${this.chatroomIdValue}.`
    );
  }

  resetForm(event) {
    event.target.reset();
  }

  #insertMessageAndScrollDown(data) {
    let newData = "";
    if (data.includes(`<strong>${this.userNameValue}</strong>`)) {
      newData = data;
    } else {
      newData = data.replace("current-user-message", "other-user-message");
    }
    this.messagesTarget.insertAdjacentHTML("beforeend", newData);
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight);
  }

  disconnect() {
    console.log("Unsubscribed from the chatroom");
    this.channel.unsubscribe();
  }
}
