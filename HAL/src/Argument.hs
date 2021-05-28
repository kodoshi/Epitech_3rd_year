module Argument
    ( ArgumentType(..)
    , Options(..)
    , handleArgument
    ) where

data Options = Options
    { pathFile          :: [String]
    , interactive       :: Bool
    } deriving Show

startOption :: Options
startOption = Options
    { pathFile          = []
    , interactive       = True
    }

data ArgumentType =     Invalid
                    |   Helper
                    |   Version
                    |   Other
    deriving (Show, Enum)

handleArgument :: [String] -> IO (Either ArgumentType Options)
handleArgument args = case parseArgument args of
                    Right   t           -> do return $ Right t
                    Left    (Helper)    -> do programUsage ; return $ Left Helper
                    Left    (Version)   -> do programVersion ; return $ Left Version
                    Left    (_)         -> do programInvalidArgs ; return $ Left Invalid


isInteractive :: [String] -> Bool
isInteractive [] = False
isInteractive ("-i":xs) = True 
isInteractive (x:xs) = isInteractive xs

isFlag :: [String] -> Bool
isFlag [] = True
isFlag (x:xs)   | x == "-i"     = isFlag xs
                | x !! 0 == '-' = False
                | otherwise     = isFlag xs

deleteArgumentFlag :: [String] -> [String]
deleteArgumentFlag [] = []
deleteArgumentFlag ("-i":xs) = deleteArgumentFlag xs
deleteArgumentFlag (x:xs) = x : deleteArgumentFlag xs

getFiles :: [String] -> Maybe [String]
getFiles [] = Just []
getFiles x = case isFlag $ deleteArgumentFlag $ x of
    True -> Just $ deleteArgumentFlag $ x
    False -> Nothing
    
parseArgument :: [String] -> Either ArgumentType Options
parseArgument []                = Right Options { pathFile = [], interactive = True }
parseArgument ["-i"]            = Right Options { pathFile = [], interactive = True }
parseArgument ["--help"]        = Left  Helper
parseArgument ["--version"]     = Left  Version
parseArgument x                 = case getFiles x of
                Just  a     -> Right Options { pathFile = a, interactive = isInteractive x }
                Nothing     -> Left Invalid

programUsage :: IO ()
programUsage = do putStrLn "./hal [FILE.lisp] [-i]"


programVersion :: IO ()
programVersion = do putStrLn "HAL v0.0.1"

programInvalidArgs :: IO ()
programInvalidArgs = do putStrLn "Invalid arguments, use --help"
