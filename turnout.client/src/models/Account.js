export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.sponsorName = data.sponsorName
    this.sponsorImgUrl = data.sponsorImgUrl
    this.sponsorColor = data.sponsorColor
    // TODO add additional properties if needed
  }
}
