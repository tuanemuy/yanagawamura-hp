import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  numeric: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "boolean_value" */
export type Boolean_Value = {
  __typename?: 'boolean_value';
  body: Scalars['Boolean'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "boolean_value". All fields are combined with a logical 'AND'. */
export type Boolean_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Boolean_Value_Bool_Exp>>;
  _not?: InputMaybe<Boolean_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Boolean_Value_Bool_Exp>>;
  body?: InputMaybe<Boolean_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "boolean_value". */
export type Boolean_Value_Order_By = {
  body?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "boolean_value" */
export enum Boolean_Value_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ValueId = 'value_id'
}

/** columns and relationships of "category" */
export type Category = {
  __typename?: 'category';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  name: Scalars['String'];
  post_type_id: Scalars['Int'];
  slug: Scalars['String'];
};

/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export type Category_Bool_Exp = {
  _and?: InputMaybe<Array<Category_Bool_Exp>>;
  _not?: InputMaybe<Category_Bool_Exp>;
  _or?: InputMaybe<Array<Category_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  post_type_id?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "category". */
export type Category_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** select columns of table "category" */
export enum Category_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PostTypeId = 'post_type_id',
  /** column name */
  Slug = 'slug'
}

/** columns and relationships of "content" */
export type Content = {
  __typename?: 'content';
  /** An object relationship */
  category: Category;
  category_id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  id: Scalars['bigint'];
  /** An object relationship */
  post: Post;
  post_id: Scalars['bigint'];
  /** An array relationship */
  tags: Array<Content_Tag>;
  title: Scalars['String'];
  /** An array relationship */
  values: Array<Value>;
};


/** columns and relationships of "content" */
export type ContentTagsArgs = {
  distinct_on?: InputMaybe<Array<Content_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Tag_Order_By>>;
  where?: InputMaybe<Content_Tag_Bool_Exp>;
};


/** columns and relationships of "content" */
export type ContentValuesArgs = {
  distinct_on?: InputMaybe<Array<Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Value_Order_By>>;
  where?: InputMaybe<Value_Bool_Exp>;
};

/** aggregated selection of "content" */
export type Content_Aggregate = {
  __typename?: 'content_aggregate';
  aggregate?: Maybe<Content_Aggregate_Fields>;
  nodes: Array<Content>;
};

/** aggregate fields of "content" */
export type Content_Aggregate_Fields = {
  __typename?: 'content_aggregate_fields';
  avg?: Maybe<Content_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Content_Max_Fields>;
  min?: Maybe<Content_Min_Fields>;
  stddev?: Maybe<Content_Stddev_Fields>;
  stddev_pop?: Maybe<Content_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Content_Stddev_Samp_Fields>;
  sum?: Maybe<Content_Sum_Fields>;
  var_pop?: Maybe<Content_Var_Pop_Fields>;
  var_samp?: Maybe<Content_Var_Samp_Fields>;
  variance?: Maybe<Content_Variance_Fields>;
};


/** aggregate fields of "content" */
export type Content_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Content_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "content" */
export type Content_Aggregate_Order_By = {
  avg?: InputMaybe<Content_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Content_Max_Order_By>;
  min?: InputMaybe<Content_Min_Order_By>;
  stddev?: InputMaybe<Content_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Content_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Content_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Content_Sum_Order_By>;
  var_pop?: InputMaybe<Content_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Content_Var_Samp_Order_By>;
  variance?: InputMaybe<Content_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Content_Avg_Fields = {
  __typename?: 'content_avg_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "content" */
export type Content_Avg_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "content". All fields are combined with a logical 'AND'. */
export type Content_Bool_Exp = {
  _and?: InputMaybe<Array<Content_Bool_Exp>>;
  _not?: InputMaybe<Content_Bool_Exp>;
  _or?: InputMaybe<Array<Content_Bool_Exp>>;
  category?: InputMaybe<Category_Bool_Exp>;
  category_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  post?: InputMaybe<Post_Bool_Exp>;
  post_id?: InputMaybe<Bigint_Comparison_Exp>;
  tags?: InputMaybe<Content_Tag_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  values?: InputMaybe<Value_Bool_Exp>;
};

/** aggregate max on columns */
export type Content_Max_Fields = {
  __typename?: 'content_max_fields';
  category_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  post_id?: Maybe<Scalars['bigint']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "content" */
export type Content_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Content_Min_Fields = {
  __typename?: 'content_min_fields';
  category_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  post_id?: Maybe<Scalars['bigint']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "content" */
export type Content_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "content". */
export type Content_Order_By = {
  category?: InputMaybe<Category_Order_By>;
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post?: InputMaybe<Post_Order_By>;
  post_id?: InputMaybe<Order_By>;
  tags_aggregate?: InputMaybe<Content_Tag_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  values_aggregate?: InputMaybe<Value_Aggregate_Order_By>;
};

/** select columns of table "content" */
export enum Content_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  Title = 'title'
}

/** aggregate stddev on columns */
export type Content_Stddev_Fields = {
  __typename?: 'content_stddev_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "content" */
export type Content_Stddev_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Content_Stddev_Pop_Fields = {
  __typename?: 'content_stddev_pop_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "content" */
export type Content_Stddev_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Content_Stddev_Samp_Fields = {
  __typename?: 'content_stddev_samp_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "content" */
export type Content_Stddev_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Content_Sum_Fields = {
  __typename?: 'content_sum_fields';
  category_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['bigint']>;
  post_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "content" */
export type Content_Sum_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "content_tag" */
export type Content_Tag = {
  __typename?: 'content_tag';
  content_id: Scalars['bigint'];
  /** An object relationship */
  tag: Tag;
  tag_id: Scalars['Int'];
};

/** order by aggregate values of table "content_tag" */
export type Content_Tag_Aggregate_Order_By = {
  avg?: InputMaybe<Content_Tag_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Content_Tag_Max_Order_By>;
  min?: InputMaybe<Content_Tag_Min_Order_By>;
  stddev?: InputMaybe<Content_Tag_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Content_Tag_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Content_Tag_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Content_Tag_Sum_Order_By>;
  var_pop?: InputMaybe<Content_Tag_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Content_Tag_Var_Samp_Order_By>;
  variance?: InputMaybe<Content_Tag_Variance_Order_By>;
};

/** order by avg() on columns of table "content_tag" */
export type Content_Tag_Avg_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "content_tag". All fields are combined with a logical 'AND'. */
export type Content_Tag_Bool_Exp = {
  _and?: InputMaybe<Array<Content_Tag_Bool_Exp>>;
  _not?: InputMaybe<Content_Tag_Bool_Exp>;
  _or?: InputMaybe<Array<Content_Tag_Bool_Exp>>;
  content_id?: InputMaybe<Bigint_Comparison_Exp>;
  tag?: InputMaybe<Tag_Bool_Exp>;
  tag_id?: InputMaybe<Int_Comparison_Exp>;
};

/** order by max() on columns of table "content_tag" */
export type Content_Tag_Max_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "content_tag" */
export type Content_Tag_Min_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "content_tag". */
export type Content_Tag_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag?: InputMaybe<Tag_Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** select columns of table "content_tag" */
export enum Content_Tag_Select_Column {
  /** column name */
  ContentId = 'content_id',
  /** column name */
  TagId = 'tag_id'
}

/** order by stddev() on columns of table "content_tag" */
export type Content_Tag_Stddev_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "content_tag" */
export type Content_Tag_Stddev_Pop_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "content_tag" */
export type Content_Tag_Stddev_Samp_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "content_tag" */
export type Content_Tag_Sum_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "content_tag" */
export type Content_Tag_Var_Pop_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "content_tag" */
export type Content_Tag_Var_Samp_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "content_tag" */
export type Content_Tag_Variance_Order_By = {
  content_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Content_Var_Pop_Fields = {
  __typename?: 'content_var_pop_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "content" */
export type Content_Var_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Content_Var_Samp_Fields = {
  __typename?: 'content_var_samp_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "content" */
export type Content_Var_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Content_Variance_Fields = {
  __typename?: 'content_variance_fields';
  category_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  post_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "content" */
export type Content_Variance_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "field" */
export type Field = {
  __typename?: 'field';
  /** An object relationship */
  field_post_type?: Maybe<Post_Type>;
  field_post_type_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  field_type: Field_Type;
  field_type_id: Scalars['Int'];
  id: Scalars['bigint'];
  multiple: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Int'];
  post_type_id: Scalars['Int'];
  required: Scalars['Boolean'];
  slug: Scalars['String'];
};

/** order by aggregate values of table "field" */
export type Field_Aggregate_Order_By = {
  avg?: InputMaybe<Field_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Field_Max_Order_By>;
  min?: InputMaybe<Field_Min_Order_By>;
  stddev?: InputMaybe<Field_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Field_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Field_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Field_Sum_Order_By>;
  var_pop?: InputMaybe<Field_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Field_Var_Samp_Order_By>;
  variance?: InputMaybe<Field_Variance_Order_By>;
};

/** order by avg() on columns of table "field" */
export type Field_Avg_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "field". All fields are combined with a logical 'AND'. */
export type Field_Bool_Exp = {
  _and?: InputMaybe<Array<Field_Bool_Exp>>;
  _not?: InputMaybe<Field_Bool_Exp>;
  _or?: InputMaybe<Array<Field_Bool_Exp>>;
  field_post_type?: InputMaybe<Post_Type_Bool_Exp>;
  field_post_type_id?: InputMaybe<Int_Comparison_Exp>;
  field_type?: InputMaybe<Field_Type_Bool_Exp>;
  field_type_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  multiple?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  post_type_id?: InputMaybe<Int_Comparison_Exp>;
  required?: InputMaybe<Boolean_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "field" */
export type Field_Max_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "field" */
export type Field_Min_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "field". */
export type Field_Order_By = {
  field_post_type?: InputMaybe<Post_Type_Order_By>;
  field_post_type_id?: InputMaybe<Order_By>;
  field_type?: InputMaybe<Field_Type_Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  multiple?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
  required?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** select columns of table "field" */
export enum Field_Select_Column {
  /** column name */
  FieldPostTypeId = 'field_post_type_id',
  /** column name */
  FieldTypeId = 'field_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  Multiple = 'multiple',
  /** column name */
  Name = 'name',
  /** column name */
  Order = 'order',
  /** column name */
  PostTypeId = 'post_type_id',
  /** column name */
  Required = 'required',
  /** column name */
  Slug = 'slug'
}

/** order by stddev() on columns of table "field" */
export type Field_Stddev_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "field" */
export type Field_Stddev_Pop_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "field" */
export type Field_Stddev_Samp_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "field" */
export type Field_Sum_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "field_type" */
export type Field_Type = {
  __typename?: 'field_type';
  id: Scalars['Int'];
  is_post: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Int'];
  slug: Scalars['String'];
};

/** Boolean expression to filter rows from the table "field_type". All fields are combined with a logical 'AND'. */
export type Field_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Field_Type_Bool_Exp>>;
  _not?: InputMaybe<Field_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Field_Type_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_post?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "field_type". */
export type Field_Type_Order_By = {
  id?: InputMaybe<Order_By>;
  is_post?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** select columns of table "field_type" */
export enum Field_Type_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsPost = 'is_post',
  /** column name */
  Name = 'name',
  /** column name */
  Order = 'order',
  /** column name */
  Slug = 'slug'
}

/** order by var_pop() on columns of table "field" */
export type Field_Var_Pop_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "field" */
export type Field_Var_Samp_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "field" */
export type Field_Variance_Order_By = {
  field_post_type_id?: InputMaybe<Order_By>;
  field_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "integer_value" */
export type Integer_Value = {
  __typename?: 'integer_value';
  body: Scalars['Int'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "integer_value". All fields are combined with a logical 'AND'. */
export type Integer_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Integer_Value_Bool_Exp>>;
  _not?: InputMaybe<Integer_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Integer_Value_Bool_Exp>>;
  body?: InputMaybe<Int_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "integer_value". */
export type Integer_Value_Order_By = {
  body?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "integer_value" */
export enum Integer_Value_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ValueId = 'value_id'
}

/** columns and relationships of "media" */
export type Media = {
  __typename?: 'media';
  created_at: Scalars['timestamptz'];
  id: Scalars['bigint'];
  media_type: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

/** Boolean expression to filter rows from the table "media". All fields are combined with a logical 'AND'. */
export type Media_Bool_Exp = {
  _and?: InputMaybe<Array<Media_Bool_Exp>>;
  _not?: InputMaybe<Media_Bool_Exp>;
  _or?: InputMaybe<Array<Media_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  media_type?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "media". */
export type Media_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  media_type?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "media" */
export enum Media_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  MediaType = 'media_type',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  Url = 'url'
}

/** columns and relationships of "media_value" */
export type Media_Value = {
  __typename?: 'media_value';
  /** An object relationship */
  body: Media;
  media_id: Scalars['bigint'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "media_value". All fields are combined with a logical 'AND'. */
export type Media_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Media_Value_Bool_Exp>>;
  _not?: InputMaybe<Media_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Media_Value_Bool_Exp>>;
  body?: InputMaybe<Media_Bool_Exp>;
  media_id?: InputMaybe<Bigint_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "media_value". */
export type Media_Value_Order_By = {
  body?: InputMaybe<Media_Order_By>;
  media_id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "media_value" */
export enum Media_Value_Select_Column {
  /** column name */
  MediaId = 'media_id',
  /** column name */
  ValueId = 'value_id'
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** columns and relationships of "numeric_value" */
export type Numeric_Value = {
  __typename?: 'numeric_value';
  body: Scalars['numeric'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "numeric_value". All fields are combined with a logical 'AND'. */
export type Numeric_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Numeric_Value_Bool_Exp>>;
  _not?: InputMaybe<Numeric_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Numeric_Value_Bool_Exp>>;
  body?: InputMaybe<Numeric_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "numeric_value". */
export type Numeric_Value_Order_By = {
  body?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "numeric_value" */
export enum Numeric_Value_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ValueId = 'value_id'
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** post */
export type Post = {
  __typename?: 'post';
  /** An array relationship */
  contents: Array<Content>;
  /** An aggregate relationship */
  contents_aggregate: Content_Aggregate;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['bigint'];
  /** An object relationship */
  post_type: Post_Type;
  post_type_id: Scalars['Int'];
};


/** post */
export type PostContentsArgs = {
  distinct_on?: InputMaybe<Array<Content_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Order_By>>;
  where?: InputMaybe<Content_Bool_Exp>;
};


/** post */
export type PostContents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Content_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Order_By>>;
  where?: InputMaybe<Content_Bool_Exp>;
};

/** aggregated selection of "post" */
export type Post_Aggregate = {
  __typename?: 'post_aggregate';
  aggregate?: Maybe<Post_Aggregate_Fields>;
  nodes: Array<Post>;
};

/** aggregate fields of "post" */
export type Post_Aggregate_Fields = {
  __typename?: 'post_aggregate_fields';
  avg?: Maybe<Post_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Post_Max_Fields>;
  min?: Maybe<Post_Min_Fields>;
  stddev?: Maybe<Post_Stddev_Fields>;
  stddev_pop?: Maybe<Post_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Post_Stddev_Samp_Fields>;
  sum?: Maybe<Post_Sum_Fields>;
  var_pop?: Maybe<Post_Var_Pop_Fields>;
  var_samp?: Maybe<Post_Var_Samp_Fields>;
  variance?: Maybe<Post_Variance_Fields>;
};


/** aggregate fields of "post" */
export type Post_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Post_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Post_Avg_Fields = {
  __typename?: 'post_avg_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "post". All fields are combined with a logical 'AND'. */
export type Post_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Bool_Exp>>;
  _not?: InputMaybe<Post_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Bool_Exp>>;
  contents?: InputMaybe<Content_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  post_type?: InputMaybe<Post_Type_Bool_Exp>;
  post_type_id?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Post_Max_Fields = {
  __typename?: 'post_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  post_type_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Post_Min_Fields = {
  __typename?: 'post_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  post_type_id?: Maybe<Scalars['Int']>;
};

/** Ordering options when selecting data from "post". */
export type Post_Order_By = {
  contents_aggregate?: InputMaybe<Content_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_type?: InputMaybe<Post_Type_Order_By>;
  post_type_id?: InputMaybe<Order_By>;
};

/** select columns of table "post" */
export enum Post_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  PostTypeId = 'post_type_id'
}

/** aggregate stddev on columns */
export type Post_Stddev_Fields = {
  __typename?: 'post_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Post_Stddev_Pop_Fields = {
  __typename?: 'post_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Post_Stddev_Samp_Fields = {
  __typename?: 'post_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Post_Sum_Fields = {
  __typename?: 'post_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  post_type_id?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "post_type" */
export type Post_Type = {
  __typename?: 'post_type';
  /** An array relationship */
  fields: Array<Field>;
  icon_tag?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  order: Scalars['Int'];
  slug: Scalars['String'];
};


/** columns and relationships of "post_type" */
export type Post_TypeFieldsArgs = {
  distinct_on?: InputMaybe<Array<Field_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Field_Order_By>>;
  where?: InputMaybe<Field_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "post_type". All fields are combined with a logical 'AND'. */
export type Post_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Type_Bool_Exp>>;
  _not?: InputMaybe<Post_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Type_Bool_Exp>>;
  fields?: InputMaybe<Field_Bool_Exp>;
  icon_tag?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "post_type". */
export type Post_Type_Order_By = {
  fields_aggregate?: InputMaybe<Field_Aggregate_Order_By>;
  icon_tag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** select columns of table "post_type" */
export enum Post_Type_Select_Column {
  /** column name */
  IconTag = 'icon_tag',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Order = 'order',
  /** column name */
  Slug = 'slug'
}

/** columns and relationships of "post_value" */
export type Post_Value = {
  __typename?: 'post_value';
  /** An object relationship */
  body: Post;
  post_id: Scalars['bigint'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "post_value". All fields are combined with a logical 'AND'. */
export type Post_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Value_Bool_Exp>>;
  _not?: InputMaybe<Post_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Value_Bool_Exp>>;
  body?: InputMaybe<Post_Bool_Exp>;
  post_id?: InputMaybe<Bigint_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "post_value". */
export type Post_Value_Order_By = {
  body?: InputMaybe<Post_Order_By>;
  post_id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "post_value" */
export enum Post_Value_Select_Column {
  /** column name */
  PostId = 'post_id',
  /** column name */
  ValueId = 'value_id'
}

/** aggregate var_pop on columns */
export type Post_Var_Pop_Fields = {
  __typename?: 'post_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Post_Var_Samp_Fields = {
  __typename?: 'post_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Post_Variance_Fields = {
  __typename?: 'post_variance_fields';
  id?: Maybe<Scalars['Float']>;
  post_type_id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "boolean_value" */
  boolean_value: Array<Boolean_Value>;
  /** fetch data from the table: "boolean_value" using primary key columns */
  boolean_value_by_pk?: Maybe<Boolean_Value>;
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** fetch data from the table: "content" */
  content: Array<Content>;
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: Content_Aggregate;
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk?: Maybe<Content>;
  /** fetch data from the table: "content_tag" */
  content_tag: Array<Content_Tag>;
  /** fetch data from the table: "content_tag" using primary key columns */
  content_tag_by_pk?: Maybe<Content_Tag>;
  /** fetch data from the table: "field" */
  field: Array<Field>;
  /** fetch data from the table: "field" using primary key columns */
  field_by_pk?: Maybe<Field>;
  /** fetch data from the table: "field_type" */
  field_type: Array<Field_Type>;
  /** fetch data from the table: "field_type" using primary key columns */
  field_type_by_pk?: Maybe<Field_Type>;
  /** fetch data from the table: "integer_value" */
  integer_value: Array<Integer_Value>;
  /** fetch data from the table: "integer_value" using primary key columns */
  integer_value_by_pk?: Maybe<Integer_Value>;
  /** fetch data from the table: "media" */
  media: Array<Media>;
  /** fetch data from the table: "media" using primary key columns */
  media_by_pk?: Maybe<Media>;
  /** fetch data from the table: "media_value" */
  media_value: Array<Media_Value>;
  /** fetch data from the table: "media_value" using primary key columns */
  media_value_by_pk?: Maybe<Media_Value>;
  /** fetch data from the table: "numeric_value" */
  numeric_value: Array<Numeric_Value>;
  /** fetch data from the table: "numeric_value" using primary key columns */
  numeric_value_by_pk?: Maybe<Numeric_Value>;
  /** fetch data from the table: "post" */
  post: Array<Post>;
  /** fetch aggregated fields from the table: "post" */
  post_aggregate: Post_Aggregate;
  /** fetch data from the table: "post" using primary key columns */
  post_by_pk?: Maybe<Post>;
  /** fetch data from the table: "post_type" */
  post_type: Array<Post_Type>;
  /** fetch data from the table: "post_type" using primary key columns */
  post_type_by_pk?: Maybe<Post_Type>;
  /** fetch data from the table: "post_value" */
  post_value: Array<Post_Value>;
  /** fetch data from the table: "post_value" using primary key columns */
  post_value_by_pk?: Maybe<Post_Value>;
  /** fetch data from the table: "tag" */
  tag: Array<Tag>;
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>;
  /** fetch data from the table: "text_value" */
  text_value: Array<Text_Value>;
  /** fetch data from the table: "text_value" using primary key columns */
  text_value_by_pk?: Maybe<Text_Value>;
  /** fetch data from the table: "timestamp_value" */
  timestamp_value: Array<Timestamp_Value>;
  /** fetch data from the table: "timestamp_value" using primary key columns */
  timestamp_value_by_pk?: Maybe<Timestamp_Value>;
  /** fetch data from the table: "value" */
  value: Array<Value>;
  /** fetch data from the table: "value" using primary key columns */
  value_by_pk?: Maybe<Value>;
};


export type Query_RootBoolean_ValueArgs = {
  distinct_on?: InputMaybe<Array<Boolean_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Boolean_Value_Order_By>>;
  where?: InputMaybe<Boolean_Value_Bool_Exp>;
};


export type Query_RootBoolean_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootCategoryArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Query_RootCategory_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootContentArgs = {
  distinct_on?: InputMaybe<Array<Content_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Order_By>>;
  where?: InputMaybe<Content_Bool_Exp>;
};


export type Query_RootContent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Content_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Order_By>>;
  where?: InputMaybe<Content_Bool_Exp>;
};


export type Query_RootContent_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootContent_TagArgs = {
  distinct_on?: InputMaybe<Array<Content_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Tag_Order_By>>;
  where?: InputMaybe<Content_Tag_Bool_Exp>;
};


export type Query_RootContent_Tag_By_PkArgs = {
  content_id: Scalars['bigint'];
  tag_id: Scalars['Int'];
};


export type Query_RootFieldArgs = {
  distinct_on?: InputMaybe<Array<Field_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Field_Order_By>>;
  where?: InputMaybe<Field_Bool_Exp>;
};


export type Query_RootField_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootField_TypeArgs = {
  distinct_on?: InputMaybe<Array<Field_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Field_Type_Order_By>>;
  where?: InputMaybe<Field_Type_Bool_Exp>;
};


export type Query_RootField_Type_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInteger_ValueArgs = {
  distinct_on?: InputMaybe<Array<Integer_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integer_Value_Order_By>>;
  where?: InputMaybe<Integer_Value_Bool_Exp>;
};


export type Query_RootInteger_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootMediaArgs = {
  distinct_on?: InputMaybe<Array<Media_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Media_Order_By>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Query_RootMedia_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootMedia_ValueArgs = {
  distinct_on?: InputMaybe<Array<Media_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Media_Value_Order_By>>;
  where?: InputMaybe<Media_Value_Bool_Exp>;
};


export type Query_RootMedia_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootNumeric_ValueArgs = {
  distinct_on?: InputMaybe<Array<Numeric_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Numeric_Value_Order_By>>;
  where?: InputMaybe<Numeric_Value_Bool_Exp>;
};


export type Query_RootNumeric_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootPostArgs = {
  distinct_on?: InputMaybe<Array<Post_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Order_By>>;
  where?: InputMaybe<Post_Bool_Exp>;
};


export type Query_RootPost_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Order_By>>;
  where?: InputMaybe<Post_Bool_Exp>;
};


export type Query_RootPost_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootPost_TypeArgs = {
  distinct_on?: InputMaybe<Array<Post_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Type_Order_By>>;
  where?: InputMaybe<Post_Type_Bool_Exp>;
};


export type Query_RootPost_Type_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPost_ValueArgs = {
  distinct_on?: InputMaybe<Array<Post_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Value_Order_By>>;
  where?: InputMaybe<Post_Value_Bool_Exp>;
};


export type Query_RootPost_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootTagArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Query_RootTag_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootText_ValueArgs = {
  distinct_on?: InputMaybe<Array<Text_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Text_Value_Order_By>>;
  where?: InputMaybe<Text_Value_Bool_Exp>;
};


export type Query_RootText_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootTimestamp_ValueArgs = {
  distinct_on?: InputMaybe<Array<Timestamp_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timestamp_Value_Order_By>>;
  where?: InputMaybe<Timestamp_Value_Bool_Exp>;
};


export type Query_RootTimestamp_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Query_RootValueArgs = {
  distinct_on?: InputMaybe<Array<Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Value_Order_By>>;
  where?: InputMaybe<Value_Bool_Exp>;
};


export type Query_RootValue_By_PkArgs = {
  id: Scalars['bigint'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "boolean_value" */
  boolean_value: Array<Boolean_Value>;
  /** fetch data from the table: "boolean_value" using primary key columns */
  boolean_value_by_pk?: Maybe<Boolean_Value>;
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** fetch data from the table: "content" */
  content: Array<Content>;
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: Content_Aggregate;
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk?: Maybe<Content>;
  /** fetch data from the table: "content_tag" */
  content_tag: Array<Content_Tag>;
  /** fetch data from the table: "content_tag" using primary key columns */
  content_tag_by_pk?: Maybe<Content_Tag>;
  /** fetch data from the table: "field" */
  field: Array<Field>;
  /** fetch data from the table: "field" using primary key columns */
  field_by_pk?: Maybe<Field>;
  /** fetch data from the table: "field_type" */
  field_type: Array<Field_Type>;
  /** fetch data from the table: "field_type" using primary key columns */
  field_type_by_pk?: Maybe<Field_Type>;
  /** fetch data from the table: "integer_value" */
  integer_value: Array<Integer_Value>;
  /** fetch data from the table: "integer_value" using primary key columns */
  integer_value_by_pk?: Maybe<Integer_Value>;
  /** fetch data from the table: "media" */
  media: Array<Media>;
  /** fetch data from the table: "media" using primary key columns */
  media_by_pk?: Maybe<Media>;
  /** fetch data from the table: "media_value" */
  media_value: Array<Media_Value>;
  /** fetch data from the table: "media_value" using primary key columns */
  media_value_by_pk?: Maybe<Media_Value>;
  /** fetch data from the table: "numeric_value" */
  numeric_value: Array<Numeric_Value>;
  /** fetch data from the table: "numeric_value" using primary key columns */
  numeric_value_by_pk?: Maybe<Numeric_Value>;
  /** fetch data from the table: "post" */
  post: Array<Post>;
  /** fetch aggregated fields from the table: "post" */
  post_aggregate: Post_Aggregate;
  /** fetch data from the table: "post" using primary key columns */
  post_by_pk?: Maybe<Post>;
  /** fetch data from the table: "post_type" */
  post_type: Array<Post_Type>;
  /** fetch data from the table: "post_type" using primary key columns */
  post_type_by_pk?: Maybe<Post_Type>;
  /** fetch data from the table: "post_value" */
  post_value: Array<Post_Value>;
  /** fetch data from the table: "post_value" using primary key columns */
  post_value_by_pk?: Maybe<Post_Value>;
  /** fetch data from the table: "tag" */
  tag: Array<Tag>;
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>;
  /** fetch data from the table: "text_value" */
  text_value: Array<Text_Value>;
  /** fetch data from the table: "text_value" using primary key columns */
  text_value_by_pk?: Maybe<Text_Value>;
  /** fetch data from the table: "timestamp_value" */
  timestamp_value: Array<Timestamp_Value>;
  /** fetch data from the table: "timestamp_value" using primary key columns */
  timestamp_value_by_pk?: Maybe<Timestamp_Value>;
  /** fetch data from the table: "value" */
  value: Array<Value>;
  /** fetch data from the table: "value" using primary key columns */
  value_by_pk?: Maybe<Value>;
};


export type Subscription_RootBoolean_ValueArgs = {
  distinct_on?: InputMaybe<Array<Boolean_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Boolean_Value_Order_By>>;
  where?: InputMaybe<Boolean_Value_Bool_Exp>;
};


export type Subscription_RootBoolean_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootCategoryArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Subscription_RootCategory_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootContentArgs = {
  distinct_on?: InputMaybe<Array<Content_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Order_By>>;
  where?: InputMaybe<Content_Bool_Exp>;
};


export type Subscription_RootContent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Content_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Order_By>>;
  where?: InputMaybe<Content_Bool_Exp>;
};


export type Subscription_RootContent_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootContent_TagArgs = {
  distinct_on?: InputMaybe<Array<Content_Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Content_Tag_Order_By>>;
  where?: InputMaybe<Content_Tag_Bool_Exp>;
};


export type Subscription_RootContent_Tag_By_PkArgs = {
  content_id: Scalars['bigint'];
  tag_id: Scalars['Int'];
};


export type Subscription_RootFieldArgs = {
  distinct_on?: InputMaybe<Array<Field_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Field_Order_By>>;
  where?: InputMaybe<Field_Bool_Exp>;
};


export type Subscription_RootField_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootField_TypeArgs = {
  distinct_on?: InputMaybe<Array<Field_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Field_Type_Order_By>>;
  where?: InputMaybe<Field_Type_Bool_Exp>;
};


export type Subscription_RootField_Type_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInteger_ValueArgs = {
  distinct_on?: InputMaybe<Array<Integer_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integer_Value_Order_By>>;
  where?: InputMaybe<Integer_Value_Bool_Exp>;
};


export type Subscription_RootInteger_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootMediaArgs = {
  distinct_on?: InputMaybe<Array<Media_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Media_Order_By>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Subscription_RootMedia_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootMedia_ValueArgs = {
  distinct_on?: InputMaybe<Array<Media_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Media_Value_Order_By>>;
  where?: InputMaybe<Media_Value_Bool_Exp>;
};


export type Subscription_RootMedia_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootNumeric_ValueArgs = {
  distinct_on?: InputMaybe<Array<Numeric_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Numeric_Value_Order_By>>;
  where?: InputMaybe<Numeric_Value_Bool_Exp>;
};


export type Subscription_RootNumeric_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootPostArgs = {
  distinct_on?: InputMaybe<Array<Post_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Order_By>>;
  where?: InputMaybe<Post_Bool_Exp>;
};


export type Subscription_RootPost_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Order_By>>;
  where?: InputMaybe<Post_Bool_Exp>;
};


export type Subscription_RootPost_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootPost_TypeArgs = {
  distinct_on?: InputMaybe<Array<Post_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Type_Order_By>>;
  where?: InputMaybe<Post_Type_Bool_Exp>;
};


export type Subscription_RootPost_Type_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPost_ValueArgs = {
  distinct_on?: InputMaybe<Array<Post_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Value_Order_By>>;
  where?: InputMaybe<Post_Value_Bool_Exp>;
};


export type Subscription_RootPost_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootTagArgs = {
  distinct_on?: InputMaybe<Array<Tag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tag_Order_By>>;
  where?: InputMaybe<Tag_Bool_Exp>;
};


export type Subscription_RootTag_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootText_ValueArgs = {
  distinct_on?: InputMaybe<Array<Text_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Text_Value_Order_By>>;
  where?: InputMaybe<Text_Value_Bool_Exp>;
};


export type Subscription_RootText_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootTimestamp_ValueArgs = {
  distinct_on?: InputMaybe<Array<Timestamp_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Timestamp_Value_Order_By>>;
  where?: InputMaybe<Timestamp_Value_Bool_Exp>;
};


export type Subscription_RootTimestamp_Value_By_PkArgs = {
  value_id: Scalars['bigint'];
};


export type Subscription_RootValueArgs = {
  distinct_on?: InputMaybe<Array<Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Value_Order_By>>;
  where?: InputMaybe<Value_Bool_Exp>;
};


export type Subscription_RootValue_By_PkArgs = {
  id: Scalars['bigint'];
};

/** columns and relationships of "tag" */
export type Tag = {
  __typename?: 'tag';
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** Boolean expression to filter rows from the table "tag". All fields are combined with a logical 'AND'. */
export type Tag_Bool_Exp = {
  _and?: InputMaybe<Array<Tag_Bool_Exp>>;
  _not?: InputMaybe<Tag_Bool_Exp>;
  _or?: InputMaybe<Array<Tag_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "tag". */
export type Tag_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** select columns of table "tag" */
export enum Tag_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}

/** columns and relationships of "text_value" */
export type Text_Value = {
  __typename?: 'text_value';
  body: Scalars['String'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "text_value". All fields are combined with a logical 'AND'. */
export type Text_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Text_Value_Bool_Exp>>;
  _not?: InputMaybe<Text_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Text_Value_Bool_Exp>>;
  body?: InputMaybe<String_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "text_value". */
export type Text_Value_Order_By = {
  body?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "text_value" */
export enum Text_Value_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ValueId = 'value_id'
}

/** columns and relationships of "timestamp_value" */
export type Timestamp_Value = {
  __typename?: 'timestamp_value';
  body: Scalars['timestamptz'];
  value_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "timestamp_value". All fields are combined with a logical 'AND'. */
export type Timestamp_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Timestamp_Value_Bool_Exp>>;
  _not?: InputMaybe<Timestamp_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Timestamp_Value_Bool_Exp>>;
  body?: InputMaybe<Timestamptz_Comparison_Exp>;
  value_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "timestamp_value". */
export type Timestamp_Value_Order_By = {
  body?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
};

/** select columns of table "timestamp_value" */
export enum Timestamp_Value_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ValueId = 'value_id'
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "value" */
export type Value = {
  __typename?: 'value';
  /** An object relationship */
  boolean?: Maybe<Boolean_Value>;
  content_id: Scalars['bigint'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  field: Field;
  field_id: Scalars['bigint'];
  id: Scalars['bigint'];
  /** An object relationship */
  integer?: Maybe<Integer_Value>;
  /** An object relationship */
  media?: Maybe<Media_Value>;
  /** An object relationship */
  numeric?: Maybe<Numeric_Value>;
  /** An object relationship */
  post?: Maybe<Post_Value>;
  /** An object relationship */
  text?: Maybe<Text_Value>;
  /** An object relationship */
  timestamp?: Maybe<Timestamp_Value>;
};

/** order by aggregate values of table "value" */
export type Value_Aggregate_Order_By = {
  avg?: InputMaybe<Value_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Value_Max_Order_By>;
  min?: InputMaybe<Value_Min_Order_By>;
  stddev?: InputMaybe<Value_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Value_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Value_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Value_Sum_Order_By>;
  var_pop?: InputMaybe<Value_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Value_Var_Samp_Order_By>;
  variance?: InputMaybe<Value_Variance_Order_By>;
};

/** order by avg() on columns of table "value" */
export type Value_Avg_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "value". All fields are combined with a logical 'AND'. */
export type Value_Bool_Exp = {
  _and?: InputMaybe<Array<Value_Bool_Exp>>;
  _not?: InputMaybe<Value_Bool_Exp>;
  _or?: InputMaybe<Array<Value_Bool_Exp>>;
  boolean?: InputMaybe<Boolean_Value_Bool_Exp>;
  content_id?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  field?: InputMaybe<Field_Bool_Exp>;
  field_id?: InputMaybe<Bigint_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  integer?: InputMaybe<Integer_Value_Bool_Exp>;
  media?: InputMaybe<Media_Value_Bool_Exp>;
  numeric?: InputMaybe<Numeric_Value_Bool_Exp>;
  post?: InputMaybe<Post_Value_Bool_Exp>;
  text?: InputMaybe<Text_Value_Bool_Exp>;
  timestamp?: InputMaybe<Timestamp_Value_Bool_Exp>;
};

/** order by max() on columns of table "value" */
export type Value_Max_Order_By = {
  content_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "value" */
export type Value_Min_Order_By = {
  content_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "value". */
export type Value_Order_By = {
  boolean?: InputMaybe<Boolean_Value_Order_By>;
  content_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  field?: InputMaybe<Field_Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  integer?: InputMaybe<Integer_Value_Order_By>;
  media?: InputMaybe<Media_Value_Order_By>;
  numeric?: InputMaybe<Numeric_Value_Order_By>;
  post?: InputMaybe<Post_Value_Order_By>;
  text?: InputMaybe<Text_Value_Order_By>;
  timestamp?: InputMaybe<Timestamp_Value_Order_By>;
};

/** select columns of table "value" */
export enum Value_Select_Column {
  /** column name */
  ContentId = 'content_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FieldId = 'field_id',
  /** column name */
  Id = 'id'
}

/** order by stddev() on columns of table "value" */
export type Value_Stddev_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "value" */
export type Value_Stddev_Pop_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "value" */
export type Value_Stddev_Samp_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "value" */
export type Value_Sum_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "value" */
export type Value_Var_Pop_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "value" */
export type Value_Var_Samp_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "value" */
export type Value_Variance_Order_By = {
  content_id?: InputMaybe<Order_By>;
  field_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

export type GetCategoriesQueryVariables = Exact<{
  post_type_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetCategoriesQuery = { __typename?: 'query_root', category: Array<{ __typename?: 'category', id: number, slug: string, name: string }> };

export type GetMediaQueryVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type GetMediaQuery = { __typename?: 'query_root', media_by_pk?: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number, created_at: any } | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type GetPostQuery = { __typename?: 'query_root', post_by_pk?: { __typename?: 'post', id: any, created_at: any, deleted_at?: any | null, contents: Array<{ __typename?: 'content', id: any, title: string, created_at: any, category_id: number, values: Array<{ __typename?: 'value', id: any, field_id: any, field: { __typename?: 'field', id: any, slug: string, name: string }, text?: { __typename?: 'text_value', body: string } | null, numeric?: { __typename?: 'numeric_value', body: any } | null, integer?: { __typename?: 'integer_value', body: number } | null, media?: { __typename?: 'media_value', body: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number } } | null, post?: { __typename?: 'post_value', body: { __typename?: 'post', id: any, contents: Array<{ __typename?: 'content', id: any, title: string, created_at: any, values: Array<{ __typename?: 'value', id: any, field_id: any, field: { __typename?: 'field', id: any, slug: string, name: string }, text?: { __typename?: 'text_value', body: string } | null, numeric?: { __typename?: 'numeric_value', body: any } | null, integer?: { __typename?: 'integer_value', body: number } | null, media?: { __typename?: 'media_value', body: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number } } | null, post?: { __typename?: 'post_value', body: { __typename?: 'post', id: any, contents: Array<{ __typename?: 'content', title: string }> } } | null, timestamp?: { __typename?: 'timestamp_value', body: any } | null, boolean?: { __typename?: 'boolean_value', body: boolean } | null }> }> } } | null, timestamp?: { __typename?: 'timestamp_value', body: any } | null, boolean?: { __typename?: 'boolean_value', body: boolean } | null }>, category: { __typename?: 'category', id: number, slug: string, name: string }, tags: Array<{ __typename?: 'content_tag', tag: { __typename?: 'tag', id: number, slug: string, name: string } }> }>, post_type: { __typename?: 'post_type', id: number, slug: string, name: string, fields: Array<{ __typename?: 'field', id: any, slug: string, name: string, field_type_id: number, required: boolean, multiple: boolean, order: number, field_post_type_id?: number | null, field_type: { __typename?: 'field_type', id: number, slug: string, name: string, order: number, is_post: boolean }, field_post_type?: { __typename?: 'post_type', id: number, slug: string, name: string } | null }> } } | null };

export type GetPostsQueryVariables = Exact<{
  post_type_slug?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Post_Order_By> | Post_Order_By>;
}>;


export type GetPostsQuery = { __typename?: 'query_root', post_type: Array<{ __typename?: 'post_type', id: number, slug: string, name: string }>, post: Array<{ __typename?: 'post', id: any, created_at: any, contents: Array<{ __typename?: 'content', id: any, title: string, created_at: any, values: Array<{ __typename?: 'value', id: any, field_id: any, field: { __typename?: 'field', id: any, slug: string, name: string }, text?: { __typename?: 'text_value', body: string } | null, numeric?: { __typename?: 'numeric_value', body: any } | null, integer?: { __typename?: 'integer_value', body: number } | null, media?: { __typename?: 'media_value', body: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number } } | null, post?: { __typename?: 'post_value', body: { __typename?: 'post', id: any, contents: Array<{ __typename?: 'content', id: any, title: string, created_at: any, values: Array<{ __typename?: 'value', id: any, field_id: any, field: { __typename?: 'field', id: any, slug: string, name: string }, text?: { __typename?: 'text_value', body: string } | null, numeric?: { __typename?: 'numeric_value', body: any } | null, integer?: { __typename?: 'integer_value', body: number } | null, media?: { __typename?: 'media_value', body: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number } } | null, post?: { __typename?: 'post_value', body: { __typename?: 'post', id: any, contents: Array<{ __typename?: 'content', title: string }> } } | null, timestamp?: { __typename?: 'timestamp_value', body: any } | null, boolean?: { __typename?: 'boolean_value', body: boolean } | null }> }> } } | null, timestamp?: { __typename?: 'timestamp_value', body: any } | null, boolean?: { __typename?: 'boolean_value', body: boolean } | null }>, category: { __typename?: 'category', id: number, slug: string, name: string }, tags: Array<{ __typename?: 'content_tag', tag: { __typename?: 'tag', id: number, slug: string, name: string } }> }>, post_type: { __typename?: 'post_type', id: number, slug: string, name: string } }>, post_aggregate: { __typename?: 'post_aggregate', aggregate?: { __typename?: 'post_aggregate_fields', count: number } | null } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'query_root', tag: Array<{ __typename?: 'tag', id: number, slug: string, name: string }> };

export type SearchPostQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  post_type_slug?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  category_ids?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  tag_ids?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type SearchPostQuery = { __typename?: 'query_root', content: Array<{ __typename?: 'content', post: { __typename?: 'post', id: any, created_at: any, contents: Array<{ __typename?: 'content', id: any, title: string, created_at: any, values: Array<{ __typename?: 'value', id: any, field_id: any, field: { __typename?: 'field', id: any, slug: string, name: string }, text?: { __typename?: 'text_value', body: string } | null, numeric?: { __typename?: 'numeric_value', body: any } | null, integer?: { __typename?: 'integer_value', body: number } | null, media?: { __typename?: 'media_value', body: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number } } | null, post?: { __typename?: 'post_value', body: { __typename?: 'post', id: any, contents: Array<{ __typename?: 'content', id: any, title: string, created_at: any, values: Array<{ __typename?: 'value', id: any, field_id: any, field: { __typename?: 'field', id: any, slug: string, name: string }, text?: { __typename?: 'text_value', body: string } | null, numeric?: { __typename?: 'numeric_value', body: any } | null, integer?: { __typename?: 'integer_value', body: number } | null, media?: { __typename?: 'media_value', body: { __typename?: 'media', id: any, name: string, url: string, media_type: string, size: number } } | null, post?: { __typename?: 'post_value', body: { __typename?: 'post', id: any, contents: Array<{ __typename?: 'content', title: string }> } } | null, timestamp?: { __typename?: 'timestamp_value', body: any } | null, boolean?: { __typename?: 'boolean_value', body: boolean } | null }> }> } } | null, timestamp?: { __typename?: 'timestamp_value', body: any } | null, boolean?: { __typename?: 'boolean_value', body: boolean } | null }>, category: { __typename?: 'category', id: number, slug: string, name: string }, tags: Array<{ __typename?: 'content_tag', tag: { __typename?: 'tag', id: number, slug: string, name: string } }> }>, post_type: { __typename?: 'post_type', id: number, slug: string, name: string } } }>, content_aggregate: { __typename?: 'content_aggregate', aggregate?: { __typename?: 'content_aggregate_fields', count: number } | null } };


export const GetCategoriesDocument = `
    query GetCategories($post_type_id: Int) {
  category(order_by: {id: asc}, where: {post_type_id: {_eq: $post_type_id}}) {
    id
    slug
    name
  }
}
    `;
export const useGetCategoriesQuery = <
      TData = GetCategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetCategoriesQueryVariables,
      options?: UseQueryOptions<GetCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCategoriesQuery, TError, TData>(
      variables === undefined ? ['GetCategories'] : ['GetCategories', variables],
      fetcher<GetCategoriesQuery, GetCategoriesQueryVariables>(client, GetCategoriesDocument, variables, headers),
      options
    );

useGetCategoriesQuery.getKey = (variables?: GetCategoriesQueryVariables) => variables === undefined ? ['GetCategories'] : ['GetCategories', variables];
;

export const useInfiniteGetCategoriesQuery = <
      TData = GetCategoriesQuery,
      TError = unknown
    >(
      _pageParamKey: keyof GetCategoriesQueryVariables,
      client: GraphQLClient,
      variables?: GetCategoriesQueryVariables,
      options?: UseInfiniteQueryOptions<GetCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetCategoriesQuery, TError, TData>(
      variables === undefined ? ['GetCategories.infinite'] : ['GetCategories.infinite', variables],
      (metaData) => fetcher<GetCategoriesQuery, GetCategoriesQueryVariables>(client, GetCategoriesDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );


useInfiniteGetCategoriesQuery.getKey = (variables?: GetCategoriesQueryVariables) => variables === undefined ? ['GetCategories.infinite'] : ['GetCategories.infinite', variables];
;

useGetCategoriesQuery.fetcher = (client: GraphQLClient, variables?: GetCategoriesQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCategoriesQuery, GetCategoriesQueryVariables>(client, GetCategoriesDocument, variables, headers);
export const GetMediaDocument = `
    query GetMedia($id: bigint!) {
  media_by_pk(id: $id) {
    id
    name
    url
    media_type
    size
    created_at
  }
}
    `;
export const useGetMediaQuery = <
      TData = GetMediaQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetMediaQueryVariables,
      options?: UseQueryOptions<GetMediaQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMediaQuery, TError, TData>(
      ['GetMedia', variables],
      fetcher<GetMediaQuery, GetMediaQueryVariables>(client, GetMediaDocument, variables, headers),
      options
    );

useGetMediaQuery.getKey = (variables: GetMediaQueryVariables) => ['GetMedia', variables];
;

export const useInfiniteGetMediaQuery = <
      TData = GetMediaQuery,
      TError = unknown
    >(
      _pageParamKey: keyof GetMediaQueryVariables,
      client: GraphQLClient,
      variables: GetMediaQueryVariables,
      options?: UseInfiniteQueryOptions<GetMediaQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetMediaQuery, TError, TData>(
      ['GetMedia.infinite', variables],
      (metaData) => fetcher<GetMediaQuery, GetMediaQueryVariables>(client, GetMediaDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );


useInfiniteGetMediaQuery.getKey = (variables: GetMediaQueryVariables) => ['GetMedia.infinite', variables];
;

useGetMediaQuery.fetcher = (client: GraphQLClient, variables: GetMediaQueryVariables, headers?: RequestInit['headers']) => fetcher<GetMediaQuery, GetMediaQueryVariables>(client, GetMediaDocument, variables, headers);
export const GetPostDocument = `
    query GetPost($id: bigint!) {
  post_by_pk(id: $id) {
    id
    contents(order_by: {created_at: desc}) {
      id
      title
      created_at
      values {
        id
        field_id
        field {
          id
          slug
          name
        }
        text {
          body
        }
        numeric {
          body
        }
        integer {
          body
        }
        media {
          body {
            id
            name
            url
            media_type
            size
          }
        }
        post {
          body {
            id
            contents(order_by: {created_at: desc}) {
              id
              title
              created_at
              values {
                id
                field_id
                field {
                  id
                  slug
                  name
                }
                text {
                  body
                }
                numeric {
                  body
                }
                integer {
                  body
                }
                media {
                  body {
                    id
                    name
                    url
                    media_type
                    size
                  }
                }
                post {
                  body {
                    id
                    contents {
                      title
                    }
                  }
                }
                timestamp {
                  body
                }
                boolean {
                  body
                }
              }
            }
          }
        }
        timestamp {
          body
        }
        boolean {
          body
        }
      }
      category_id
      category {
        id
        slug
        name
      }
      tags(order_by: {tag_id: asc}) {
        tag {
          id
          slug
          name
        }
      }
    }
    post_type {
      id
      slug
      name
      fields(order_by: {order: asc}) {
        id
        slug
        name
        field_type_id
        field_type {
          id
          slug
          name
          order
          is_post
        }
        required
        multiple
        order
        field_post_type_id
        field_post_type {
          id
          slug
          name
        }
      }
    }
    created_at
    deleted_at
  }
}
    `;
export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostQueryVariables,
      options?: UseQueryOptions<GetPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostQuery, TError, TData>(
      ['GetPost', variables],
      fetcher<GetPostQuery, GetPostQueryVariables>(client, GetPostDocument, variables, headers),
      options
    );

useGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPost', variables];
;

export const useInfiniteGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      _pageParamKey: keyof GetPostQueryVariables,
      client: GraphQLClient,
      variables: GetPostQueryVariables,
      options?: UseInfiniteQueryOptions<GetPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetPostQuery, TError, TData>(
      ['GetPost.infinite', variables],
      (metaData) => fetcher<GetPostQuery, GetPostQueryVariables>(client, GetPostDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );


useInfiniteGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPost.infinite', variables];
;

useGetPostQuery.fetcher = (client: GraphQLClient, variables: GetPostQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostQuery, GetPostQueryVariables>(client, GetPostDocument, variables, headers);
export const GetPostsDocument = `
    query GetPosts($post_type_slug: [String!] = [], $limit: Int = 10, $offset: Int = 0, $order_by: [post_order_by!] = {created_at: desc}) {
  post_type(where: {slug: {_in: $post_type_slug}}) {
    id
    slug
    name
  }
  post(
    limit: $limit
    offset: $offset
    order_by: $order_by
    where: {_and: {deleted_at: {_is_null: true}, post_type: {slug: {_in: $post_type_slug}}}}
  ) {
    id
    contents(order_by: {created_at: desc}) {
      id
      title
      created_at
      values {
        id
        field_id
        field {
          id
          slug
          name
        }
        text {
          body
        }
        numeric {
          body
        }
        integer {
          body
        }
        media {
          body {
            id
            name
            url
            media_type
            size
          }
        }
        post {
          body {
            id
            contents(order_by: {created_at: desc}) {
              id
              title
              created_at
              values {
                id
                field_id
                field {
                  id
                  slug
                  name
                }
                text {
                  body
                }
                numeric {
                  body
                }
                integer {
                  body
                }
                media {
                  body {
                    id
                    name
                    url
                    media_type
                    size
                  }
                }
                post {
                  body {
                    id
                    contents {
                      title
                    }
                  }
                }
                timestamp {
                  body
                }
                boolean {
                  body
                }
              }
            }
          }
        }
        timestamp {
          body
        }
        boolean {
          body
        }
      }
      category {
        id
        slug
        name
      }
      tags(order_by: {tag_id: asc}) {
        tag {
          id
          slug
          name
        }
      }
    }
    post_type {
      id
      slug
      name
    }
    created_at
  }
  post_aggregate(
    where: {_and: {deleted_at: {_is_null: true}, post_type: {slug: {_in: $post_type_slug}}}}
  ) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsQuery, TError, TData>(
      variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
      options
    );

useGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts'] : ['GetPosts', variables];
;

export const useInfiniteGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      _pageParamKey: keyof GetPostsQueryVariables,
      client: GraphQLClient,
      variables?: GetPostsQueryVariables,
      options?: UseInfiniteQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetPostsQuery, TError, TData>(
      variables === undefined ? ['GetPosts.infinite'] : ['GetPosts.infinite', variables],
      (metaData) => fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );


useInfiniteGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts.infinite'] : ['GetPosts.infinite', variables];
;

useGetPostsQuery.fetcher = (client: GraphQLClient, variables?: GetPostsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers);
export const GetTagsDocument = `
    query GetTags {
  tag(order_by: {id: asc}) {
    id
    slug
    name
  }
}
    `;
export const useGetTagsQuery = <
      TData = GetTagsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetTagsQueryVariables,
      options?: UseQueryOptions<GetTagsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetTagsQuery, TError, TData>(
      variables === undefined ? ['GetTags'] : ['GetTags', variables],
      fetcher<GetTagsQuery, GetTagsQueryVariables>(client, GetTagsDocument, variables, headers),
      options
    );

useGetTagsQuery.getKey = (variables?: GetTagsQueryVariables) => variables === undefined ? ['GetTags'] : ['GetTags', variables];
;

export const useInfiniteGetTagsQuery = <
      TData = GetTagsQuery,
      TError = unknown
    >(
      _pageParamKey: keyof GetTagsQueryVariables,
      client: GraphQLClient,
      variables?: GetTagsQueryVariables,
      options?: UseInfiniteQueryOptions<GetTagsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetTagsQuery, TError, TData>(
      variables === undefined ? ['GetTags.infinite'] : ['GetTags.infinite', variables],
      (metaData) => fetcher<GetTagsQuery, GetTagsQueryVariables>(client, GetTagsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );


useInfiniteGetTagsQuery.getKey = (variables?: GetTagsQueryVariables) => variables === undefined ? ['GetTags.infinite'] : ['GetTags.infinite', variables];
;

useGetTagsQuery.fetcher = (client: GraphQLClient, variables?: GetTagsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetTagsQuery, GetTagsQueryVariables>(client, GetTagsDocument, variables, headers);
export const SearchPostDocument = `
    query SearchPost($limit: Int = 10, $offset: Int = 0, $post_type_slug: [String!] = [], $category_ids: [Int!] = [], $tag_ids: [Int!] = []) {
  content(
    distinct_on: post_id
    limit: $limit
    offset: $offset
    order_by: {post_id: asc, created_at: desc}
    where: {_and: {post: {_and: {deleted_at: {_is_null: true}, post_type: {slug: {_in: $post_type_slug}}}}, category_id: {_in: $category_ids}, tags: {tag_id: {_in: $tag_ids}}}}
  ) {
    post {
      id
      contents(order_by: {created_at: desc}) {
        id
        title
        created_at
        values {
          id
          field_id
          field {
            id
            slug
            name
          }
          text {
            body
          }
          numeric {
            body
          }
          integer {
            body
          }
          media {
            body {
              id
              name
              url
              media_type
              size
            }
          }
          post {
            body {
              id
              contents(order_by: {created_at: desc}) {
                id
                title
                created_at
                values {
                  id
                  field_id
                  field {
                    id
                    slug
                    name
                  }
                  text {
                    body
                  }
                  numeric {
                    body
                  }
                  integer {
                    body
                  }
                  media {
                    body {
                      id
                      name
                      url
                      media_type
                      size
                    }
                  }
                  post {
                    body {
                      id
                      contents {
                        title
                      }
                    }
                  }
                  timestamp {
                    body
                  }
                  boolean {
                    body
                  }
                }
              }
            }
          }
          timestamp {
            body
          }
          boolean {
            body
          }
        }
        category {
          id
          slug
          name
        }
        tags(order_by: {tag_id: asc}) {
          tag {
            id
            slug
            name
          }
        }
      }
      post_type {
        id
        slug
        name
      }
      created_at
    }
  }
  content_aggregate(
    distinct_on: post_id
    where: {_and: {post: {_and: {deleted_at: {_is_null: true}, post_type: {slug: {_in: $post_type_slug}}}}, category_id: {_in: $category_ids}, tags: {tag_id: {_in: $tag_ids}}}}
  ) {
    aggregate {
      count
    }
  }
}
    `;
export const useSearchPostQuery = <
      TData = SearchPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SearchPostQueryVariables,
      options?: UseQueryOptions<SearchPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchPostQuery, TError, TData>(
      variables === undefined ? ['SearchPost'] : ['SearchPost', variables],
      fetcher<SearchPostQuery, SearchPostQueryVariables>(client, SearchPostDocument, variables, headers),
      options
    );

useSearchPostQuery.getKey = (variables?: SearchPostQueryVariables) => variables === undefined ? ['SearchPost'] : ['SearchPost', variables];
;

export const useInfiniteSearchPostQuery = <
      TData = SearchPostQuery,
      TError = unknown
    >(
      _pageParamKey: keyof SearchPostQueryVariables,
      client: GraphQLClient,
      variables?: SearchPostQueryVariables,
      options?: UseInfiniteQueryOptions<SearchPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<SearchPostQuery, TError, TData>(
      variables === undefined ? ['SearchPost.infinite'] : ['SearchPost.infinite', variables],
      (metaData) => fetcher<SearchPostQuery, SearchPostQueryVariables>(client, SearchPostDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );


useInfiniteSearchPostQuery.getKey = (variables?: SearchPostQueryVariables) => variables === undefined ? ['SearchPost.infinite'] : ['SearchPost.infinite', variables];
;

useSearchPostQuery.fetcher = (client: GraphQLClient, variables?: SearchPostQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchPostQuery, SearchPostQueryVariables>(client, SearchPostDocument, variables, headers);