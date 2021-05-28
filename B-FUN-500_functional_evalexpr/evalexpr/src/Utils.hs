module Utils where

import Text.Read

valueOp :: [Char] -> Int
valueOp op = case op of
                "+" -> 2
                "-" -> 2
                "*" -> 3
                "/" -> 3
                "^" -> 4
                _ -> 0

listOperator :: [[Char]]
listOperator = ["+", "-", "*", "/", "^"]

listOperatorParenthesis :: [[Char]]
listOperatorParenthesis = ["+", "-", "*", "/", "^", "(", ")"]

isDouble :: [Char] -> Bool
isDouble num
    | (num == ".") = True
    | (response == Nothing) = False
    | otherwise = True
        where response = readMaybe num :: Maybe Double

takeWhileCustom :: [[Char]] -> [[Char]]
takeWhileCustom srcList = takeWhile isDouble srcList

isInList :: [Char] -> [[Char]] -> Bool
isInList _ [] = False
isInList c (x:xs)
    | (c == x) = True
    | otherwise = isInList c xs