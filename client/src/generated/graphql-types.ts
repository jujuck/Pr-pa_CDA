import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  gitHubKey: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  repo: Repo;
  text: Scalars['String']['output'];
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewComment: Comment;
  createNewRepo: Repo;
  createNewStatus: Status;
  deleteRepo: Scalars['Boolean']['output'];
  signIn: SignInResponse;
  signUp: User;
};


export type MutationCreateNewCommentArgs = {
  data: NewComment;
};


export type MutationCreateNewRepoArgs = {
  data: NewRepo;
};


export type MutationCreateNewStatusArgs = {
  data: NewStatus;
};


export type MutationDeleteRepoArgs = {
  repoId: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  data: Sign;
};


export type MutationSignUpArgs = {
  data: Sign;
};

export type NewComment = {
  gitHubKey: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type NewRepo = {
  gitHubKey: Scalars['String']['input'];
  isPrivate: Scalars['ID']['input'];
  langs: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type NewStatus = {
  label: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllComments: Array<Comment>;
  getAllLangs: Array<Lang>;
  getAllRepos: Array<Repo>;
  getAllStatus: Array<Status>;
  getLangById: Lang;
  getRepoById: Repo;
  getStatusById: Status;
};


export type QueryGetAllReposArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLangByIdArgs = {
  LangId: Scalars['String']['input'];
};


export type QueryGetRepoByIdArgs = {
  repoId: Scalars['String']['input'];
};


export type QueryGetStatusByIdArgs = {
  StatusId: Scalars['String']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  comments: Array<Comment>;
  gitHubKey: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPrivate: Status;
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Sign = {
  email: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
};

export type CreateNewCommentMutationVariables = Exact<{
  data: NewComment;
}>;


export type CreateNewCommentMutation = { __typename?: 'Mutation', createNewComment: { __typename?: 'Comment', text: string, gitHubKey: string } };

export type SignUpMutationVariables = Exact<{
  data: Sign;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'User', email: string, id: string } } };

export type GetRepoByIdQueryVariables = Exact<{
  repoId: Scalars['String']['input'];
}>;


export type GetRepoByIdQuery = { __typename?: 'Query', getRepoById: { __typename?: 'Repo', id: string, gitHubKey: string, name: string, url: string, langs: Array<{ __typename?: 'Lang', id: string, name: string }>, isPrivate: { __typename?: 'Status', label: string }, comments: Array<{ __typename?: 'Comment', id: string, text: string }> } };


export const CreateNewCommentDocument = gql`
    mutation CreateNewComment($data: NewComment!) {
  createNewComment(data: $data) {
    text
    gitHubKey
  }
}
    `;
export type CreateNewCommentMutationFn = Apollo.MutationFunction<CreateNewCommentMutation, CreateNewCommentMutationVariables>;

/**
 * __useCreateNewCommentMutation__
 *
 * To run a mutation, you first call `useCreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = useCreateNewCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCommentMutation, CreateNewCommentMutationVariables>(CreateNewCommentDocument, options);
      }
export type CreateNewCommentMutationHookResult = ReturnType<typeof useCreateNewCommentMutation>;
export type CreateNewCommentMutationResult = Apollo.MutationResult<CreateNewCommentMutation>;
export type CreateNewCommentMutationOptions = Apollo.BaseMutationOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($data: Sign!) {
  signIn(data: $data) {
    user {
      email
      id
    }
    token
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const GetRepoByIdDocument = gql`
    query GetRepoById($repoId: String!) {
  getRepoById(repoId: $repoId) {
    id
    gitHubKey
    name
    url
    langs {
      id
      name
    }
    isPrivate {
      label
    }
    comments {
      id
      text
    }
  }
}
    `;

/**
 * __useGetRepoByIdQuery__
 *
 * To run a query within a React component, call `useGetRepoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepoByIdQuery({
 *   variables: {
 *      repoId: // value for 'repoId'
 *   },
 * });
 */
export function useGetRepoByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRepoByIdQuery, GetRepoByIdQueryVariables> & ({ variables: GetRepoByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepoByIdQuery, GetRepoByIdQueryVariables>(GetRepoByIdDocument, options);
      }
export function useGetRepoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepoByIdQuery, GetRepoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepoByIdQuery, GetRepoByIdQueryVariables>(GetRepoByIdDocument, options);
        }
export function useGetRepoByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRepoByIdQuery, GetRepoByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRepoByIdQuery, GetRepoByIdQueryVariables>(GetRepoByIdDocument, options);
        }
export type GetRepoByIdQueryHookResult = ReturnType<typeof useGetRepoByIdQuery>;
export type GetRepoByIdLazyQueryHookResult = ReturnType<typeof useGetRepoByIdLazyQuery>;
export type GetRepoByIdSuspenseQueryHookResult = ReturnType<typeof useGetRepoByIdSuspenseQuery>;
export type GetRepoByIdQueryResult = Apollo.QueryResult<GetRepoByIdQuery, GetRepoByIdQueryVariables>;