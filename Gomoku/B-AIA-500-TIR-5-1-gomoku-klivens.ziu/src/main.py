#!/usr/bin/env python3

import threading
import queue
import time
import re
import sys
from score import ai_get_score, opponent_get_score


class Gomoku:
    def __init__(self):
        self.thread_parse = None
        self.thread_output = None
        self.thread_input = None
        self.current_input = None
        self.board_size = 20
        self.leave = False
        self.queue_input = queue.Queue(1000)
        self.queue_output = queue.Queue(1000)
        self.queue_parsing = queue.Queue(1000)
        self.new_board = False
        self.first_play = False
        self.get_info = False
        self.opp_move = False
        self.opp_move_x = None
        self.opp_move_y = None
        self.ai_move_x = 0
        self.ai_move_y = 0
        self.piece_pos = []
        self.map = []

    def thread_launch(self):
        try:
            self.thread_parse = threading.Thread(target=self.handle_parser)
            self.thread_input = threading.Thread(target=self.handle_input)
            self.thread_output = threading.Thread(target=self.handle_output)
            self.thread_parse.start()
            self.thread_input.start()
            self.thread_output.start()
        except:
            sys.exit(84)

    def thread_close(self):
        self.thread_parse.join()
        self.thread_input.join()
        self.thread_output.join()

    def handle_ai(self):
        self.map_create()
        while (self.leave == False):
            time.sleep(0.1)
            if (self.new_board == True):
                self.board_replace()
            if (self.opp_move == True):
                self.ai_move()
                self.opp_move = False
                self.map[self.ai_move_x][self.ai_move_y] = 1
                print(str(self.ai_move_y) + ',' + str(self.ai_move_x))

    def handle_input(self):
        try:
            while(self.leave == False):
                self.queue_input.put(input())
                time.sleep(0.1)
        except:
            sys.exit(84)

    def handle_output(self):
        try:
            while (self.leave == False):
                if (self.queue_output.empty() == False):
                    print(self.queue_output.get())
                time.sleep(0.1)
        except:
            sys.exit(84)

    def handle_parser(self):
        try:
            self.map_create()
            while (self.leave == False):
                self.current_input = input()
                if (re.search(r'^START (\d+)', self.current_input)):
                    size = int(re.match(r'^START (\d+)',
                                        self.current_input).group(1))
                    if (size >= 5 and size <= 100):
                        self.board_size = size
                        print("OK")
                    else:
                        print("ERROR")
                elif (re.search(r'^INFO', self.current_input)):
                    self.get_info = True
                elif (re.search(r'^RESTART', self.current_input)):
                    print("OK")
                    self.map_create()
                    self.first_play = False
                elif (re.search(r'^BEGIN', self.current_input)):
                    if (self.first_play == False):
                        self.first_play = True
                        print("10,10")
                        self.map[10][10] = 1
                elif (re.search(r'^BOARD', self.current_input)):
                    self.new_board = True
                    while (self.new_board == True):
                        self.current_input = input()
                        if (re.search(r'^DONE', self.current_input)):
                            self.ai_move()
                            self.map[self.ai_move_x][self.ai_move_y] = 1
                            print(str(self.ai_move_y) +
                                  ',' + str(self.ai_move_x))
                            self.new_board = False
                        elif (re.search(r'^(\d+),(\d+),(\d+)', self.current_input)):
                            self.piece_pos.append(
                                int(re.match(r'^(\d+),(\d+),(\d+)', self.current_input).group(1)))
                            self.piece_pos.append(
                                int(re.match(r'^(\d+),(\d+),(\d+)', self.current_input).group(2)))
                            self.piece_pos.append(
                                int(re.match(r'^(\d+),(\d+),(\d+)', self.current_input).group(3)))
                            if (self.piece_pos[0] >= 0 and self.piece_pos[0] <= self.board_size and
                                self.piece_pos[1] >= 0 and self.piece_pos[1] <= self.board_size and
                                    self.piece_pos[2] >= 1 and self.piece_pos[2] <= 2):
                                if (self.piece_pos[2] == 2):
                                    self.map[self.piece_pos[1]
                                             ][self.piece_pos[0]] = -1
                                else:
                                    self.map[self.piece_pos[1]
                                             ][self.piece_pos[0]] = 1
                            for i in range(3):
                                self.piece_pos.pop(0)
                elif (re.search(r'^TURN (\d+),(\d+)', self.current_input)):
                    self.opp_move_x = int(
                        re.match(r'^TURN (\d+)', self.current_input).group(1))
                    self.opp_move_y = int(
                        re.match(r'^TURN (\d+),(\d+)', self.current_input).group(2))
                    if (self.opp_move_x >= 0 and self.opp_move_x <= self.board_size and self.opp_move_y >= 0 and self.opp_move_y <= self.board_size and self.map[self.opp_move_y][self.opp_move_x] == 0):
                        self.map[self.opp_move_y][self.opp_move_x] = -1
                        self.ai_move()
                        self.map[self.ai_move_x][self.ai_move_y] = 1
                        print(str(self.ai_move_y) +
                              ',' + str(self.ai_move_x))
                    else:
                        print("ERROR")
                elif (re.search(r'^END', self.current_input)):
                    exit(0)
                elif (re.search(r'^QUIT', self.current_input)):
                    self.leave = True
                elif (re.search(r'^ABOUT', self.current_input)):
                    print(
                        "name=\"minmax-tallava\", version=\"1.0\", author=\"Klivens Ziu\", country=\"AL\"")
                else:
                    print("UNKNOWN")
        except:
            sys.exit(0)

    def board_replace(self):
        while (self.new_board == True):
            if (self.queue_parsing.empty() == False):
                if (self.piece_pos[0] >= 0 and self.piece_pos[0] <= self.board_size and
                    self.piece_pos[1] >= 0 and self.piece_pos[1] <= self.board_size and
                        self.piece_pos[2] >= 1 and self.piece_pos[2] <= 2):
                    if (self.piece_pos[2] == 2):
                        self.map[self.piece_pos[1]][self.piece_pos[0]] = -1
                    else:
                        self.map[self.piece_pos[1]][self.piece_pos[0]] = 1
                for i in range(3):
                    self.piece_pos.pop(0)
                self.queue_parsing.get()

    def map_create(self):
        self.map = []
        buffer = None
        for i in range(self.board_size):
            buffer = [0] * self.board_size
            self.map.append(buffer)

    def ai_move(self):
        highest_score = 0
        temp = 0
        temp2 = 0
        for i in range(self.board_size):
            for j in range(self.board_size):
                if (self.map[i][j] == 0 and
                    ((i - 1 >= 0 and j - 1 >= 0 and self.map[i - 1][j - 1] != 0)
                             or (i - 1 >= 0 and self.map[i - 1][j] != 0)
                             or (i - 1 >= 0 and j + 1 < self.board_size and self.map[i - 1][j + 1] != 0)
                             or (j - 1 >= 0 and self.map[i][j - 1] != 0)
                             or (j + 1 < self.board_size and self.map[i][j + 1] != 0)
                             or (i + 1 < self.board_size and j - 0 >= 0 and self.map[i + 1][j - 1] != 0)
                             or (i + 1 < self.board_size and self.map[i + 1][j] != 0)
                             or (i + 1 < self.board_size and j + 1 < self.board_size and self.map[i + 1][j + 1] != 0))
                    ):
                    temp = ai_get_score(self, i, j)
                    temp2 = opponent_get_score(self, i, j)
                    if (temp > temp2 and highest_score <= temp):
                        self.ai_move_x = i
                        self.ai_move_y = j
                        highest_score = temp
                    elif (temp2 > temp and highest_score <= temp2):
                        self.ai_move_x = i
                        self.ai_move_y = j
                        highest_score = temp2

    def map_copy(self):
        buffer = []
        for x in self.map:
            buffer.append(x.copy())
        return buffer


def main():
    try:
        gomoku = Gomoku()
        gomoku.handle_parser()
    except:
        sys.exit(0)
    return 0


if __name__ == "__main__":
    main()
