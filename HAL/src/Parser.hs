module Parser 
    ( Expr(..)
    , parseExpr
    )
    where

import Tokenize

type Parser a = [Token] -> Maybe(a, [Token])


symbols =   [ "quote"
            , "cons"
            , "car"
            , "cdr"
            , "list"
            , "lambda"
            , "define"
            , "let"
            , "atom?"
            , "eq?"
            , "cond"
            ]


data Expr = KeyWord String
            | Val Int
            | Procedure (Expr, Expr)
            | List [Expr]
            | CellList [Expr]
            | Symbol String [Expr]
            | Calcul Op [Expr]
            deriving (Show, Eq)


parseValue :: Parser Expr
parseValue (Number n:xs)                    = Just (Val n, xs)

parseValue (TokenOpen : (TokenClose:xs))    = Just (List [], xs)

parseValue (TokenOpen : xs)                 = case parseValue xs of
    Just (Val n, (TokenClose : ys))  -> Just (List [Val n], ys)
    Just (KeyWord n, (TokenClose : ys))  -> Just (List [KeyWord n], ys)
    Just (expr, (TokenClose : ys))  -> Just (expr, ys)
    Just (expr, ys)                 -> Just (List ([expr] ++ recursive), tail rest)
                where
                    (recursive, rest)   = parseExprs [] ys
    Nothing                         -> error "Parse Value returns nothing when open token is detected"

parseValue (TokenOp op :xs)                 = Just (Calcul op recursive, rest)
                where
                    (recursive, rest) = parseExprs [] xs

parseValue (Word n:xs)  | n `elem` symbols  =   Just (Symbol n recursive, rest)
                        | n == "'"          =   case parseValue xs of
                            Just (expr, ys) ->  Just (Symbol n [expr], ys)
                            _               ->  error "Parse error for quote'"
                        | otherwise         =   Just (KeyWord n, xs)
                where
                    (recursive, rest) = parseExprs [] xs

parseValue x = error ("Token not recognize")

parseExprs :: [Expr] -> [Token] -> ([Expr], [Token])
parseExprs list [] = (list, [])
parseExprs list tokens =
    case parseValue tokens of
    
    Just (expr, [])                         -> (list ++ [expr], [])
    
    Just (expr, toks@(TokenClose : xs))     -> (list ++ [expr], toks)
    
    Just (expr, x)                          -> parseExprs (list ++ [expr]) x
    
    _               -> error "Error during the separation of the expressions"


parseExpr :: [Token] -> [Expr]
parseExpr [] = []
parseExpr tokens = case parseExprs [] tokens of
    (result, [])    -> result
    _               -> error "bad parsing"
