#mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
#mkfile_dir := $(dir $(mkfile_path))

#make:
#	@make -C src/dir01
#	@mv $(mkfile_dir)src/dir01/challenge01 .
#	@chmod +x challenge01
#copy+paste the 4 lines above for every challenge
#
#clean:
#	@rm -f *challenge

SRC	=	./src/challenge01 \
		./src/challenge02 \
		./src/challenge03 \
		./src/challenge04 \
		./src/challenge05 \
		./src/challenge06 \
		./src/challenge07 \
		./src/challenge08 \
		./src/challenge09 \
		./src/challenge10 \
		./src/challenge11 \

COPY	=	$(shell cp -rf $(SRC) ./)

EXEC	=	$(shell chmod +x $(SRC))

all	:	$(COPY) $(EXEC)

clean	:
	rm -rf *challenge* *.pyc *.pyo *~ __pycache__

.PHONY	:	all clean fclean