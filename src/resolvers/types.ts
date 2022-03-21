/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  JSON: any;
  JSONObject: any;
};

/** A connection to a list of items. */
export type Connection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<Edge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  nodes?: Maybe<Array<Maybe<Node>>>;
  /** Information to aid in pagination. */
  pageInfo: CursorPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ConnectionResponseOfDbResponse = {
  __typename?: 'ConnectionResponseOfDbResponse';
  nodes?: Maybe<Array<Maybe<Node>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** Information about pagination in a connection. */
export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type Edge = {
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Node;
};

export enum Gender {
  MEN = 'MEN',
  OTHER = 'OTHER',
  WOMEN = 'WOMEN'
}

/** A single menu. */
export type Menu = Node & {
  __typename?: 'Menu';
  categories: Array<MenuCategory>;
  /** The ISO 8601 date format of the time that this resource was created. */
  createdDate?: Maybe<Scalars['String']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  editedDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  restaurantConnection?: Maybe<MenuRestaurantsConnection>;
  title: Scalars['String'];
};


/** A single menu. */
export type MenuRestaurantConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum MenuCategory {
  AMERICAN = 'AMERICAN',
  ARABIAN = 'ARABIAN',
  ARGENTINA = 'ARGENTINA',
  BRAZIL = 'BRAZIL',
  CHINESE = 'CHINESE',
  FRENCH = 'FRENCH',
  INDIAN = 'INDIAN',
  INDONESIAN = 'INDONESIAN',
  ITALIAN = 'ITALIAN',
  JAPANESE = 'JAPANESE',
  KOREAN = 'KOREAN',
  MEXICAN = 'MEXICAN',
  OTHERS = 'OTHERS',
  PORTUGAL = 'PORTUGAL',
  RUSSIA = 'RUSSIA',
  SPANISH = 'SPANISH',
  THAI = 'THAI',
  UK = 'UK'
}

export type MenuRestaurantsConnection = {
  __typename?: 'MenuRestaurantsConnection';
  edges?: Maybe<Array<Maybe<MenuRestaurantsEdge>>>;
  nodes?: Maybe<Array<Maybe<Restaurant>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuRestaurantsEdge = {
  __typename?: 'MenuRestaurantsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Restaurant>;
};

export type MenusConnection = {
  __typename?: 'MenusConnection';
  edges?: Maybe<Array<Maybe<MenusEdge>>>;
  nodes?: Maybe<Array<Maybe<Menu>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenusEdge = {
  __typename?: 'MenusEdge';
  cursor: Scalars['String'];
  node?: Maybe<Menu>;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** Offset Pagination */
export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** When paginating forwards, the offset to continue. */
  endOffset?: Maybe<Scalars['Int']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, the offset to continue. */
  startOffset?: Maybe<Scalars['Int']>;
};

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  allMenus?: Maybe<MenusConnection>;
  allRestaurants?: Maybe<RestaurantsConnection>;
  allUsers?: Maybe<UsersConnection>;
  menu?: Maybe<Menu>;
  restaurant?: Maybe<Restaurant>;
  user?: Maybe<User>;
};


export type QueryAllMenusArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryAllRestaurantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryAllUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMenuArgs = {
  id: Scalars['ID'];
};


export type QueryRestaurantArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** Restaurant */
export type Restaurant = Node & {
  __typename?: 'Restaurant';
  address: Scalars['String'];
  /** The ISO 8601 date format of the time that this resource was created. */
  createdDate?: Maybe<Scalars['String']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  editedDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  menuConnection?: Maybe<RestaurantMenusConnection>;
  name: Scalars['String'];
  scores?: Maybe<Scalars['Float']>;
  userLikedConnection?: Maybe<RestaurantUsersConnection>;
};


/** Restaurant */
export type RestaurantMenuConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Restaurant */
export type RestaurantUserLikedConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RestaurantMenusConnection = {
  __typename?: 'RestaurantMenusConnection';
  edges?: Maybe<Array<Maybe<RestaurantMenusEdge>>>;
  nodes?: Maybe<Array<Maybe<Menu>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RestaurantMenusEdge = {
  __typename?: 'RestaurantMenusEdge';
  cursor: Scalars['String'];
  node?: Maybe<Menu>;
};

export type RestaurantUsersConnection = {
  __typename?: 'RestaurantUsersConnection';
  edges?: Maybe<Array<Maybe<RestaurantUsersEdge>>>;
  nodes?: Maybe<Array<Maybe<User>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RestaurantUsersEdge = {
  __typename?: 'RestaurantUsersEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type RestaurantsConnection = {
  __typename?: 'RestaurantsConnection';
  edges?: Maybe<Array<Maybe<RestaurantsEdge>>>;
  nodes?: Maybe<Array<Maybe<Restaurant>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RestaurantsEdge = {
  __typename?: 'RestaurantsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Restaurant>;
};

/** An individual user or character within the Star Wars universe. */
export type User = Node & {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  /** The ISO 8601 date format of the time that this user was born */
  birthDate?: Maybe<Scalars['String']>;
  /** The ISO 8601 date format of the time that this resource was created. */
  createdDate?: Maybe<Scalars['String']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  editedDate?: Maybe<Scalars['String']>;
  followeeConnection?: Maybe<UsersConnection>;
  followerConnection?: Maybe<UsersConnection>;
  gender?: Maybe<Gender>;
  /** The ID of an object */
  id: Scalars['ID'];
  name: Scalars['String'];
  userLikedRestaurantsConnection?: Maybe<UserRestaurantsConnection>;
};


/** An individual user or character within the Star Wars universe. */
export type UserFolloweeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** An individual user or character within the Star Wars universe. */
export type UserFollowerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** An individual user or character within the Star Wars universe. */
export type UserUserLikedRestaurantsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserRestaurantsConnection = {
  __typename?: 'UserRestaurantsConnection';
  edges?: Maybe<Array<Maybe<UserRestaurantsEdge>>>;
  nodes?: Maybe<Array<Maybe<Restaurant>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserRestaurantsEdge = {
  __typename?: 'UserRestaurantsEdge';
  cursor: Scalars['String'];
  node?: Maybe<Restaurant>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges?: Maybe<Array<Maybe<UsersEdge>>>;
  nodes?: Maybe<Array<Maybe<User>>>;
  pageInfo: CursorPageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersEdge = {
  __typename?: 'UsersEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Connection: never;
  ConnectionResponseOfDbResponse: ResolverTypeWrapper<ConnectionResponseOfDbResponse>;
  CursorPageInfo: ResolverTypeWrapper<CursorPageInfo>;
  Edge: never;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Menu: ResolverTypeWrapper<Menu>;
  MenuCategory: MenuCategory;
  MenuRestaurantsConnection: ResolverTypeWrapper<MenuRestaurantsConnection>;
  MenuRestaurantsEdge: ResolverTypeWrapper<MenuRestaurantsEdge>;
  MenusConnection: ResolverTypeWrapper<MenusConnection>;
  MenusEdge: ResolverTypeWrapper<MenusEdge>;
  Node: ResolversTypes['Menu'] | ResolversTypes['Restaurant'] | ResolversTypes['User'];
  OffsetPageInfo: ResolverTypeWrapper<OffsetPageInfo>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  RestaurantMenusConnection: ResolverTypeWrapper<RestaurantMenusConnection>;
  RestaurantMenusEdge: ResolverTypeWrapper<RestaurantMenusEdge>;
  RestaurantUsersConnection: ResolverTypeWrapper<RestaurantUsersConnection>;
  RestaurantUsersEdge: ResolverTypeWrapper<RestaurantUsersEdge>;
  RestaurantsConnection: ResolverTypeWrapper<RestaurantsConnection>;
  RestaurantsEdge: ResolverTypeWrapper<RestaurantsEdge>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserRestaurantsConnection: ResolverTypeWrapper<UserRestaurantsConnection>;
  UserRestaurantsEdge: ResolverTypeWrapper<UserRestaurantsEdge>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  UsersEdge: ResolverTypeWrapper<UsersEdge>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Connection: never;
  ConnectionResponseOfDbResponse: ConnectionResponseOfDbResponse;
  CursorPageInfo: CursorPageInfo;
  Edge: never;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Menu: Menu;
  MenuRestaurantsConnection: MenuRestaurantsConnection;
  MenuRestaurantsEdge: MenuRestaurantsEdge;
  MenusConnection: MenusConnection;
  MenusEdge: MenusEdge;
  Node: ResolversParentTypes['Menu'] | ResolversParentTypes['Restaurant'] | ResolversParentTypes['User'];
  OffsetPageInfo: OffsetPageInfo;
  Query: {};
  Restaurant: Restaurant;
  RestaurantMenusConnection: RestaurantMenusConnection;
  RestaurantMenusEdge: RestaurantMenusEdge;
  RestaurantUsersConnection: RestaurantUsersConnection;
  RestaurantUsersEdge: RestaurantUsersEdge;
  RestaurantsConnection: RestaurantsConnection;
  RestaurantsEdge: RestaurantsEdge;
  String: Scalars['String'];
  User: User;
  UserRestaurantsConnection: UserRestaurantsConnection;
  UserRestaurantsEdge: UserRestaurantsEdge;
  UsersConnection: UsersConnection;
  UsersEdge: UsersEdge;
}>;

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Edge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Node']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ConnectionResponseOfDbResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionResponseOfDbResponse'] = ResolversParentTypes['ConnectionResponseOfDbResponse']> = ResolversObject<{
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Node']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CursorPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CursorPageInfo'] = ResolversParentTypes['CursorPageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Node'], ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MenuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType>;
  createdDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restaurantConnection?: Resolver<Maybe<ResolversTypes['MenuRestaurantsConnection']>, ParentType, ContextType, RequireFields<MenuRestaurantConnectionArgs, never>>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MenuRestaurantsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuRestaurantsConnection'] = ResolversParentTypes['MenuRestaurantsConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuRestaurantsEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MenuRestaurantsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuRestaurantsEdge'] = ResolversParentTypes['MenuRestaurantsEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MenusConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenusConnection'] = ResolversParentTypes['MenusConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenusEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Menu']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MenusEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenusEdge'] = ResolversParentTypes['MenusEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Menu']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Menu' | 'Restaurant' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type OffsetPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffsetPageInfo'] = ResolversParentTypes['OffsetPageInfo']> = ResolversObject<{
  endOffset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startOffset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allMenus?: Resolver<Maybe<ResolversTypes['MenusConnection']>, ParentType, ContextType, RequireFields<QueryAllMenusArgs, never>>;
  allRestaurants?: Resolver<Maybe<ResolversTypes['RestaurantsConnection']>, ParentType, ContextType, RequireFields<QueryAllRestaurantsArgs, never>>;
  allUsers?: Resolver<Maybe<ResolversTypes['UsersConnection']>, ParentType, ContextType, RequireFields<QueryAllUsersArgs, never>>;
  menu?: Resolver<Maybe<ResolversTypes['Menu']>, ParentType, ContextType, RequireFields<QueryMenuArgs, 'id'>>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType, RequireFields<QueryRestaurantArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  menuConnection?: Resolver<Maybe<ResolversTypes['RestaurantMenusConnection']>, ParentType, ContextType, RequireFields<RestaurantMenuConnectionArgs, never>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scores?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userLikedConnection?: Resolver<Maybe<ResolversTypes['RestaurantUsersConnection']>, ParentType, ContextType, RequireFields<RestaurantUserLikedConnectionArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RestaurantMenusConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantMenusConnection'] = ResolversParentTypes['RestaurantMenusConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['RestaurantMenusEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Menu']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RestaurantMenusEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantMenusEdge'] = ResolversParentTypes['RestaurantMenusEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Menu']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RestaurantUsersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantUsersConnection'] = ResolversParentTypes['RestaurantUsersConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['RestaurantUsersEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RestaurantUsersEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantUsersEdge'] = ResolversParentTypes['RestaurantUsersEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RestaurantsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantsConnection'] = ResolversParentTypes['RestaurantsConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['RestaurantsEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RestaurantsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantsEdge'] = ResolversParentTypes['RestaurantsEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  followeeConnection?: Resolver<Maybe<ResolversTypes['UsersConnection']>, ParentType, ContextType, RequireFields<UserFolloweeConnectionArgs, never>>;
  followerConnection?: Resolver<Maybe<ResolversTypes['UsersConnection']>, ParentType, ContextType, RequireFields<UserFollowerConnectionArgs, never>>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userLikedRestaurantsConnection?: Resolver<Maybe<ResolversTypes['UserRestaurantsConnection']>, ParentType, ContextType, RequireFields<UserUserLikedRestaurantsConnectionArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRestaurantsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRestaurantsConnection'] = ResolversParentTypes['UserRestaurantsConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRestaurantsEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserRestaurantsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRestaurantsEdge'] = ResolversParentTypes['UserRestaurantsEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersConnection'] = ResolversParentTypes['UsersConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['UsersEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['CursorPageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersEdge'] = ResolversParentTypes['UsersEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Connection?: ConnectionResolvers<ContextType>;
  ConnectionResponseOfDbResponse?: ConnectionResponseOfDbResponseResolvers<ContextType>;
  CursorPageInfo?: CursorPageInfoResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Menu?: MenuResolvers<ContextType>;
  MenuRestaurantsConnection?: MenuRestaurantsConnectionResolvers<ContextType>;
  MenuRestaurantsEdge?: MenuRestaurantsEdgeResolvers<ContextType>;
  MenusConnection?: MenusConnectionResolvers<ContextType>;
  MenusEdge?: MenusEdgeResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  OffsetPageInfo?: OffsetPageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  RestaurantMenusConnection?: RestaurantMenusConnectionResolvers<ContextType>;
  RestaurantMenusEdge?: RestaurantMenusEdgeResolvers<ContextType>;
  RestaurantUsersConnection?: RestaurantUsersConnectionResolvers<ContextType>;
  RestaurantUsersEdge?: RestaurantUsersEdgeResolvers<ContextType>;
  RestaurantsConnection?: RestaurantsConnectionResolvers<ContextType>;
  RestaurantsEdge?: RestaurantsEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRestaurantsConnection?: UserRestaurantsConnectionResolvers<ContextType>;
  UserRestaurantsEdge?: UserRestaurantsEdgeResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  UsersEdge?: UsersEdgeResolvers<ContextType>;
}>;

