

export interface IUser extends Document {
  name: string;
  nameUser: string;
  email: string;
  country?: string;
  city?: string;
  address?: string;
  password: string;
  rolUser: string;
  phone?: number;
  clientId: string;
  clientSecret: string;
  encriptionKey?: string;
  createdDate: Date;
  lastModifiedDate: Date;
}
  