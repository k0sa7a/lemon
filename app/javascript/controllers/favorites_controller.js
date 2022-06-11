import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "heart", "cardheart" ]

  LikeOrUnlike() {
    this.heartTarget.classList.toggle('not-favorited-heart');
    this.heartTarget.classList.toggle('favorited-heart');
    this.cardheartTarget.classList.toggle('not-favorited-cardheart');
    this.cardheartTarget.classList.toggle('favorited-heart');
  }
}
