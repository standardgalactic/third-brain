# The basic structure

You can consider the real rupee notes (cash) to tokens in this case. Each `token_note` is a currency note with some value attached to it. When a transaction takes place, either new token_notes *(in case of purchasing of tokens)* to the user or existing tokens are re-assigned from sender user to recipient user.

# Example

Consider Alice purchases 10 tokens. Then a single token_note of `value = 10` will be assigned to Alice. A unique `issue_id` is assigned to that `token_note` . Assume that here `issue_id = 4f56`.

A `token_history` record is created which notes down that Alice had a purchased transaction. Assume that the id of this `token_history` record is `id = 10`.

The history column in the `token_note` model is updated so as to store the `token_history_id = 10`. Then, if Alice tries to transfer 4 tokens to Bob, then that token_note will be broken up into two token_notes of **values 4 and 6**, with the same issue_id = 4f56 .

The token_note with **value = 4** will be assigned to Bob. The issue_id for this new token_note will be the same since it belongs to the original **10-tokens** token_note earlier brought into the system. A new token_history record is created for this transaction (say, id = 11). The new token_note *(value = 4)* will be updated to have two history records, i.e., history = [10, 11]

# Important Models
## Token Note
Keeps record of all the token_notes present in the system. Its columns are

| Column Name   | About                                                                               | Description                                                                                                                                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | Value of the note                                                                   | The note can be worth 10 tokens or 100 tokens.                                                                                                                                                                                         |
| `form`        | The form in which the user received this note.                                      | The possible values and their respective meanings are present in the code as comments.                                                                                                                                                 |
| `received_on` | When did the user receive this note history                                         | an array of token_history ids associated with the note.                                                                                                                                                                                |
| `issue_id`    | A unique ID assigned to a note when it is purchased by the user.                    | This ID helps us to bring together all the broken up `token_notes` which were purchased at once.                                                                                                                                       |
| `issue_date`  | When was the token purchased and brought into the system                            |                                                                                                                                                                                                                                        |
| `user_id`     | The user who owns the note                                                          | Is left `nil` if the user is Scriptdoor.                                                                                                                                                                                               |
| `locked_for`  | Some transactions such as **gifting** require us to lock tokens in the sender side. | These tokens are either transferred to the recipient if the recipient accepts the gift, or given back to the sender if the recipient rejects the gift. This column stores the account_transaction_id against which the note is locked. |

## Token History
Keep track of all the users that a particular note has passed. Its columns are:

| Column name              | About                                         | Description                               |
| ------------------------ | --------------------------------------------- | ----------------------------------------- |
| `user_id`                | The user who was recipient in the transaction | Is left `nil` if the user is "Scriptdoor" |
| `account_transaction_id` | ID of the related `account_transaction`       |                                           |
| `received_on`            | Date of the transaction                       |                                           |

## Account Transaction
A bank statement-like records for the user. Its colums are

| Column name                    | About                                                                                                | Description                                                                                                                                                                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transaction_type`             | The type of transaction.                                                                             | Its values are corresponding meanings are present in the code.                                                                                                                                                                                                  |
| `token`                        | The number of tokens involved in the transaction.                                                    | For transactions where scriptdoor charges a commission, this column should hold the original value of the transaction. *Eg: If Alice purchases content(worth 20 tokens) from Bob and the commission charged is 3 tokens, then* `token = 20` *not (20 - 3 = 17)* |
| `sender_id`                    | The `user_id` of the sender                                                                          | `nil` in case of Scriptdoor                                                                                                                                                                                                                                     |
| `recipient_id`                 | User ID of the recipient                                                                             | `nil` in case of Scriptdoor                                                                                                                                                                                                                                     |
| `commission`                   | Commission charged in this transaction                                                               | Defaults to 0                                                                                                                                                                                                                                                   |
| `dealable_type`, `dealable_id` | The record against which this transaction took place.                                                | Could be Content , ContentCollection , etc.                                                                                                                                                                                                                     |
| `relationship_id`              | In case of purchase of content, the ID of the newly created `content_relationship` is stored in this |                                                                                                                                                                                                                                                                 |
| `transaction_id`               | A friendlier ID generated for this transaction                                                       | This is NOT the primary key                                                                                                                                                                                                                                     |
| `payment_mode`                 | Mode of payment                                                                                      |                                                                                                                                                                                                                                                                 |
| `status`                       | Status of the transaction                                                                            |                                                                                                                                                                                                                                                                 |
| `sender_closing_balance`       | Closing balance of the sender after this transaction                                                 |                                                                                                                                                                                                                                                                 |
| `recipient_closing_balance`    | Closing balance of the recipient after this transaction                                              |                                                                                                                                                                                                                                                                 |
| `options`                      | A JSON column that can be used to store extra details                                                                                                     |                                                                                                                                                                                                                                                                 |

# Extra things
1. Almost every code related to transfer of tokens is present in the file `user_account.rb`
2. There are certain conditions that we need to take care of: 
	1. Spending priority order -The tokens cannot be spent in a random order. There is a priority level set. Take a look at the `get_token_notes_to_spend` for the code. The priority is as follows: 
		1. Tokens received as gifts (**Gifted tokens**) - Oldest first 
		2. Tokens received as transfers (**Transferred tokens**) or tokens purchased (**Purchased tokens**) - both types are treated equally. 
		3. Tokens received via sale of content (**Earned tokens**) - Newest first 
	2. Gifted tokens cannot be used for gifting to someone else. 
	3. Earned tokens can be withdrawn by a user as real dollars only after the user has had them for atleast 1 month. 
	4. Locked tokens, ofcourse, cannot be used for any other transaction until they have been freed up. 
3. On calculation of closing balances: 
4. Closing balance is calculated based on the closing balance present in the last transaction of the user. 
5. If the status is updated from pending to success/failure, then the closing balances in the subsequent records are updated too. 
6. In the options column, we have a key called `display_updating` . 
7. Since the closing balances are updated in the background and may take some time, we are required to show "Updating.." in some cases.

## Playlist/Package (Collection)
### The basic structure
Every playlist or package is saved in the table `content_collections`. When a collection is purchased, a new record is created for the buyer with the same details as that of the original.

### What happens when a collection is purchased?
New record is created in the table `content_collections` for the buyer user with the same name and other details. 

All the contents is present in the collection are bought one by one for the buyer. *In other words, you can imagine that the content purchase logic is called for each content in the collection*

The contents bought are then attached to the collection.

### ContentCollection model 
The columns in this model are:
- `name` : Name of the collection
- `user_id` : User to whom the collection belongs
- `tokens` : Price of the package (application only for packages)
- `collection_type` : Determines whether the collection is a package or a playlist. Has two possible values which can be seen in the code. 
- `library_type` : Determines whether the user has put the collection in her private or public library. 
- `content_relationship_ids` : The IDs of the content relationships belonging to the user and the content in the collection. The order of the IDs is important since it determines which content to show where. 
- `content_type` : applicable for playlist only. Determines whether a playlist is audio or video type. 
- `published_at` : when was the collection published in the user's public library. 
- `root_collection_id` : When a collection is purchased, we store the ID of the main created collection which is being purchased. 
- `ordered_content_ids` : The IDs of the contents in the collection sorted in ascending order. String format. Example: "12,15,19,20" 
- `arrayed_content_ids` : Same as ordered_content_ids in integer array format. Example: [12,15,19,20] 
- `visibility` : Whether is collection is accessible to the user. Two possible values: 
	- enable (default) - Accessible
	- disable - Not accessible
 
#### Extra things
1. Go through the validations. They tell a lot about the functionality required. 
2. A few pointers: 
	1. A user can create a package only using her created content. 
	2. However, a playlist can be created any content as long as they are accessible by the user, i.e., created, purchased or gifted content. 
	3. Conditions for publishing package: 
	4. All contents should be in respective owners' public library 
	5. Root package (the created package) must be in public library when buyer tries to publish 
	6. Contents between child (purchased) package and root package should be same
 
## Purchasing content/`content_collection`
### The basic structure

- The content relationship table determines which user has what kind of access to a content. 
- When content is purchased, a new content relationship record is created for the buyer user which establishes a purchased type relationship with the purchased content. 
- When playlist or a package is purchased, every content in the collection is purchased one by one. 
- When playlist or a package is purchased, every content in the collection is purchased one by one. 
- When playlist is purchased, transaction record is created for every content in the playlist. 
- When package is purchased, a single transaction record is created for the package.

## Gifting/Transferring tokens
### `GiftedToken` model

The columns in this table are: 
1. sender_id : ID of the sender user 
2. recipient_id : ID of the recipient user 
3. tokens : Number of tokens to be gifted/transferred 
4. status : Status of the gift. 
5. form : determines whether the tokens are gifted or transferred

### Extra things
1. When sender gifts/transfers tokens, those tokens are locked in the sender's account so that the sender cannot spend them anywhere else unless the recipient declines the gift.
2. Recipient must accept the gift within one month or else it will be considered as declined.
3. Tokens received as gift are valid for one year. In other words, the recipient user must spend those tokens within a year.

## Gifting of content
### `GiftedContent` model
The columns in this table are: 
- sender_id : ID of the sender user 
- recipient_id : ID of the recipient user 
- content_id : The content that is being gifted
- access_expires_on : Stores the date on which the content will expire for the recipient.

### Important points
- If the owner of the content gifts the content to someone, there is no account transaction created. 
- If the sender of the gift is not the owner of the content, she always has to purchase the content for gifting. 
- If the content is set to expire in two weeks and the sender gifts the content on 1 July, then the content will expire on 15 July regardless of when the recipient accepts the gift. 
- If recipient declines the gift, sender can regift. 
- Gift must be accepted within a month. 
- If the content access expiry is less than a month, then the gift will expire on the date of content expiry

## Withdrawal of tokens
### Important models
#### Withdraw Request
Keeps record of all the withdraw requests. Columns are:
- account_transaction_id : Account transaction associated with the gifting 
- status : Status of the gift. 
- notes : any notes that the sender might want to pass on to the recipient 
- tokens : Number of tokens requested to be withdrawn 
- status : Status of the request 
- remarks : Admin can add remarks to the request 
- user_id : User who has requested the request 
- saved_account_id : ID of the account details in which the money needs to be transferred

#### Saved Account
Account details are saved here. Columns are:
1. details : JSON column to store the account details. Please look at the values stored in the database to get a better idea. 
2. saved : Whether or not the account details need to be shown to the user.
3. user_id : User

### Basic structure
1. When user wants to withdraw some tokens as USD, a new record is created in the `withdraw_requests` table.
2. For the account details, either the user can choose a previously saved account details or pass on the new details. Please look at the code to get a handle of how this is handled.
3. If user requests updation of account details, a duplicate with updated details is created. The old record is then marked as `saved = false`

## Subscription
### Important models
#### Plan
Details of the subscription plans. Most columns in this table are self- explanatory. Some difficult columns are:
1. add_on_ids : The IDs of the add ons compatible with this plan. 
2. eligible_for_student_trial : If this plan is eligible for a trial period

#### Subscription
Important columns are:
1. user_id : User
2. plan_id : Plan 
3. status : Three possible values 
	1. active : This subscription is active
	2. inactive : Similar to deleted.
	3. upgrade_pending : After the end of current subscription, the user will switch to this subscription 
4. expires_on : Expiry date of this subscription 
5. remaining_space : Remaining space the user can use to upload content 
6. total_space : Total space alloted to the user for uploading content
7. renew_eligible : Subscription will be auto-renewed after it expires. Only if there is no upgrade requests 
8. add_ons : Which add ons are active. JSON type 
9. plan_details : Details of the plan saved in JSON. This is done for cases where the plan might be edited and we need to show the old details to the user.

### Important pointers
1. If renew_eligible = true , the subscription is auto-renewed after it expires. However, if the number of tokens for auto renewal are insufficient, then the subscription is expired and the user is switched to the free plan. 
2. When user requests cancellation of subscription, the record is set to renew_eligible = false . This means that when this subscription expires, it will not be auto-renewed and user will switch to free plan.
3. User is subscribed to free plan when she signs up.
4. There can be only one active subscription at a time for a user.
5. There can be only one subscription upgrade request at a time for a user.
6. Also, have a look at the file subscribable.rb . It is a module included in the User model.

## Public Library Subscription (Nested Subscription)
### Basic Structure
1. A business can open its public library for paid subscriptions.
2. Users will be paying a fixed monthly fee (set by the business) for unlimited access to the contents present in the business' public library.
3. Only the content created by the business will be available via this subscription. Any content purchased by the business and published in the public library will not be available in the subscription.
4. A business can have only one plan active at a time.

### Important models
#### Public Library Subscription Plan
When a business opts to make its public library open for nested subscriptions, a record is created in this table. Columns are:
- business_id : Foreign key to the users table. ID of the business (user) who has opted to make its public library open for nested subscriptions. 
- duration : the duration cycle of a subscription. By default it is set to one month. This means that the users must pay every month. 
- tokens : the number of tokens the business has set for the user to pay on a monthly basis. 
- status : Business can choose to deactivate its current subscription plan and create a new plan.

#### Public Library Subscription
When a user buys nested subscription plan, this table is used to hold those records. 

### Important pointers
1. When user requests cancellation for subscription, the subscription is cancelled only after it expires.
2. Subscription is auto renewed at the end of expiry date.

## Add ons
### Important models
#### Add On
Columns are:
- subscriber_id : foreign key to the users table. ID of the user who has bought the subscription. 
- status : status of the subscription. Can be **inactive** or **active**. expires_on : expiry date of the subscription. 
- plan_id : foreign key to the public_library_subscription_plans table. ID of the plan opted for. 
- options : JSON column. Right now, it stores only one key: renew_eligible . Its purpose is similar to the one in subscriptions table. 
- category : Type of add on. Right now, only one value allowed: manage_own_ads 
- price : Price of the add on 
- name : Name to be displayed 
- duration_in_months : Number of months the add on is active for after it is purchased 
- multiple_allowed : Whether or not a user can buy this add on if a same add on is active with her.

#### Purchased Add On
Details of the add ons purchased. Columns are:
1. add_on_id : ID of the add on purchased 
2. user_id : User who has purchased 
3. expires_on : When will this add on expire 
4. status : Active or inactive

##### Pointers
1. When add on is purchased, the add_ons column in the subscriptions table is updated too as defined in the function loading_function in the model AddOn
2. When add on is expired, the add_ons column in the subscriptions table is updated as defined in the unloading_function in the model AddOn
3. The add on is independent of user's subscription in terms of its expiry.
4. Add on purchase is dependent on whether the user's current active subscription is eligible for that particular add on.
5. When a user opts for a subscription plan and has a purchased add on present, then the subscription is updated with the add on details if it is compatible with that add on.
6. Purchased add ons do not auto-renew. They just expire.

## Stripe payment
### Payment model
Keeps a record of the payments made via stripe for purchasing tokens. Columns are:
- user_id 
- amount : Amount of the payment in USD 
- reference_no : Unique payment_intent_id provided by Stripe for the transaction. Used to track status of the payment from Stripe. 
- status : pending, success, failure 
- token : Number of tokens purchased in the transaction
- error_message : Error message returned by stripe in case of failed payment 
- attempts : Number of attempts made by the user to pay against this particular reference_no 

### The flow
1. Alice wants to purchase 100 tokens.
2. The tokens create API is called
3. In the tokens create API: 
	1. A stripe session is created, which provides us with the payment_intent_id and the session_id 
	2. A pending payment record is created with reference_no = payment_intent_id 
	3. A pending account_transaction record is created 
	4. A sidekiq worker is created which is responsible to check the payment status after a minute. *(This is done as a backup in case stripe fails to deliver a webhook)* 
	5. The session_id is returned to the front end
4. Alice is redirected to the credit card page using the session_id
5. After Alice enters the credit card details and submits: 
	1. If the payment succeeds, we get a webhook request. We take the necessary steps to mark this payment as success. View the file `payment_charges.rb` 
	2. If the payment fails 
		1. Alice stays on the payment page 
		2. We get a webhook for this. We increment the field attempts by one. 
	3. In case, we do not receive a webhook, we have a worker running in the background which continuously pings stripe for the status of the payment. 
	4. If the field attempts = 0 , then the payment is cancelled from our end after 20 minutes. 
	5. However, if attempts > 0 , then we have a cron job responsible for cancelling this payment after one day.

## New admin Implementation
### Before
1. We had a separate repository for the admin panel.
2. That repository connected to the same database as the one connected to the main repository.
3. Any changes in models were manually copies from the main repository to the admin repository.

### Now, why did we do this?
1. Primarily, because copying changes in models from one repository to another is an error prone technique.
2. Some modules such as **withdraw requests** are closely linked with many other modules such as **account transactions** and **tokenisation**. Maintaining separate repositories made it difficult to develop such modules. 
3. We have integrated the admin panel to the main repository.