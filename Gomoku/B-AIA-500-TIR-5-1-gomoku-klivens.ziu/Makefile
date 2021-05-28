make:
	@cp src/*.py .
	@mv main.py pbrain-gomoku-ai
	@chmod +x pbrain-gomoku-ai

clean:
	@rm -f pbrain-gomoku-ai
	@rm -f *.py

fclean: clean
	@rm -rf __pycache__
	@rm -rf src/__pycache__

re: fclean make