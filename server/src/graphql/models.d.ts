export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};









export type IAuthenticationData = {
  id: Scalars['ID'];
  user: Maybe<IUser>;
  login: Scalars['String'];
  password: Scalars['String'];
  isActive: Maybe<Scalars['Boolean']>;
  activationCode: Maybe<Scalars['String']>;
  tokens: Maybe<Array<IToken>>;
};

export type IToken = {
  id: Scalars['ID'];
  user: IUser;
  ip: Scalars['String'];
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type IUser = {
  id: Scalars['ID'];
  nickname: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  authenticationData: IAuthenticationData;
};

export type IAdditionalEntityFields = {
  path: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

import { ObjectId } from 'mongoose';
export type IAuthenticationDataSchema = {
  _id: ObjectId,
  user: Maybe<IUserSchema['_id']>,
  login: string,
  password: string,
  isActive: Maybe<boolean>,
  activationCode: Maybe<string>,
  tokens: Maybe<Array<ITokenSchema['_id']>>,
};

export type ITokenSchema = {
  _id: ObjectId,
  user: IUserSchema['_id'],
  ip: string,
  accessToken: string,
  refreshToken: string,
};

export type IUserSchema = {
  _id: ObjectId,
  nickname: string,
  fullName: string,
  email: string,
  authenticationData: IAuthenticationDataSchema['_id'],
};
