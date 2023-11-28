/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment cartFragment on Cart {\n    contents {\n      nodes {\n        key\n        product {\n          node {\n            id\n            databaseId\n            name\n            image {\n              id\n              altText\n              thumbnail: sourceUrl(size: THUMBNAIL)\n              medium: sourceUrl(size: MEDIUM)\n              mediumLarge: sourceUrl(size: MEDIUM_LARGE)\n            }\n            ... on SimpleProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n            ... on VariableProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n          }\n        }\n        variation {\n          node {\n            id\n            databaseId\n            name\n            description\n            type\n            onSale\n            price\n            regularPrice\n            salePrice\n            image {\n              id\n              sourceUrl\n              srcSet\n              altText\n              title\n            }\n          }\n          attributes {\n            id\n            name\n            value\n          }\n        }\n        quantity\n        total\n        subtotal\n        subtotalTax\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n    }\n    subtotal\n    subtotalTax\n    shippingTax\n    shippingTotal\n    total\n    totalTax\n    feeTax\n    feeTotal\n    discountTax\n    discountTotal\n  }\n": types.CartFragmentFragmentDoc,
    "\n  query GetCart {\n    cart {\n      ...cartFragment\n    }\n  }\n": types.GetCartDocument,
    "\n  mutation AddToCart($productId: Int!, $quantity: Int) {\n    addToCart(input: { productId: $productId, quantity: $quantity }) {\n      cart {\n        ...cartFragment\n      }\n    }\n  }\n": types.AddToCartDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment cartFragment on Cart {\n    contents {\n      nodes {\n        key\n        product {\n          node {\n            id\n            databaseId\n            name\n            image {\n              id\n              altText\n              thumbnail: sourceUrl(size: THUMBNAIL)\n              medium: sourceUrl(size: MEDIUM)\n              mediumLarge: sourceUrl(size: MEDIUM_LARGE)\n            }\n            ... on SimpleProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n            ... on VariableProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n          }\n        }\n        variation {\n          node {\n            id\n            databaseId\n            name\n            description\n            type\n            onSale\n            price\n            regularPrice\n            salePrice\n            image {\n              id\n              sourceUrl\n              srcSet\n              altText\n              title\n            }\n          }\n          attributes {\n            id\n            name\n            value\n          }\n        }\n        quantity\n        total\n        subtotal\n        subtotalTax\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n    }\n    subtotal\n    subtotalTax\n    shippingTax\n    shippingTotal\n    total\n    totalTax\n    feeTax\n    feeTotal\n    discountTax\n    discountTotal\n  }\n"): (typeof documents)["\n  fragment cartFragment on Cart {\n    contents {\n      nodes {\n        key\n        product {\n          node {\n            id\n            databaseId\n            name\n            image {\n              id\n              altText\n              thumbnail: sourceUrl(size: THUMBNAIL)\n              medium: sourceUrl(size: MEDIUM)\n              mediumLarge: sourceUrl(size: MEDIUM_LARGE)\n            }\n            ... on SimpleProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n            ... on VariableProduct {\n              id\n              regularPrice\n              price\n              salePrice\n            }\n          }\n        }\n        variation {\n          node {\n            id\n            databaseId\n            name\n            description\n            type\n            onSale\n            price\n            regularPrice\n            salePrice\n            image {\n              id\n              sourceUrl\n              srcSet\n              altText\n              title\n            }\n          }\n          attributes {\n            id\n            name\n            value\n          }\n        }\n        quantity\n        total\n        subtotal\n        subtotalTax\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n    }\n    subtotal\n    subtotalTax\n    shippingTax\n    shippingTotal\n    total\n    totalTax\n    feeTax\n    feeTotal\n    discountTax\n    discountTotal\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCart {\n    cart {\n      ...cartFragment\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    cart {\n      ...cartFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddToCart($productId: Int!, $quantity: Int) {\n    addToCart(input: { productId: $productId, quantity: $quantity }) {\n      cart {\n        ...cartFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddToCart($productId: Int!, $quantity: Int) {\n    addToCart(input: { productId: $productId, quantity: $quantity }) {\n      cart {\n        ...cartFragment\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;