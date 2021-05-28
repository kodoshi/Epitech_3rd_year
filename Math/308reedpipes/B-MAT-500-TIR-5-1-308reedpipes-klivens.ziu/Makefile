make:
	@cp src/*.py .
	@mv 308reedpipes.py 308reedpipes
	@chmod +x 308reedpipes

clean:
	@rm -f 308reedpipes
	@rm -f *.py

fclean: clean
	@rm -rf __pycache__
	@rm -rf src/__pycache__

re: fclean make