# capital-one-assessment

## Instructions on how to use

There are two ways you can test out the code.

### Run Script

1. Enter your desired input into the transactions.json file which is located in the src folder (a sample input has already been provided)
2. In the project root, run the command `node src/runPointCalculation.js transactions.json` using the command line
3. The maximum number of points provided by your input will be printed as a response

### Make request to API server
1. In the project root run npm install
2. In the project root run node server
3. Make a get request to `http://localhost:5000/` that includes a JSON body with your transactions input.
4. The request response will be the maximum number of points

For example: 
![image](https://user-images.githubusercontent.com/59408742/152667112-ed0d9323-7b30-474c-95f5-5a3678765cab.png)

## Explanation of solution

The main code for the solution can be found in `src/calculatePoints.js`. The test script for my project is located in `src/runPointCalculation.js`. The test input amount is located in `src/transactions.json`.

I assumed the input will only contain transactions for a specific month.

1. Once the input is provided, I create a map from these transactions with the store name as the key and the amount spent as the value. 
2. I created a hierarchy of rules from the most valuable to the least valuable rules. This hierarchy was created by deteremining the rules which provide the most points per sportcheck dollar since sportcheck dollars are required for every rule and is therefore the limiting factor. There are some other factors involved as well that I can speak about during the interview. Comment code in the `src/calculatePoints.js` indicates the rule hierarchy.
3. Once the first 6 rules are used, I then use the last rule to calculate the remaining points from the remaining dollars. 
4. The maximum dollar amount is returned. 
