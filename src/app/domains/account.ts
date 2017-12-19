export class Account {

  public urn: string;
  public name: string;
  public description: string;
  public locality: string;
  public facebookId: string;
  public instagramId: string;
  public linkedInId: string;
  public twitterId: string;
  public profileImageUrl: string;
  
  constructor(data?: any) {
    if (data) {
      this.urn = data.urn;
      this.name = data.name;    
      this.description = data.description
      this.locality = data.locality;
      this.facebookId = data.facebookId;
      this.instagramId = data.instagramId;
      this.linkedInId = data.linkedInId;
      this.twitterId = data.twitterId;
      this.profileImageUrl = data.profileImageUrl;
    }
  }

}