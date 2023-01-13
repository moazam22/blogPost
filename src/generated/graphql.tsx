import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AccessUserPayload = {
  __typename?: 'AccessUserPayload';
  access_token?: Maybe<Scalars['String']>;
};

export type AllPosts = {
  __typename?: 'AllPosts';
  count?: Maybe<Scalars['Float']>;
  posts?: Maybe<Array<Post>>;
};

export type AllUsersDto = {
  __typename?: 'AllUsersDto';
  count?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<User>>;
};

export type CreateCommentInput = {
  commentBody: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type CreatePostInput = {
  attachmentUrl?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  readTime?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type CreatedUser = {
  __typename?: 'CreatedUser';
  access_token: Scalars['String'];
  user: User;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  userKey: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPostComment: ResponseMsgPayload;
  createUser: CreatedUser;
  createUserPost: ResponseMsgPayload;
  deleteComment: ResponseMsgPayload;
  deletePost: ResponseMsgPayload;
  deleteUser: ResponseMsgPayload;
  forgotPassword: ForgotPassword;
  login: AccessUserPayload;
  signUp: CreatedUser;
  updateComment: ResponseMsgPayload;
  updatePassword: ResponseMsgPayload;
  updateUser: ResponseMsgPayload;
  updateUserPost: ResponseMsgPayload;
};


export type MutationCreatePostCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateUserPostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginUser: LoginUserInput;
};


export type MutationSignUpArgs = {
  signUpUserInput: CreateUserInput;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdatePasswordArgs = {
  passwordUpdateInput: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserPostArgs = {
  updatePostInput: UpdatePostInput;
};

export type PaginateInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  attachmentUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['String'];
  postComments?: Maybe<Array<PostComment>>;
  readTime?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type PostComment = {
  __typename?: 'PostComment';
  commentBody: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  parent?: Maybe<PostComment>;
  post?: Maybe<Post>;
  reply?: Maybe<Array<PostComment>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  fetchAllPosts: AllPosts;
  fetchAllUser: AllUsersDto;
  fetchPost: Post;
  fetchUserPosts: AllPosts;
  findUserById: User;
  getCurrentUser: User;
  searchPost: Array<Post>;
  searchUserPostES: Array<UserPostEsResponse>;
};


export type QueryFetchAllPostsArgs = {
  paginateInput: PaginateInput;
};


export type QueryFetchAllUserArgs = {
  paginateInput: PaginateInput;
};


export type QueryFetchPostArgs = {
  postId: Scalars['String'];
};


export type QueryFetchUserPostsArgs = {
  paginateInput: PaginateInput;
};


export type QueryFindUserByIdArgs = {
  userId: Scalars['String'];
};


export type QuerySearchPostArgs = {
  queryString: Scalars['String'];
};


export type QuerySearchUserPostEsArgs = {
  queryString: Scalars['String'];
};

export type ResponseMsgPayload = {
  __typename?: 'ResponseMsgPayload';
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type UpdateCommentInput = {
  commentBody: Scalars['String'];
  commentId: Scalars['String'];
};

export type UpdatePasswordInput = {
  password: Scalars['String'];
  userKey: Scalars['String'];
};

export type UpdatePostInput = {
  attachmentUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  readTime?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  resetPasswordTokenExpiredAt?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserPostEsResponse = {
  __typename?: 'UserPostESResponse';
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  postDescription: Scalars['String'];
  postId: Scalars['String'];
  postTitle: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginUser: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessUserPayload', access_token?: string | null } };

export type SignUpMutationVariables = Exact<{
  signUpUserInput: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'CreatedUser', access_token: string, user: { __typename?: 'User', email: string, firstName: string, lastName: string, id: string, createdAt?: any | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPassword', userKey: string } };

export type UpdatePasswordMutationVariables = Exact<{
  passwordUpdateInput: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createUserPost: { __typename?: 'ResponseMsgPayload', message: string, status: number } };

export type CreatePostCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreatePostCommentMutation = { __typename?: 'Mutation', createPostComment: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type UpdateUserPostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdateUserPostMutation = { __typename?: 'Mutation', updateUserPost: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type UpdateCommentMutationVariables = Exact<{
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'ResponseMsgPayload', status: number, message: string } };

export type FetchAllPostsQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type FetchAllPostsQuery = { __typename?: 'Query', fetchAllPosts: { __typename?: 'AllPosts', count?: number | null, posts?: Array<{ __typename?: 'Post', title: string, attachmentUrl?: string | null, description: string, createdAt?: any | null, id: string, updatedAt?: any | null, user?: { __typename?: 'User', id: string, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null, fullName?: string | null } | null, postComments?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', fullName?: string | null, id: string, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', id: string, commentBody: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', fullName?: string | null, updatedAt?: any | null, lastName: string, id: string, firstName: string, email: string, createdAt?: any | null } | null, parent?: { __typename?: 'PostComment', id: string, createdAt?: any | null, commentBody: string, updatedAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, parent?: { __typename?: 'PostComment', id: string, updatedAt?: any | null, createdAt?: any | null, commentBody: string } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, parent?: { __typename?: 'PostComment', id: string, updatedAt?: any | null, createdAt?: any | null, commentBody: string } | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, parent?: { __typename?: 'PostComment', id: string, updatedAt?: any | null, createdAt?: any | null, commentBody: string } | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null }> | null, parent?: { __typename?: 'PostComment', id: string, commentBody: string, createdAt?: any | null, updatedAt?: any | null } | null }> | null }> | null }> | null }> | null }> | null }> | null } };

export type FetchPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type FetchPostQuery = { __typename?: 'Query', fetchPost: { __typename?: 'Post', title: string, description: string, readTime?: string | null, id: string } };

export type FetchUserPostsQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type FetchUserPostsQuery = { __typename?: 'Query', fetchUserPosts: { __typename?: 'AllPosts', count?: number | null, posts?: Array<{ __typename?: 'Post', title: string, attachmentUrl?: string | null, description: string, createdAt?: any | null, id: string, updatedAt?: any | null, user?: { __typename?: 'User', id: string, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null, fullName?: string | null } | null, postComments?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', fullName?: string | null, id: string, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', id: string, commentBody: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', fullName?: string | null, updatedAt?: any | null, lastName: string, id: string, firstName: string, email: string, createdAt?: any | null } | null, parent?: { __typename?: 'PostComment', id: string, createdAt?: any | null, commentBody: string, updatedAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, parent?: { __typename?: 'PostComment', id: string, updatedAt?: any | null, createdAt?: any | null, commentBody: string } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, parent?: { __typename?: 'PostComment', id: string, updatedAt?: any | null, createdAt?: any | null, commentBody: string } | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, updatedAt?: any | null, createdAt?: any | null, parent?: { __typename?: 'PostComment', id: string, updatedAt?: any | null, createdAt?: any | null, commentBody: string } | null, user?: { __typename?: 'User', id: string, fullName?: string | null, updatedAt?: any | null, lastName: string, firstName: string, email: string, createdAt?: any | null } | null }> | null, parent?: { __typename?: 'PostComment', id: string, commentBody: string, createdAt?: any | null, updatedAt?: any | null } | null }> | null }> | null }> | null }> | null }> | null }> | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, fullName?: string | null, email: string, firstName: string, lastName: string } };

export type SearchPostQueryVariables = Exact<{
  queryString: Scalars['String'];
}>;


export type SearchPostQuery = { __typename?: 'Query', searchPost: Array<{ __typename?: 'Post', title: string, attachmentUrl?: string | null, description: string, id: string, user?: { __typename?: 'User', fullName?: string | null, id: string, lastName: string, firstName: string, email: string } | null, postComments?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, user?: { __typename?: 'User', fullName?: string | null, id: string, lastName: string, firstName: string, email: string } | null, reply?: Array<{ __typename?: 'PostComment', id: string, commentBody: string, user?: { __typename?: 'User', id: string, fullName?: string | null, lastName: string, firstName: string, email: string } | null, parent?: { __typename?: 'PostComment', id: string, commentBody: string } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, user?: { __typename?: 'User', id: string, fullName?: string | null, lastName: string, firstName: string, email: string } | null, parent?: { __typename?: 'PostComment', id: string, commentBody: string } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, parent?: { __typename?: 'PostComment', id: string, commentBody: string } | null, user?: { __typename?: 'User', id: string, fullName?: string | null, lastName: string, firstName: string, email: string } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, user?: { __typename?: 'User', id: string, fullName?: string | null, lastName: string, firstName: string, email: string } | null, reply?: Array<{ __typename?: 'PostComment', commentBody: string, id: string, parent?: { __typename?: 'PostComment', id: string, commentBody: string } | null, user?: { __typename?: 'User', id: string, fullName?: string | null, lastName: string, firstName: string, email: string } | null }> | null, parent?: { __typename?: 'PostComment', id: string, commentBody: string } | null }> | null }> | null }> | null }> | null }> | null }> };


export const LoginDocument = gql`
    mutation Login($loginUser: LoginUserInput!) {
  login(loginUser: $loginUser) {
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUser: // value for 'loginUser'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($signUpUserInput: CreateUserInput!) {
  signUp(signUpUserInput: $signUpUserInput) {
    access_token
    user {
      email
      firstName
      lastName
      id
      createdAt
    }
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
 *      signUpUserInput: // value for 'signUpUserInput'
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    userKey
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($passwordUpdateInput: UpdatePasswordInput!) {
  updatePassword(passwordUpdateInput: $passwordUpdateInput) {
    status
    message
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      passwordUpdateInput: // value for 'passwordUpdateInput'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createUserPost(createPostInput: $createPostInput) {
    message
    status
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreatePostCommentDocument = gql`
    mutation CreatePostComment($createCommentInput: CreateCommentInput!) {
  createPostComment(createCommentInput: $createCommentInput) {
    status
    message
  }
}
    `;
export type CreatePostCommentMutationFn = Apollo.MutationFunction<CreatePostCommentMutation, CreatePostCommentMutationVariables>;

/**
 * __useCreatePostCommentMutation__
 *
 * To run a mutation, you first call `useCreatePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCommentMutation, { data, loading, error }] = useCreatePostCommentMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCreatePostCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostCommentMutation, CreatePostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostCommentMutation, CreatePostCommentMutationVariables>(CreatePostCommentDocument, options);
      }
export type CreatePostCommentMutationHookResult = ReturnType<typeof useCreatePostCommentMutation>;
export type CreatePostCommentMutationResult = Apollo.MutationResult<CreatePostCommentMutation>;
export type CreatePostCommentMutationOptions = Apollo.BaseMutationOptions<CreatePostCommentMutation, CreatePostCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    status
    message
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdateUserPostDocument = gql`
    mutation UpdateUserPost($updatePostInput: UpdatePostInput!) {
  updateUserPost(updatePostInput: $updatePostInput) {
    status
    message
  }
}
    `;
export type UpdateUserPostMutationFn = Apollo.MutationFunction<UpdateUserPostMutation, UpdateUserPostMutationVariables>;

/**
 * __useUpdateUserPostMutation__
 *
 * To run a mutation, you first call `useUpdateUserPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPostMutation, { data, loading, error }] = useUpdateUserPostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdateUserPostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPostMutation, UpdateUserPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPostMutation, UpdateUserPostMutationVariables>(UpdateUserPostDocument, options);
      }
export type UpdateUserPostMutationHookResult = ReturnType<typeof useUpdateUserPostMutation>;
export type UpdateUserPostMutationResult = Apollo.MutationResult<UpdateUserPostMutation>;
export type UpdateUserPostMutationOptions = Apollo.BaseMutationOptions<UpdateUserPostMutation, UpdateUserPostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: String!) {
  deleteComment(commentId: $commentId) {
    status
    message
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
  updateComment(updateCommentInput: $updateCommentInput) {
    status
    message
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      updateCommentInput: // value for 'updateCommentInput'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    status
    message
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const FetchAllPostsDocument = gql`
    query FetchAllPosts($paginateInput: PaginateInput!) {
  fetchAllPosts(paginateInput: $paginateInput) {
    count
    posts {
      user {
        id
        updatedAt
        lastName
        firstName
        email
        createdAt
        fullName
      }
      title
      attachmentUrl
      description
      createdAt
      id
      postComments {
        user {
          fullName
          id
          updatedAt
          lastName
          firstName
          email
          createdAt
        }
        commentBody
        id
        reply {
          user {
            fullName
            updatedAt
            lastName
            id
            firstName
            email
            createdAt
          }
          id
          commentBody
          parent {
            id
            createdAt
            commentBody
            updatedAt
          }
          reply {
            user {
              id
              fullName
              updatedAt
              lastName
              firstName
              email
              createdAt
            }
            commentBody
            id
            parent {
              id
              updatedAt
              createdAt
              commentBody
            }
            reply {
              commentBody
              id
              parent {
                id
                updatedAt
                createdAt
                commentBody
              }
              user {
                id
                fullName
                updatedAt
                lastName
                firstName
                email
                createdAt
              }
              reply {
                user {
                  id
                  fullName
                  updatedAt
                  lastName
                  firstName
                  email
                  createdAt
                }
                commentBody
                id
                reply {
                  commentBody
                  id
                  parent {
                    id
                    updatedAt
                    createdAt
                    commentBody
                  }
                  user {
                    id
                    fullName
                    updatedAt
                    lastName
                    firstName
                    email
                    createdAt
                  }
                  updatedAt
                  createdAt
                }
                parent {
                  id
                  commentBody
                  createdAt
                  updatedAt
                }
                updatedAt
                createdAt
              }
              updatedAt
              createdAt
            }
            updatedAt
            createdAt
          }
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      updatedAt
    }
  }
}
    `;

/**
 * __useFetchAllPostsQuery__
 *
 * To run a query within a React component, call `useFetchAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllPostsQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useFetchAllPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllPostsQuery, FetchAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(FetchAllPostsDocument, options);
      }
export function useFetchAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllPostsQuery, FetchAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(FetchAllPostsDocument, options);
        }
export type FetchAllPostsQueryHookResult = ReturnType<typeof useFetchAllPostsQuery>;
export type FetchAllPostsLazyQueryHookResult = ReturnType<typeof useFetchAllPostsLazyQuery>;
export type FetchAllPostsQueryResult = Apollo.QueryResult<FetchAllPostsQuery, FetchAllPostsQueryVariables>;
export const FetchPostDocument = gql`
    query FetchPost($postId: String!) {
  fetchPost(postId: $postId) {
    title
    description
    readTime
    id
  }
}
    `;

/**
 * __useFetchPostQuery__
 *
 * To run a query within a React component, call `useFetchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useFetchPostQuery(baseOptions: Apollo.QueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
      }
export function useFetchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options);
        }
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>;
export type FetchPostLazyQueryHookResult = ReturnType<typeof useFetchPostLazyQuery>;
export type FetchPostQueryResult = Apollo.QueryResult<FetchPostQuery, FetchPostQueryVariables>;
export const FetchUserPostsDocument = gql`
    query FetchUserPosts($paginateInput: PaginateInput!) {
  fetchUserPosts(paginateInput: $paginateInput) {
    count
    posts {
      user {
        id
        updatedAt
        lastName
        firstName
        email
        createdAt
        fullName
      }
      title
      attachmentUrl
      description
      createdAt
      id
      postComments {
        user {
          fullName
          id
          updatedAt
          lastName
          firstName
          email
          createdAt
        }
        commentBody
        id
        reply {
          user {
            fullName
            updatedAt
            lastName
            id
            firstName
            email
            createdAt
          }
          id
          commentBody
          parent {
            id
            createdAt
            commentBody
            updatedAt
          }
          reply {
            user {
              id
              fullName
              updatedAt
              lastName
              firstName
              email
              createdAt
            }
            commentBody
            id
            parent {
              id
              updatedAt
              createdAt
              commentBody
            }
            reply {
              commentBody
              id
              parent {
                id
                updatedAt
                createdAt
                commentBody
              }
              user {
                id
                fullName
                updatedAt
                lastName
                firstName
                email
                createdAt
              }
              reply {
                user {
                  id
                  fullName
                  updatedAt
                  lastName
                  firstName
                  email
                  createdAt
                }
                commentBody
                id
                reply {
                  commentBody
                  id
                  parent {
                    id
                    updatedAt
                    createdAt
                    commentBody
                  }
                  user {
                    id
                    fullName
                    updatedAt
                    lastName
                    firstName
                    email
                    createdAt
                  }
                  updatedAt
                  createdAt
                }
                parent {
                  id
                  commentBody
                  createdAt
                  updatedAt
                }
                updatedAt
                createdAt
              }
              updatedAt
              createdAt
            }
            updatedAt
            createdAt
          }
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      updatedAt
    }
  }
}
    `;

/**
 * __useFetchUserPostsQuery__
 *
 * To run a query within a React component, call `useFetchUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserPostsQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useFetchUserPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchUserPostsQuery, FetchUserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserPostsQuery, FetchUserPostsQueryVariables>(FetchUserPostsDocument, options);
      }
export function useFetchUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserPostsQuery, FetchUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserPostsQuery, FetchUserPostsQueryVariables>(FetchUserPostsDocument, options);
        }
export type FetchUserPostsQueryHookResult = ReturnType<typeof useFetchUserPostsQuery>;
export type FetchUserPostsLazyQueryHookResult = ReturnType<typeof useFetchUserPostsLazyQuery>;
export type FetchUserPostsQueryResult = Apollo.QueryResult<FetchUserPostsQuery, FetchUserPostsQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    fullName
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const SearchPostDocument = gql`
    query SearchPost($queryString: String!) {
  searchPost(queryString: $queryString) {
    user {
      fullName
      id
      lastName
      firstName
      email
    }
    title
    attachmentUrl
    description
    id
    postComments {
      user {
        fullName
        id
        lastName
        firstName
        email
      }
      commentBody
      id
      reply {
        user {
          id
          fullName
          lastName
          firstName
          email
        }
        id
        commentBody
        parent {
          id
          commentBody
        }
        reply {
          user {
            id
            fullName
            lastName
            firstName
            email
          }
          commentBody
          id
          parent {
            id
            commentBody
          }
          reply {
            commentBody
            id
            parent {
              id
              commentBody
            }
            user {
              id
              fullName
              lastName
              firstName
              email
            }
            reply {
              user {
                id
                fullName
                lastName
                firstName
                email
              }
              commentBody
              id
              reply {
                commentBody
                id
                parent {
                  id
                  commentBody
                }
                user {
                  id
                  fullName
                  lastName
                  firstName
                  email
                }
              }
              parent {
                id
                commentBody
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useSearchPostQuery__
 *
 * To run a query within a React component, call `useSearchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useSearchPostQuery(baseOptions: Apollo.QueryHookOptions<SearchPostQuery, SearchPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPostQuery, SearchPostQueryVariables>(SearchPostDocument, options);
      }
export function useSearchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPostQuery, SearchPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPostQuery, SearchPostQueryVariables>(SearchPostDocument, options);
        }
export type SearchPostQueryHookResult = ReturnType<typeof useSearchPostQuery>;
export type SearchPostLazyQueryHookResult = ReturnType<typeof useSearchPostLazyQuery>;
export type SearchPostQueryResult = Apollo.QueryResult<SearchPostQuery, SearchPostQueryVariables>;