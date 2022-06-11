import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "heart" ]

  LikeOrUnlike() {
    this.heartTarget.classList.toggle('not-favorited-heart');
    this.heartTarget.classList.toggle('favorited-heart');
  }
}
