<div align="center">
  <h1>
    Huiz API Wrapper
  </h1>
  </br>
  <p>
    <a href="https://www.npmjs.com/package/huiz-wrapper"><img src="https://img.shields.io/npm/v/huiz-wrapper" alt="NPM version" /></a>
    <a href="https://github.com/RinseV/huiz-wrapper"><img src="https://img.shields.io/npm/l/huiz-wrapper" alt="NPM license" /></a>
    <a href="https://www.npmjs.com/package/huiz-wrapper"><img src="https://img.shields.io/librariesio/release/npm/huiz-wrapper" alt="NPM dependencies"/></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/huiz-wrapper/"><img src="https://nodei.co/npm/huiz-wrapper.png"></a>
  </p>
</div>

Node.js API wrapper for [Huiz](https://www.huiz.app/).

This package is still a work in progress.

## Installation
```sh
npm install huiz-wrapper
``` 
or 
```sh
yarn add huiz-wrapper
```
then
```javascript
import { Huiz } from 'huiz-wrapper';
```

## Usage
```javascript
// Creates Huiz object using a personal access token, set verbose=true if you want to see all requests
const huiz = new Huiz(token, verbose);
// Gets todays eat event instance using the house ID
const event = await huiz.event().getTodaysEatEventInstance(houseId);
```

### Functions

For all of these functions you need a personal access token. For instructions, see [Auth](#Auth).
#### Documents
```javascript
// Gets all documents from house given house ID
Huiz.document().getDocumentsFromHouse(houseId);
// Gets document from given document ID (assuming you have access)
Huiz.document().getDocumentFromId(documentId);
```

#### Events
All of these function names are self-explanatory
```javascript
Huiz.event().getEventsFromHouse(houseId);
Huiz.event().getEventFromId(eventId);
Huiz.event().getEventParticipantsFromId(eventId);
Huiz.event().getEventInstanceFromEventId(eventId);
Huiz.event().getOnlyEventInstanceFromEventInstanceId(eventInstanceId);
Huiz.event().getEventAvailabilityFromEventInstanceId(eventInstanceId);
Huiz.event().getEventResponsibilityFromEventInstanceId(eventInstanceId);
Huiz.event().getEventInstanceFromEventInstanceId(eventInstanceId);
Huiz.event().getEventInstanceOnDateWithEventId(eventId, date);
Huiz.event().getEventInstanceOnDateWithSlug(houseId, date, slug);
Huiz.event().getTodaysEatEventInstance(houseId);
Huiz.event().getTodaysChoreEventInstance(houseId);
Huiz.event().setEventAvailabilityWithEventInstanceId(eventInstanceId, availability);
```

#### Expenses
```javascript
Huiz.expense().getExpensesFromHouse(houseId);
Huiz.expense().getExpenseFromExpenseId(expenseId);
// Returns all of the house's expenses with descending date (newest first)
Huiz.expense().getExpensesFromHouseDescendingDate(houseId);
// Returns the i-th expense sorted by date descending
Huiz.expense().getIthExpenseFromHouse(houseId, i);
```

#### Houses
```javascript
// Returns house given house ID (assuming you have access)
Huiz.house().getHouse(houseId);
// Returns all the user's houses
Huiz.house().getHouses();
```

#### Products
```javascript
Huiz.product().getProductsFromHouse(houseId);
Huiz.product().getProductFromId(productId);
Huiz.product().getProductVariantsFromId(productId);
```

#### Recipes
```javascript
Huiz.recipe().getRecipesFromHouse(houseId);
Huiz.recipe().getRecipeFromId(recipeId);
Huiz.recipe().getIngredientsFromRecipe(recipeId);
Huiz.recipe().getStepsFromRecipe(recipeId);
Huiz.recipe().getCommentsFromRecipe(recipeId);
```

#### Tags
```javascript
Huiz.recipe().getTagsFromHouse(houseId);
Huiz.recipe().getTagFromId(tagId);
```

#### Units
```javascript
Huiz.unit().getUnitsFromHouse(houseId);
Huiz.unit().getUnitFromId(unitId);
```

#### Users
```javascript
Huiz.user().getUser(userId);
Huiz.user().getHouseUsers(houseId);
```

### Advanced usage
Every request can also be provided with additional headers and queries. If you want to add your own headers and queries to any request, do the following:
```javascript
import { Headers, Query } from '../huiz';

const myHeaders: Headers = {
    "Connection": "keep-alive",
}

const myQueries: Query = {
    "order[date]": "asc"
}
```

## Auth
You can create a ```Huiz``` object with a personal access token. Provided you have a personal access token, you can store it in a ``.env`` file, in the ``.env.example`` provided there is space for your own personal access token as well as a default house ID, you can use it as follows:
```javascript
require('dotenv').config({ path: '.env.local' });
const token = process.env.ACCESS_TOKEN;

const huiz = new Huiz(token);
```
Keep in mind that you do need the [dotenv](https://www.npmjs.com/package/dotenv) package to load ``.env`` files.

Once authenticated, you'll be able to use all functions in the wrapper. Without authentication, you won't be able to use this wrapper.