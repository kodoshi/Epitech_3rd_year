SRC	=	bonus.cpp \
		../src/selection_sort.cpp \
		../src/insertion_sort.cpp \
		../src/bubble_sort.cpp \
		../src/merge_sort.cpp \
		../src/quick_sort.cpp \
		../src/shell_sort.cpp \

NAME	=	301bonus

OBJ	=	$(SRC:.cpp=.o)

CXX	=	g++

RM	=	rm -f

INC	=	-I ../include/

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