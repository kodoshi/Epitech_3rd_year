SRC	=	src/main.cpp \
		src/parser.cpp \

NAME	=	302separation

OBJ	=	$(SRC:.cpp=.o)

CXX	=	g++

RM	=	rm -f

INC	=	-I include/

CXXFLAGS	=	$(INC) -W -Wall -Wextra

all	:	$(NAME)

$(NAME)	:	$(OBJ)
		$(CXX) -o $(NAME) $(OBJ)

clean	:
		$(RM) $(OBJ)

fclean	:	clean
		$(RM) $(NAME)

re	:	fclean all

debug: 		CFLAGS += -g
debug:		re