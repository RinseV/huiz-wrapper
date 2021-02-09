const nodefetch = require("node-fetch");
require("dotenv").config();
const endpoint = process.env.ENDPOINT;

import { Document } from "./documents/document";
import { Event } from "./events/event";
import { Expense } from "./expenses/expense";
import { House } from "./houses/house";
import { Recipe } from "./recipes/recipe";
import { Tag } from "./tags/tag";
import { Unit } from "./units/unit";
import { User } from "./users/user";

export class Huiz {
    token: Token;
    huizDocument: Document;
    huizEvent: Event;
    huizExpense: Expense;
    huizHouse: House;
    huizRecipe: Recipe;
    huizTag: Tag;
    huizUnit: Unit;
    huizUser: User;
    // Option if you want to print the endpoints in console
    verbose: boolean = false;

    constructor(token: Token, verbose?: boolean) {
        this.token = token;
        this.huizDocument = new Document(this);
        this.huizEvent = new Event(this);
        this.huizExpense = new Expense(this);
        this.huizHouse = new House(this);
        this.huizRecipe = new Recipe(this);
        this.huizTag = new Tag(this);
        this.huizUnit = new Unit(this);
        this.huizUser = new User(this);
        this.verbose = verbose!;
    }

    document() {
        return this.huizDocument;
    }

    event() {
        return this.huizEvent;
    }

    expense() {
        return this.huizExpense;
    }

    house() {
        return this.huizHouse;
    }

    recipe() {
        return this.huizRecipe;
    }

    tag() {
        return this.huizTag;
    }

    unit() {
        return this.huizUnit;
    }

    user() {
        return this.huizUser;
    }

    /**
     * GET request
     * @param path Endpoint URL (without start)
     * @param extraHeaders Any extra headers except for Accept and Token/Authorization
     * @param query Any query options
     */
    async get(path: string, extraHeaders?: Headers, query?: Query) {
        return this.request(path, requestMethod.GET, undefined, extraHeaders, query);
    }

    /**
     * POST request
     * @param path Endpoint URL (without start)
     * @param body POST body
     * @param extraHeaders Any extra headers except for Accept and Token/Authorization
     */
    async post(path: string, body: any, extraHeaders?: Headers) {
        return this.request(path, requestMethod.POST, body, extraHeaders, undefined);
    }

    /**
     * PUT request
     * @param path Endpoint URL (without start)
     * @param body PUT body
     * @param extraHeaders Any extra headers except for Accept and Token/Authorization
     */
    async put(path: string, body: any, extraHeaders?: Headers) {
        return this.request(path, requestMethod.PUT, body, extraHeaders, undefined);
    }

    /**
     * PATCH request
     * @param path Endpoint URL (without start)
     * @param body PATCH body
     * @param extraHeaders Any extra headers except for Accept and Token/Authorization
     */
    async patch(path: string, body: any, extraHeaders?: Headers) {
        return this.request(path, requestMethod.PATCH, body, extraHeaders, undefined);
    }

    /**
     * DELETE request
     * @param path Endpoint URL (without start)
     * @param extraHeaders Any extra headers except for Accept and Token/Authorization
     */
    async delete(path: string, extraHeaders?: Headers) {
        return this.request(path, requestMethod.DELETE, undefined, extraHeaders, undefined);
    }

    /**
     * Generic request method
     * @param path Endpoint URL (without start)
     * @param method Request method (GET, POST, PUT, DELETE)
     * @param body Body in case of POST and PUT
     * @param extraHeaders Any extra headers except for Accept and Token/Authorization
     * @param query Query in case of GET
     */
    async request(path: string, method: requestMethod, body?: any, extraHeaders?: Headers, query?: Query) {
        // Create headers
        let headers = this.createHeader(this.token, extraHeaders);

        // URL & body to check per method
        let url: string;
        let bodyContent: any;

        switch (method) {
            // Generate URL with query, leave bodyContent empty
            case requestMethod.GET:
                url = this.createURL(path, query);
                break;
            // Generate URL without query and put body in bodyContent
            case requestMethod.POST:
            case requestMethod.PUT:
                url = this.createURL(path);
                bodyContent = body;
                break;
            // Generate URL without query, leave bodyContent empty
            case requestMethod.DELETE:
                url = this.createURL(path);
                break;
            default:
                url = this.createURL(path);
                break;
        }

        if (this.verbose) {
            console.log(method);
            console.log(url);
            console.log(headers);
            // Only print body if defined
            void (bodyContent && console.log(bodyContent));
        }

        // Send request with URL and headers
        let response = await nodefetch(url, {
            method: method,
            headers: headers,
            body: bodyContent,
        });

        // Throw error if response is not ok
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Return json response
        return await response.json();
    }

    /**
     * Helper function to create headers for request
     * @param token Access token
     * @param extraHeaders Any extra header options
     */
    createHeader(token: Token, extraHeaders?: Headers): Headers {
        // Create header with Accept
        let headers: Headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        // Add token to header depending on type
        if (this.token.tokenType === "personal") {
            headers["Personal-Access-Token"] = `${this.token.accessToken}`;
        } else if (this.token.tokenType === "bearer") {
            headers["Authorization"] = `${this.token.tokenType} ${this.token.accessToken}`;
        }

        // Add fields from extraHeaders to headers
        headers = { ...headers, ...extraHeaders };

        // Return the headers
        return headers;
    }

    /**
     * Helper function to create request URL
     * @param path Path to endpoint (without ENDPOINT in .env)
     * @param query Any query options
     */
    createURL(path: string, query?: Query): string {
        let url: string;
        // Add query if given
        if (query) {
            let searchParams = new URLSearchParams(query);
            url = endpoint + path + "?" + searchParams;
        } else {
            url = endpoint + path;
        }

        // Return URL
        return url;
    }

    /**
     * GET method to return current user info
     * @param token Must be Authorization (OAuth2) token
     */
    async getMe(token: Token, extraHeaders?: Headers) {
        // Only works for OAuth2 token
        if (token.tokenType !== "bearer") {
            throw Error("OAuth2 Token required");
        }

        // URL is different from endpoint
        const url = "https://login.huiz.app/userinfo";
        const headers = this.createHeader(token, extraHeaders);

        // Get request with Authorization token
        let response = await nodefetch(url, {
            method: "GET",
            headers: headers,
        });

        // Throw error if response is not ok
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Return json response
        return await response.json();
    }
}

export enum requestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export interface Token {
    tokenType: string;
    accessToken?: string;
}

export interface Headers {
    [key: string]: string;
}

export interface Query {
    [key: string]: string;
}
