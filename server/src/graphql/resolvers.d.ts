import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticationData = {
  __typename?: 'AuthenticationData';
  id: Scalars['ID'];
  userID: Scalars['ID'];
  login: Scalars['String'];
  password: Scalars['String'];
  isActive: Maybe<Scalars['Boolean']>;
  activationCode: Maybe<Scalars['String']>;
  tokens: Maybe<Array<Token>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activate: Maybe<Scalars['Boolean']>;
  registration: Maybe<RegistrationOutput>;
};


export type MutationActivateArgs = {
  activationCode: Maybe<Scalars['String']>;
};


export type MutationRegistrationArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Maybe<Array<Maybe<User>>>;
  getToken: Maybe<AuthenticationData>;
  getUser: Maybe<User>;
};


export type QueryGetTokenArgs = {
  token: Maybe<Token>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type RegistrationOutput = {
  __typename?: 'RegistrationOutput';
  accessToken: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  password: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['ID'];
  userID: Scalars['ID'];
  ip: Scalars['String'];
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  nick: Scalars['String'];
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  city: Maybe<Scalars['String']>;
  phoneNumber: Maybe<Scalars['String']>;
  authenticationData: AuthenticationData;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthenticationData: ResolverTypeWrapper<AuthenticationData>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegistrationOutput: ResolverTypeWrapper<RegistrationOutput>;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthenticationData: AuthenticationData;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  RegistrationOutput: RegistrationOutput;
  Token: Token;
  User: User;
}>;

export type AuthenticationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticationData'] = ResolversParentTypes['AuthenticationData']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userID: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  login: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  activationCode: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens: Resolver<Maybe<Array<ResolversTypes['Token']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  activate: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationActivateArgs, never>>;
  registration: Resolver<Maybe<ResolversTypes['RegistrationOutput']>, ParentType, ContextType, RequireFields<MutationRegistrationArgs, 'email' | 'password'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllUsers: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getToken: Resolver<Maybe<ResolversTypes['AuthenticationData']>, ParentType, ContextType, RequireFields<QueryGetTokenArgs, never>>;
  getUser: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
}>;

export type RegistrationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegistrationOutput'] = ResolversParentTypes['RegistrationOutput']> = ResolversObject<{
  accessToken: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userID: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ip: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessToken: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nick: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authenticationData: Resolver<ResolversTypes['AuthenticationData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthenticationData: AuthenticationDataResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  RegistrationOutput: RegistrationOutputResolvers<ContextType>;
  Token: TokenResolvers<ContextType>;
  User: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
