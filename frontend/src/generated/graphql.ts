import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: string;
};

export type Connection = {
  pageInfo: PageInfo;
  edges: Array<Maybe<Edge>>;
};

export type Edge = {
  cursor: Scalars['String'];
  node: Node;
};

export type Mutation = {
  __typename?: 'Mutation';
  createWorry: Worry;
  updateWorry: Worry;
  deleteWorry: Worry;
};


export type MutationCreateWorryArgs = {
  input: NewWorry;
};


export type MutationUpdateWorryArgs = {
  input?: Maybe<UpdateWorryInput>;
};


export type MutationDeleteWorryArgs = {
  id: Scalars['Int'];
};

export type NewWorry = {
  title: Scalars['String'];
  notes: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type PaginationInput = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  worries: WorryConnection;
  users: Array<User>;
  worry: Worry;
  user: User;
};


export type QueryWorriesArgs = {
  orderBy: WorryOrderField;
  page: PaginationInput;
};


export type QueryWorryArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type UpdateWorryInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  notes: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  worries: Array<Worry>;
};

export type Worry = Node & {
  __typename?: 'Worry';
  id: Scalars['ID'];
  title: Scalars['String'];
  notes: Scalars['String'];
  user_id: Scalars['String'];
};

export type WorryConnection = Connection & {
  __typename?: 'WorryConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<WorryEdge>>;
};

export type WorryEdge = Edge & {
  __typename?: 'WorryEdge';
  cursor: Scalars['String'];
  node: Worry;
};

export enum WorryOrderField {
  Latest = 'LATEST'
}

export type WorryFieldsFragment = (
  { __typename?: 'Worry' }
  & Pick<Worry, 'id' | 'user_id' | 'title' | 'notes'>
);

export type CreateWorryMutationVariables = Exact<{
  title: Scalars['String'];
  notes: Scalars['String'];
}>;


export type CreateWorryMutation = (
  { __typename?: 'Mutation' }
  & { createWorry: (
    { __typename?: 'Worry' }
    & WorryFieldsFragment
  ) }
);

export const WorryFieldsFragmentDoc = gql`
    fragment worryFields on Worry {
  id
  user_id
  title
  notes
}
    `;
export const CreateWorryDocument = gql`
    mutation createWorry($title: String!, $notes: String!) {
  createWorry(input: {title: $title, notes: $notes}) {
    ...worryFields
  }
}
    ${WorryFieldsFragmentDoc}`;
export type CreateWorryMutationFn = Apollo.MutationFunction<CreateWorryMutation, CreateWorryMutationVariables>;

/**
 * __useCreateWorryMutation__
 *
 * To run a mutation, you first call `useCreateWorryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorryMutation, { data, loading, error }] = useCreateWorryMutation({
 *   variables: {
 *      title: // value for 'title'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCreateWorryMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorryMutation, CreateWorryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorryMutation, CreateWorryMutationVariables>(CreateWorryDocument, options);
      }
export type CreateWorryMutationHookResult = ReturnType<typeof useCreateWorryMutation>;
export type CreateWorryMutationResult = Apollo.MutationResult<CreateWorryMutation>;
export type CreateWorryMutationOptions = Apollo.BaseMutationOptions<CreateWorryMutation, CreateWorryMutationVariables>;
