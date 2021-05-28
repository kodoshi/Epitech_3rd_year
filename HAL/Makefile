PROJECT_NAME	=	hal

all: $(PROJECT_NAME)

$(PROJECT_NAME):
	stack install --local-bin-path . --exec 'mv HAL-exe hal'

tests_run:
	stack test

clean:
	rm -f $(PROJECT_NAME)
	stack clean

fclean: clean

re: fclean all
