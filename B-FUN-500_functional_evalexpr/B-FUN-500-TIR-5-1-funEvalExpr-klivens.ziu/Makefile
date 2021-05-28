SRC	=	src/EvalExpr.hs		\
		src/Utils.hs		\

NAME	=	funEvalExpr

all:	$(NAME)

$(NAME):	$(SRC)
	stack build --copy-bins --local-bin-path .
	mv evalexpr-exe $(NAME)

clean:
	stack clean

fclean:	clean
	rm -f $(NAME)

re:	fclean all

.PHONY : clean fclean re nm objdump