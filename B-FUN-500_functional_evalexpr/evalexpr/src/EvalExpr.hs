module EvalExpr where

import System.Environment
import System.IO
import Data.List
import Text.Read
import System.Exit
import Text.Printf
import Utils

recomposeNumber :: [[Char]] -> [[Char]] -> [[Char]]
recomposeNumber [] destList = destList
recomposeNumber (x:xs) destList
    | ((isDouble x == False)) = recomposeNumber xs (destList ++ [x])
    | otherwise = recomposeNumber (drop (length response) ([x] ++ xs)) (destList ++ [intercalate "" response])
        where response = takeWhileCustom ([x] ++ xs)

findNegativeNumber :: [[Char]] -> [[Char]] -> Int -> [[Char]]
findNegativeNumber tokens output count
    | (count == 0 && currentToken == "-") = let firstNb = currentToken ++ (tokens !! 1)
                                                 in findNegativeNumber tokens (output ++ [firstNb]) (count + 2)
    
    | (count == length tokens) = output
    | (currentToken == "-" && count /= (length tokens) - 1) = if (isInList (tokens !! (count - 1)) listOperatorParenthesis && isDouble (tokens !! (count + 1))) 
                                                              then let nb = currentToken ++ (tokens !! (count + 1))
                                                                       in findNegativeNumber tokens (output ++ [nb]) (count + 2)
                                                              else findNegativeNumber tokens (output ++ [currentToken]) (count + 1)
    
    | otherwise = findNegativeNumber tokens (output ++ [currentToken]) (count + 1) 
        where currentToken = tokens !! count

shuntingYard :: [[Char]] -> [[Char]] -> [[Char]] -> IO ([[Char]])
shuntingYard [] output stack = if (isInList "(" stack || isInList ")" stack) 
                               then exitWith (ExitFailure 84)
                               else return (output ++ stack)

shuntingYard (token:tokens) output stack
    | (isDouble token == True) = shuntingYard tokens (output ++ [token]) stack
    | (isInList token listOperator == True) = let op2Removed = takeWhile isSup stack
                                                    in shuntingYard tokens (output ++ op2Removed) ([token] ++ (drop (length op2Removed) stack))
    | (token == "(") = shuntingYard tokens output ([token] ++ stack)
    | (token == ")") = let op2Removed = (takeWhile ("("/=) stack)
                           in if (op2Removed == stack) then exitWith (ExitFailure 84)
                              else shuntingYard tokens (output ++ op2Removed) (drop ((length op2Removed) + 1) stack)
    | otherwise = return (output)
        where isSup op2
                | ((valueOp token) <= (valueOp op2)) = True
                | otherwise = False

calc :: Double -> Double -> [Char] -> IO (Double)
calc num1 num2 op = case op of
                            "+" -> return (num1 + num2)
                            "-" -> return (num1 - num2)
                            "*" -> return (num1 * num2)
                            "/" -> if (num2 == 0) 
                                   then exitWith (ExitFailure 84)
                                   else return (num1 / num2)
                            "^" -> return (num1 ** num2)

evaluateNpi :: [[Char]] -> [Double] -> IO (Double)
evaluateNpi [] output = return (output !! 0)
evaluateNpi (token:tokens) output
    | (isDouble token == True) = evaluateNpi tokens (output ++ [(read token :: Double)])
    | (isInList token listOperator == True && length output >= 2) = do
                                                                    tmpResult <- calc (output !! (lenOutput - 2)) (output !! (lenOutput - 1)) token
                                                                    evaluateNpi tokens ((take (lenOutput - 2) output) ++ [tmpResult])
    | otherwise = exitWith (ExitFailure 84)
        where lenOutput = length output

checkArg :: [[Char]] -> Int -> IO ()
checkArg [] count = exitWith (ExitFailure 84)
checkArg tokens count
    | (count == length tokens) = return ()
    | (count == 0 && isInList currentToken listOperator) = exitWith (ExitFailure 84)
    | (count == (length tokens) - 1 && isInList currentToken listOperator) = exitWith (ExitFailure 84)
    | (isInList currentToken listOperator) = if isInList (tokens !! (count - 1)) listOperator
                                             then exitWith (ExitFailure 84)
                                             else checkArg tokens (count + 1)
    | (currentToken == ")" || currentToken == "(" || isDouble currentToken) = checkArg tokens (count + 1)
    | otherwise = exitWith (ExitFailure 84)
        where currentToken = tokens !! count

evalExpr :: IO ()
evalExpr = do
        args <- getArgs
        if (length(args) /= 1 || (length (filter (/=' ') (args !! 0)) == 0)) then
            exitWith (ExitFailure 84)
        else do
            let expression = (args !! 0)
                tmpList = recomposeNumber (words $ intersperse ' ' expression) []
                tokenList = findNegativeNumber tmpList [] 0
            checkArg tokenList 0
            npiExpression <- shuntingYard tokenList [] []
            if (npiExpression == []) then 
                exitWith (ExitFailure 84)
            else do
                result <- evaluateNpi npiExpression []
                printf "%.2f\n" (result)