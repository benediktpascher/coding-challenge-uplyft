Instructions for the candidate can be found [here](INSTRUCTIONS.md).

A file containing the whole coding challenge in one source file can be found [here](selfContained.ts). 

# How to run

1. Pick a database implementation by importing one of the scenarios. E.g if you want the happy path behaviour described in the task.
```
import { userIdsGet, userGet, userPut } from "./database/scenarios/databaseThrottled";
```
2. Provide a `syncUsers` implementation by writing it or importing one.
```
import sync from './syncImplementations/sync*';
```
3. Run
```
npm i
node --require ts-node/register index.ts
```

# Instructions for interviewer

## Possible questions from candidate

*What happens if I put the same data multiple times?*

Nothing. The call is idempotent. You'll just be writing the same data twice.

## Questions to ask candidate, when applicable

* Could you please summarize the task as you understand it?
* Can it be made to run faster in some way? 
  * Is there a way to execute requests in parallel?
  * Are we maximizing execution time?
* What is the time/memory complexity of this implementation? How does execution time and memory usage increase with an increase of users?
* What if we can't trust the API to throttle us in a predictable way?
  * Can we use some kind of back-off?
* How could you handle/recover from errors?
* What if we want to run the sync multiple times? What are the prerequisites for this to work?
* How would you deal with having limited execution time and a big number of users?
